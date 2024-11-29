L.Control.Address = L.Control.extend({
  onAdd: function(map) {
    const div = L.DomUtil.create('div');
    div.className = "stadtnavi-address-box";
    const titleEl = L.DomUtil.create('div');
    titleEl.className = "title";
    titleEl.textContent = this.options.title;
    div.appendChild(titleEl);


    const { title, address, lat, lng } = this.options;

    const addressLine = L.DomUtil.create('div');
    addressLine.textContent = this.options.address;
    div.appendChild(addressLine);

    const getRoute = L.DomUtil.create('a');
    getRoute.textContent = this.options.stadtnaviLinkText
    getRoute.href = `${this.options.stadtnaviBaseUrl}-/${title}, ${address}::${lat},${lng}/indernaehe`;
    getRoute.target = "_blank";
    div.appendChild(getRoute);

    return div;
  },

  onRemove: function(map) {}
});

L.control.address = function(opts) {
  return new L.Control.Address(opts);
}

L.Control.Logo = L.Control.extend({
  onAdd: function(map) {
    const div = L.DomUtil.create('div');
    const img = L.DomUtil.create('img');
    div.className = "stadtnavi-logo"
    img.src = this.options.url;

    div.appendChild(img);

    return div;
  },

  onRemove: function(map) {}
});

L.control.logo = function(opts) {
  return new L.Control.Logo(opts);
}


class StadtnaviAddressBox {

  constructor(divId, title, address, options, lat, lon) {

    this.defaults = {
      ... {
        center: { lat: 48.7840, lng: 9.1829 },
      },
      ... Stadtnavi.defaultOptions
    };


    this.mergedOptions = this.computeOptions(options || {});
    const mergedOptions = this.mergedOptions;

    const map = L.map(divId, {
      center: mergedOptions.center,
      zoom: 16,
      scrollWheelZoom: 'center'
    });

    if(mergedOptions.logoUrl) {
      L.control.logo({ position: 'topright', url: mergedOptions.logoUrl }).addTo(map);
    }

    const layer = Stadtnavi.tileLayer(mergedOptions);
    layer.addTo(map);

    map.zoomControl.setPosition('topright');
    map.attributionControl.setPrefix(false);
    map.dragging.disable();

    const lonFloat = parseFloat(lon);
    const latFloat = parseFloat(lat);
    if (lonFloat >= -180 && lonFloat <= 180 && latFloat >= -90 && latFloat <= 90 ) {
      this.zoomTo([latFloat, lonFloat], map, title, address);
    } else {
      fetch(`${Stadtnavi.photonUrl}/api?q=${address}`)
        .then(r => r.json())
        .then(json => {

          const latLng = json.features[0].geometry.coordinates;
          latLng.reverse();
          this.zoomTo(latLng, map, title, address);
        });
    }
  }

  zoomTo(latLng, map, title, address ) {
    map.setView(latLng)

    Stadtnavi.marker(latLng, this.mergedOptions).addTo(map);
    L.control.address({ position: 'topleft', lat: latLng[0], lng: latLng[1], title, address,
      stadtnaviLinkText: this.mergedOptions.stadtnaviLinkText, stadtnaviBaseUrl: this.mergedOptions.stadtnaviBaseUrl }).addTo(map);
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
