class TinyRouteSelector {

  makeAutoComplete(parent, placeholder, lat, lng, preselected) {
    const div = document.createElement('div');
    parent.appendChild(div);
    const input = document.createElement('input');
    if(preselected.label) {
      input.value = preselected.label;
    }
    div.appendChild(input);

    const autoCompleteObj = new autoComplete({
      placeHolder: placeholder,
      selector: () => {
        return input;
      },
      data:{
        src: (query) => {
          const peliasUrl = `https://photon.stadtnavi.eu/pelias/v1/search?text=${query}&focus.point.lat=${lat}&focus.point.lon=${lng}&layers=station,venue,address,street&lang=de`;
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

    if(preselected.lat && preselected.lng) {
      autoCompleteObj.selection = {
        match: preselected.label,
        value: {
          coordinates: [preselected.lng, preselected.lat]
        }
      }
    }

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
    return `${encodeURI(selection.match)}::${lat},${lng}`
  }

  constructor(divId, options) {

    options = options || { };

    if(!options.focus) {
      options.focus = {
        lat: 51.6927,
        lng: 13.2354
      }
    }
    if(!options.destination) {
      options.destination = {};
    }
    const container = document.getElementById(divId);
    container.className = "tiny-route-widget";

    const header = document.createElement('header');

    const h1 = document.createElement('img');
    h1.src = options.logoUrl || "https://bbnavi.de/wp-content/uploads/2021/09/bbnavi-logo-weiss-transparent.png";
    header.appendChild(h1);
    container.appendChild(header);

    var start = this.makeAutoComplete(container, "Startort eingeben", options.focus.lat, options.focus.lng, {});
    var end = this.makeAutoComplete(container, "Zielort eingeben", options.focus.lat, options.focus.lng, options.destination);

    const div1 = document.createElement('div');

    const datePicker = document.createElement('button');
    datePicker.textContent = "Abfahrt jetzt";
    datePicker.className = "btn";
    div1.appendChild(datePicker);
    container.appendChild(div1);

    flatpickr(datePicker, {
      enableTime: true,
      locale: "de",
      dateFormat: "d.m.Y H:i",
      onChange: (selectedDates, dateStr, instance) => {
        datePicker.textContent = dateStr;
        this.selectedDate = selectedDates[0];
      },
    });

    const div2 = document.createElement('div');
    const button = document.createElement('button');
    button.textContent = "Route suchen"
    button.className = "submit button";

    div2.appendChild(button);
    container.appendChild(div2);

    button.onclick = () => {
      var url = options.baseUrl || "https://herzberg-elster.bbnavi.de";

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
