class StadtnaviWidget {

  defaults = {
    tileUrl: "https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png",
    center: [48.7840, 9.1829],
  };


  constructor(divId) {

    const map = L.map(divId, {
      center: this.defaults.center,
      zoom: 12
    });

    var markers = [];

    L.tileLayer(this.defaults.tileUrl, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
      tileSize: 256
    }).addTo(map);

    map.on("click", (e) => {


      markers.forEach(m => map.removeLayer(m));
      const marker = L.marker(e.latlng).addTo(map);
      markers = [marker];

      const { lat, lng } = e.latlng;

      this.reverseGeocode(lat, lng).then(address => marker.bindPopup(address).openPopup());

    });
  }

  reverseGeocode(lat, lng) {
    return fetch(`https://photon.stadtnavi.eu/reverse?lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(this.formatAddress);
  }

  formatAddress(geoJson) {
    const { properties : { name, street, housenumber, postcode, city }} = geoJson.features[0];

    var firstPart = `${street} ${housenumber}`;
    if(!street) {
      firstPart = name;
    }

    const address = `${firstPart}, ${postcode} ${city}`;
    console.log(address);
    return address;
  }
}
