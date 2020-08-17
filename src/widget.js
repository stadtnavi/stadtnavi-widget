class StadtnaviLocationSelector {

  defaults = {
    tileUrl: "https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png",
    tileSize: 256,
    center: { lat: 48.7840, lng: 9.1829 },
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
    onLocationSelected: (location) => {},
    reverseGeocode: this.reverseGeocode
  };

  photonOptions = {
    url: "https://photon.stadtnavi.eu/api?",
    placeholder: "Suchen Sie nach einem Ort",
    //formatResult: this.formatResult.bind(this)
    onSelected: this.onSearchResultSelected.bind(this)
  }

  constructor(divId, options) {

    this.mergedOptions = this.computeOptions(options || {});
    const mergedOptions = this.mergedOptions;

    this.map = L.map(divId, {
      center: mergedOptions.center,
      zoom: 12
    });


    this.markers = [];

    L.tileLayer(mergedOptions.tileUrl, {
      attribution: mergedOptions.attribution,
      maxZoom: mergedOptions.maxZoom,
      tileSize: mergedOptions.tileSize
    }).addTo(this.map);

    this.map.on("click", (e) => {

      const { lat, lng } = e.latlng;

      this.geocodeAndSelect(lat, lng);
    });

    // add search control
    var searchControl = L.control.photon(this.photonOptions);
    searchControl.addTo(this.map);

    // add locate-me control
    var locateControl = L.control.locate({
      icon: "icon-location",
      iconLoading: "icon-spinner animate-spin"
    });
    locateControl.addTo(this.map);
  }

  setMarker(latlng) {
    this.markers.forEach(m => this.map.removeLayer(m));
    const marker = L.marker(latlng).addTo(this.map);
    this.markers = [marker];
    return marker;
  }

  reverseGeocode(lat, lng) {
    return fetch(`https://photon.stadtnavi.eu/reverse?lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(this.formatAddress.bind(this));
  }

  formatAddress(geoJson) {
    return this.formatFeature(geoJson.features[0]);
  }

  formatFeature(feature) {
    const { properties : { name, street, housenumber, postcode, city, osm_key }} = feature;

    const secondPart = `${postcode} ${city}`;

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

  formatResult(feature, el) {
    const formatted = this.formatFeature(feature);
    el.textContent = formatted;
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

    this.geocodeAndSelect(lat, lng);
  }

  geocodeAndSelect(lat, lng) {
    const marker = this.setMarker({lat, lng});
    this.reverseGeocode(lat, lng)
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
