class StadtnaviLocationSelector {

  constructor(divId, options) {
    this.defaults = {
      ... {
        center: { lat: 48.7840, lng: 9.1829 },
        onLocationSelected: (location) => {},
        reverseGeocode: this.reverseGeocode
      },
      ... Stadtnavi.defaultOptions
    };

    this.photonOptions = {
      url: `${Stadtnavi.photonUrl}/api?`,
      placeholder: "Suchen Sie nach einem Ort",
      formatResult: this.formatSearchResult.bind(this),
      onSelected: this.onSearchResultSelected.bind(this),
      lang: "de",
      feedbackEmail: null,
      noResultLabel: "Keine Ergebnisse",
      osm_tag: "!highway:motorway_junction"
    }


    this.mergedOptions = this.computeOptions(options || {});
    const mergedOptions = this.mergedOptions;

    this.map = L.map(divId, {
      center: mergedOptions.center,
      zoom: 12
    });

    this.map.attributionControl.setPrefix(false);

    this.markers = [];

    const l = Stadtnavi.tileLayer(mergedOptions);
    l.addTo(this.map);

    this.map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      this.geocodeAndSelect(lat, lng);
    });

    // add search control
    var searchControl = L.control.photon(this.photonOptions);
    searchControl.addTo(this.map);

    // add locate-me control
    this.locateControl = L.control.locate({
      icon: "icon-location",
      iconLoading: "icon-spinner animate-spin"
    });
    this.locateControl.addTo(this.map);


    this.map.on("locationfound", this.onLocationFound.bind(this));
  }

  onLocationFound(e) {
    if(e.accuracy < 1000){
      this.geocodeAndSelect(e.latitude, e.longitude)
        .then(a => this.locateControl.stop());
    }
  }

  setMarker(latlng) {
    this.markers.forEach(m => this.map.removeLayer(m));
    const marker = Stadtnavi.marker(latlng, this.mergedOptions).addTo(this.map);
    this.markers = [marker];
    return marker;
  }

  reverseGeocode(lat, lng) {
    return fetch(`${Stadtnavi.photonUrl}/reverse?lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(this.formatPhotonResponse.bind(this));
  }

  formatPhotonResponse(geoJson) {
    return this.formatFeature(geoJson.features[0]);
  }

  formatFeature(feature) {
    const { properties : { name, street, housenumber, postcode, city, district, locality, osm_key }} = feature;

    const secondPart = `${postcode} ${city || district || locality}`;

    if(osm_key == "boundary"){
      return name;
    }
    else if(street || name) {
      var firstPart = `${street} ${housenumber}`;
      if(!street && name) {
        firstPart = name;
      } else if(!housenumber) {
        firstPart = street;
      }

      return `${firstPart}, ${secondPart}`;
    } else {
      return secondPart;
    }
  }

  formatSearchResult(feature, el) {
    const { properties : { name, street, housenumber, postcode, city, country, osm_key }} = feature;

    var title = L.DomUtil.create('strong', '', el),
      detailsContainer = L.DomUtil.create('small', '', el),
      details = [];
    if (name) {
      title.textContent = name;
    } else if (housenumber) {
      if (street) {
        title.textContent += street;
      }
      title.textContent += `, ${housenumber}`;
    }
    if (city && city !== name) {
      details.push(city);
    }
    if (country) details.push(country);
    detailsContainer.textContent = details.join(', ');
  }

  onSearchResultSelected(feature) {
    const bounds = feature.properties.extent;
    const [lng, lat] = feature.geometry.coordinates;
    const latlng = {lat, lng};

    if(bounds) {
      this.map.fitBounds([
        [bounds[1], bounds[0]],
        [bounds[3], bounds[2]]
      ]);
    } else {
      this.map.setView(latlng);
    }

    const marker = this.setMarker({lat, lng});
    const address = this.formatFeature(feature);
    marker.bindPopup(address).openPopup();
    this.mergedOptions.onLocationSelected({
      address,
      coordinates: {
        lat, lng
      }
    });
  }

  geocodeAndSelect(lat, lng) {
    const marker = this.setMarker({lat, lng});
    return this.reverseGeocode(lat, lng)
      .then(address => {
        marker.bindPopup(address).openPopup();

        this.mergedOptions.onLocationSelected({
          address,
          coordinates: {
            lat, lng
          }
        });
      });
  }

  computeOptions(options) {
    const ret = {};
    Object.keys(this.defaults).forEach(key => {
      const userValue = options[key]
      if(userValue) {
        ret[key] = userValue;
      } else {
        ret[key] = this.defaults[key];
      }
    });
    return ret;
  }
}
