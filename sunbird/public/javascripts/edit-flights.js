(function() {

  const BASE_URL = "/api/flights/";
  let currentId = "NOT SET";

  let submitButton = document.getElementById('submit');
  let cancelButton = document.getElementById('cancel');
  let editButtons = document.getElementsByClassName('edit');
  let removeButtons = document.getElementsByClassName('remove');

  let nameTextField = document.getElementById('name');
  let fromTextField = document.getElementById('from');
  let toTextField = document.getElementById('to');
  let expirationDateTextField = document.getElementById('expiration-date');
  let departureDateTextField = document.getElementById('departure');
  let durationTextField = document.getElementById('duration');
  let priceTextField = document.getElementById('price');
  let descriptionTextArea = document.getElementById('description');

  let table = document.getElementById('flights');

  submitButton.onclick = () => {
    let content = JSON.stringify({
      id: currentId,
      name: nameTextField.value,
      from: fromTextField.value,
      to: toTextField.value,
      expirationDate: expirationDateTextField.value,
      departure: departureDateTextField.value,
      duration: durationTextField.value,
      price: priceTextField.value,
      description: descriptionTextArea.value
    });

    if(currentId === "NOT SET") {
      RESTcall("POST", BASE_URL, content, realod, logError);
    } else {
      RESTcall("PUT", BASE_URL + currentId, content, realod, logError);
    }

  };

  [...editButtons].forEach((btn, index) => {
    btn.onclick = () => {
      let values = getValuesFromTable(index);
      currentId = values.id;
      nameTextField.value = values.name;
      fromTextField.value = values.from;
      toTextField.value = values.to;
      expirationDateTextField.value = values.expirationDate;
      departureDateTextField.value = values.departure;
      priceTextField.value = values.price.replace(/\D/gmi, '');
    }
  });

  [...removeButtons].forEach((btn, index) => {
    btn.onclick = () => {
      currentId = getValuesFromTable(index).id;
      RESTcall("DELETE", BASE_URL + currentId, null, realod, logError);
    }
  });

  const getValuesFromTable = rowIndex => {
    let tbody = table.getElementsByTagName('tbody')[0];
    for(let i = 0, size = tbody.rows.length; i < size; i++) {
      if(i === rowIndex) {
        let cells = tbody.rows.item(i).cells;
        let id = cells.item(0).innerHTML;
        let name = cells.item(2).innerHTML;
        let from = cells.item(3).innerHTML;
        let to = cells.item(4).innerHTML;
        let expirationDate = cells.item(5).innerHTML;
        let departure = cells.item(6).innerHTML;
        let price = cells.item(7).innerHTML;

        return {
          "id": id,
          "name": name,
          "from": from,
          "to": to,
          "expirationDate": expirationDate,
          "departure": departure,
          "price": price
        };
      }
    }
  }

})();