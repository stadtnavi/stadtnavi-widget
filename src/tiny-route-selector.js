class TinyRouteSelector {

  makeAutoComplete(parent, placeholder) {
    const div = document.createElement('div');
    parent.appendChild(div);
    const input = document.createElement('input');
    div.appendChild(input);

    const autoCompleteObj = new autoComplete({
      placeHolder: placeholder,
      selector: () => {
        return input;
      },
      data:{
        src: (query) => {
          const peliasUrl = `https://photon.stadtnavi.eu/pelias/v1/search?text=${query}&focus.point.lat=53.015895&focus.point.lon=14.000255&layers=station,venue,address,street&lang=de`;
          return fetch(`${peliasUrl}`)
            .then(r => r.json())
            .then(r => r.features.map(this.toDisplayValues));
        }
      },
      searchEngine: (query, record) => {
        return record.name;
      },
      submit: true,
      threshold: 3,
      debounce: 150,

      events: {
        input: {
          selection(event) {
            const feedback = event.detail;
            autoCompleteObj.input.blur();
            // Replace Input value with the selected value
            autoCompleteObj.input.value = feedback.selection.match;
            autoCompleteObj.selection = feedback.selection;
          },
        },
      },
    });

    return autoCompleteObj;
  }

  toDisplayValues(f) {
    return {
      name: f.properties.label,
      coordinates: f.geometry.coordinates
    };
  }

  toUrlPart(selection) {
    if(!selection) {
      return "-";
    }
    const [lng, lat] = selection.value.coordinates;
    return `${selection.match}::${lat},${lng}`
  }

  constructor(divId, options) {

    const container = document.getElementById(divId);
    container.className = "tiny-route-widget";

    const h1 = document.createElement('h3');
    h1.textContent = "Route in BBNavi suchen"
    container.appendChild(h1);

    var start = this.makeAutoComplete(container, "Startort eingeben");
    var end = this.makeAutoComplete(container, "Zielort eingeben");

    const datePicker = document.createElement('button');
    datePicker.textContent = "Abfahrt jetzt";
    datePicker.className = "btn";
    container.appendChild(datePicker);


    flatpickr(datePicker, {
      enableTime: true,
      locale: "de",
      dateFormat: "d.m.Y h:i",
      onChange: (selectedDates, dateStr, instance) => {
        datePicker.textContent = dateStr;
        this.selectedDate = selectedDates[0];
      },
    });

    const button = document.createElement('button');
    button.textContent = "Route suchen"
    button.className = "submit btn";

    container.appendChild(button);

    button.onclick = () => {
      var url = "https://herzberg-elster.bbnavi.de";

      if(start.selection && end.selection && this.selectedDate) {
        url = `${url}/reiseplan`;
      }

      const first = this.toUrlPart(start.selection);
      const second = this.toUrlPart(end.selection);


      url = `${url}/${first}/${second}`;
      if(this.selectedDate) {
        const timestamp = this.selectedDate.getTime() / 1000;
        url = `${url}?time=${timestamp}`;
      }
      window.open(encodeURI(url));
    };
  }
}
