class TinyAddressBox {

  makeAutoComplete() {
    const input = document.createElement('input');
    new autoComplete({
      placeHolder: "Search for Food...",
      selector: () => {
        return input;
      },
      data: {
        src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"],
        cache: true,
      }
    })
    return input;
  }

  constructor(divId, options) {

    const peliasUrl = "https://photon.stadtnavi.eu/pelias/v1/search?text=herz&boundary.rect.min_lat=50.015895&boundary.rect.max_lat=54.015895&boundary.rect.min_lon=15.000255&boundary.rect.max_lon=11.000255&focus.point.lat=53.015895&focus.point.lon=14.000255&lang=de&sources=oa%2Cosm%2Cgtfsbbnavi&layers=station%2Cvenue%2Caddress%2Cstreet";
    const container = document.getElementById(divId);

    container.appendChild(this.makeAutoComplete());

    this.defaults = {
      ... {
        center: { lat: 48.7840, lng: 9.1829 },
      }
    };


    fetch(`${peliasUrl}`)
      .then(r => r.json())
      .then(json => {

        const latLng = json.features[0].geometry.coordinates;
        latLng.reverse();
      });
  }

}
