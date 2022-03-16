const Stadtnavi = {
  photonUrl: "https://photon.stadtnavi.eu",

  defaultOptions: {
    tileUrl: "https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png",
    tileSize: 256,
    attribution: 'Kartendaten &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> Mitwirkende',
    maxZoom: 18,
    pinPrimaryColor: "#f8dd14",
    pinSecondaryColor: "#000000",
    stadtnaviLinkText: "Route auf stadtnavi suchen",
    stadtnaviBaseUrl: "https://herrenberg.stadtnavi.de/",
    wms: null
  },

  marker: (latlng, options) => {

    const primary = options.pinPrimaryColor;
    const secondary = options.pinSecondaryColor;

    return new L.Marker.SVGMarker(latlng, { iconOptions: {
      color: secondary,
      circleFillColor: secondary,
      circleWeight: 0,
      fillColor: primary,
      fillOpacity: 0.9,
      circleRatio: 0.2

    }});
  },


  tileLayer: (opts) => {

    console.log(opts)
    if(opts.wms) {
      return L.tileLayer.wms(opts.wms.url, {
        layers: opts.wms.layers,
        format: opts.wms.format || 'image/png',
        transparent: false,
        attribution: opts.attribution
      });
    }
    else {
      return L.tileLayer(opts.tileUrl, {
        attribution: opts.attribution,
        maxZoom: opts.maxZoom,
        tileSize: opts.tileSize
      })
    }
  }

}
