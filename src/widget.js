class StadtnaviWidget {

  constructor(divId) {
    const defaults = {
      tileUrl: "https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png",
      center: [48.7840, 9.1829]
    };

    const map = L.map(divId, {
      center: defaults.center,
      zoom: 12
    });

    L.tileLayer(defaults.tileUrl, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
      tileSize: 256
    }).addTo(map);


  }
}
