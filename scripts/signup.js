let buttonRef = document.querySelector("#signUp");

let inputNameRef = document.querySelector("#name");
let inputLastNameRef = document.querySelector("#lastName");
let inputEmailRef = document.querySelector("#mail");
let inputPassWRef = document.querySelector("#passW");
let inputPassWValidationRef = document.querySelector("#passWValidation");

let spanNomeRef = document.querySelector("#spanNome");
let spanSobrenomeRef = document.querySelector("#spanSobrenome");
let spanEmailSignUpRef = document.querySelector("#spanEmailSignUp");
let spanSenhaSignUpRef = document.querySelector("#spanSenhaSignUp");
let spanPWValidationSignUpRef = document.querySelector(
  "#spanPWValidationSignUp"
);

let validName = false;
let validLastName = false;
let validEmail = false;
let validPassW = false;

function validateSignUp() {
  if (
    validName &&
    validLastName &&
    validEmail &&
    validPassW &&
    validatedPassW
  ) {
    buttonRef.disabled = false;
  } else {
    buttonRef.disabled = true;
  }
}

inputNameRef.addEventListener("keyup", event => {
  event.preventDefault();
  validName = inputNameRef.checkValidity();
  if (validName) {
    spanNomeRef.classList.remove("show");
    validateSignUp();
  } else {
    spanNomeRef.classList.add("show");
  }
  validateSignUp();
});

inputLastNameRef.addEventListener("keyup", event => {
  event.preventDefault();
  validLastName = inputLastNameRef.checkValidity();
  if (validLastName) {
    spanSobrenomeRef.classList.remove("show");
  } else {
    spanSobrenomeRef.classList.add("show");
  }
  validateSignUp();
});

inputEmailRef.addEventListener("keyup", event => {
  event.preventDefault();
  validEmail = inputEmailRef.checkValidity();
  if (validEmail) {
    spanEmailSignUpRef.classList.remove("show");
  } else {
    spanEmailSignUpRef.classList.add("show");
  }
  validateSignUp();
});

inputPassWRef.addEventListener("keyup", event => {
  event.preventDefault();
  validPassW = inputPassWRef.checkValidity();
  if (validPassW) {
    spanSenhaSignUpRef.classList.remove("show");
  } else {
    spanSenhaSignUpRef.classList.add("show");
  }
  validateSignUp();
});

inputPassWValidationRef.addEventListener("keyup", event => {
  event.preventDefault();
  validatedPassW =
    inputPassWValidationRef.checkValidity() &&
    inputPassWValidationRef.value === inputPassWRef.value;
  if (validatedPassW) {
    spanPWValidationSignUpRef.classList.remove("show");
  } else {
    spanPWValidationSignUpRef.classList.add("show");
  }
  validateSignUp();
});

buttonRef.addEventListener("click", event => {
  event.preventDefault();

  let signUpData = {
    firstName: inputNameRef.value,
    lastName: inputLastNameRef.value,
    email: inputEmailRef.value,
    password: inputPassWRef.value
  };

  let requestHeaders = {
    "Content-Type": "application/json"
  };

  let requestConfiguration = {
    method: "POST",
    body: JSON.stringify(signUpData),
    headers: requestHeaders
  };

  fetch(
    "https://ctd-todo-api.herokuapp.com/v1/users",
    requestConfiguration
  ).then(response => {
    response.json().then(data => {
      console.log(data);

      if (response.ok = false) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Cadastrado com sucesso',
          showConfirmButton: false,
          timer: 800
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Dados informados incorretos ou já registrados',
          showConfirmButton: false,
          timer: 800
        })
      }

    });
  });
});