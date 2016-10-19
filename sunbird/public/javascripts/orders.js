(function() {

  const BASE_URL = "/api/orders/";
  let currentId = "NOT SET";

  let submitButton = document.getElementById('submit');
  let cancelButton = document.getElementById('cancel');
  let editButtons = document.getElementsByClassName('edit');
  let removeButtons = document.getElementsByClassName('remove');

  let userIdTextField = document.getElementById('user-id');
  let flightIdTextField = document.getElementById('flight-id');
  let applyingTimeTextField = document.getElementById('applying-time');
  let payingTimeTextField = document.getElementById('paying-time');
  let rejectionTimeTextField = document.getElementById('rejection-time');
  let isPaidCheckbox = document.getElementById('is-paid');
  let isRejectedCheckbox = document.getElementById('is-rejected');

  let table = document.getElementById('orders');

  submitButton.onclick = () => {
    let content = JSON.stringify({
      id: currentId,
      userId: userIdTextField.value,
      flightId: flightIdTextField.value,
      applyingTime: applyingTimeTextField.value,
      payingTime: payingTimeTextField.value,
      rejectionTime: rejectionTimeTextField.value,
      isPaid: isPaidCheckbox.checked,
      isRejected: isRejectedCheckbox.checked
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
      userIdTextField.value = values.userId;
      flightIdTextField.value = values.flightId;
      applyingTimeTextField.value = values.applyingTime;
      payingTimeTextField.value = values.payingTime;
      rejectionTimeTextField.value = values.rejectionTime;
      isPaidCheckbox.checked = values.isPaid == "true";
      isRejectedCheckbox.checked = values.isRejected == "true";
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
        let userId = cells.item(1).innerHTML;
        let flightId = cells.item(2).innerHTML;
        let applyingTime = cells.item(3).innerHTML;
        let payingTime = cells.item(4).innerHTML;
        let rejectionTime = cells.item(5).innerHTML;
        let isPaid = cells.item(6).innerHTML;
        let isRejected = cells.item(7).innerHTML;
        return {
          "id": id,
          "userId": userId,
          "flightId": flightId,
          "applyingTime": applyingTime,
          "payingTime": payingTime,
          "rejectionTime": rejectionTime,
          "isPaid": isPaid,
          "isRejected": isRejected
        };
      }
    }
  }

})();