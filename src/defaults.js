const Stadtnavi = {
  photonUrl: "https://photon.stadtnavi.eu",

  defaultOptions: {
    tileUrl: "https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png",
    tileSize: 256,
    attribution: 'Kartendaten &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> Mitwirkende',
    maxZoom: 18,
    pinPrimaryColor: "#f8dd14",
    pinSecondaryColor: "#000000"
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
  }
}
