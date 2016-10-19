(function() {

  const BASE_URL = "/api/users/";
  let currentId = "NOT SET";

  let submitButton = document.getElementById('submit');
  let cancelButton = document.getElementById('cancel');
  let editButtons = document.getElementsByClassName('edit');
  let removeButtons = document.getElementsByClassName('remove');

  let firstNameTextField = document.getElementById('first-name');
  let secondNameTextField = document.getElementById('second-name');
  let emailTextField = document.getElementById('email');
  let passwordTextField = document.getElementById('password');
  let phoneTextField = document.getElementById('phone');
  let imageTextField = document.getElementById('image');
  let bioTextField = document.getElementById('bio');

  let table = document.getElementById('users');

  submitButton.onclick = () => {
    let content = JSON.stringify({
      id: currentId,
      "firstName": firstNameTextField.value,
      "secondName": secondNameTextField.value,
      "email": emailTextField.value,
      "password": passwordTextField.value,
      "phone": phoneTextField.value,
      "image": imageTextField.value,
      "bio": bioTextField.value
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
      firstNameTextField.value = values.firstName;
      secondNameTextField.value = values.secondName;
      emailTextField.value = values.email;
      phoneTextField.value = values.phone;
      imageTextField.value = values.image;
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
        let image = cells.item(1).innerHTML;
        let firstName = cells.item(2).innerHTML;
        let secondName = cells.item(3).innerHTML;
        let email = cells.item(4).innerHTML;
        let phone = cells.item(5).innerHTML;

        return {
          "id": id,
          "image": image,
          "firstName": firstName,
          "secondName": secondName,
          "email": email,
          "phone": phone
        };
      }
    }
  }

})();