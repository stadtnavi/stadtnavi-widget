L.Control.Address = L.Control.extend({
  onAdd: function(map) {
    const div = L.DomUtil.create('div');
    div.className = "stadtnavi-address-box";
    const title = L.DomUtil.create('h4');
    title.textContent = this.options.title;
    div.appendChild(title);

    const address = L.DomUtil.create('div');
    address.textContent = this.options.address;
    div.appendChild(address);

    return div;
  },

  onRemove: function(map) {}
});

L.control.address = function(opts) {
  return new L.Control.Address(opts);
}

class StadtnaviAddressBox {

  defaults = {
    ... {
      center: { lat: 48.7840, lng: 9.1829 },
    },
    ... Stadtnavi.tileDefaults
  };

  constructor(divId, title, address, options) {

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

    map.zoomControl.setPosition('topright');

    fetch(`${Stadtnavi.photonUrl}/api?q=${address}`)
      .then(r => r.json())
      .then(json => {

        const latLng = json.features[0].geometry.coordinates;
        latLng.reverse();
        map.setView(latLng)

        L.marker(latLng).addTo(map);
        L.control.address({ position: 'topleft', title, address }).addTo(map);
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
