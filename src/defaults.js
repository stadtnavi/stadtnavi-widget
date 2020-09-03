const Stadtnavi = {
  photonUrl: "https://photon.stadtnavi.eu",
  tileDefaults: {
    tileUrl: "https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png",
    tileSize: 256,
    attribution: 'Kartendaten &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> Mitwirkende',
    maxZoom: 18
  },

  marker: (latlng) => {
    const primary ="#f8dd14";
    const secondary ="#000";

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
