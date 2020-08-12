class Widget {

  constructor(divId) {

    var map = L.map(divId, {
      center: [48.7840, 9.1829],
      zoom: 12
    });

    L.tileLayer('https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18,
      tileSize: 256
    }).addTo(map);


  }

}
