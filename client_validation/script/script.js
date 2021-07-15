// read form element
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const geburtstag = document.getElementById('geburtstag');
const phone = document.getElementById('phone');
const passwordcontrol = document.getElementById('passwordcontrol');



// Error message anzeige
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}



// Success message anzeige
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}



// Email kontrollieren
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email ist nicht korrekt!');
  }
}



// Telefonnummer kontrollieren
function checkPhone(input) {
  const re = /^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/gm;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Telefonnummer ist nicht richtig!');
  }
}




// Fragen müssen Ausgefüllt werden
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} muss ausgefüllt werden!`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}



// Länge der Eingabe kontrollieren
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input,
      `${getFieldName(input)} muss mindestens ${min} zeichen haben!`
    );
  } else if (input.value.length > max) {
    showError(input,
      `${getFieldName(input)} muss weniger als ${max} zeichen haben!`
    );
  } else {
    showSuccess(input);
  }
}




// Passwörter vergleichen
function checkPasswordMatch(input1, input2) {
  let pwd1 = input1.value.trim();
  let pwd2 = input2.value.trim();
  if (pwd1 === pwd2) {
    showSuccess(input2);
  } else {
    showError(input2, 'Passwörter stimmen nicht überein!');
  }
}




// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}




// Validierung vom Input
function validateForm() {
  if (!checkRequired([username, email, password, geburtstag, phone, passwordcontrol])) {
    checkLength(username, 3, 30);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPhone(phone);
    checkPasswordMatch(password, passwordcontrol);
  }
}



/**
 * Send form data to server
 * Info: https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
 */
function sendForm() {
  const SERVER = "http://localhost:3000";
  fetch(SERVER + '/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: username,
        email: email
      }
    })
  });

}




// Event listeners
form.addEventListener('submit', function (e) {
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
  //Send Data
  sendForm();
})
