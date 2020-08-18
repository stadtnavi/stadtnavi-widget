class StadtnaviAddressBox {

  defaults = {
    ... {
      center: { lat: 48.7840, lng: 9.1829 },
      onLocationSelected: (location) => {},
      reverseGeocode: this.reverseGeocode
    },
    ... Stadtnavi.tileDefaults
  };

  constructor(divId, address, options) {

    this.mergedOptions = this.computeOptions(options || {});
    const mergedOptions = this.mergedOptions;

    const map = L.map(divId, {
      center: mergedOptions.center,
      zoom: 16
    });

    L.tileLayer(mergedOptions.tileUrl, {
      attribution: mergedOptions.attribution,
      maxZoom: mergedOptions.maxZoom,
      tileSize: mergedOptions.tileSize
    }).addTo(map);



    fetch(`${Stadtnavi.photonUrl}/api?q=${address}`)
      .then(r => r.json())
      .then(json => {

        const latLng = json.features[0].geometry.coordinates;
        latLng.reverse();
        console.log(latLng);
        map.setView(latLng)

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
