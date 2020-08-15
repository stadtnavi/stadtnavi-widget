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
  }

  constructor(divId, options) {

    const mergedOptions = this.computeOptions(options || {});

    const map = L.map(divId, {
      center: mergedOptions.center,
      zoom: 12
    });


    var markers = [];

    L.tileLayer(mergedOptions.tileUrl, {
      attribution: mergedOptions.attribution,
      maxZoom: mergedOptions.maxZoom,
      tileSize: mergedOptions.tileSize
    }).addTo(map);

    map.on("click", (e) => {

      markers.forEach(m => map.removeLayer(m));
      const marker = L.marker(e.latlng).addTo(map);
      markers = [marker];

      const { lat, lng } = e.latlng;

      this.reverseGeocode(lat, lng)
        .then(address => {
          marker.bindPopup(address).openPopup();

          mergedOptions.onLocationSelected({
            address,
            coordinates: {
              lat, lng
            }
          });
        });
    });

    var searchControl = L.control.photon(this.photonOptions);
    searchControl.addTo(map);

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
    const { properties : { name, street, housenumber, postcode, city }} = feature;

    const secondPart = `${postcode} ${city}`;

    if(street || name ) {
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
