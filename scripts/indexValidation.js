let emailReferencia = document.querySelector("#inputEmail");
let senhaReferencia = document.querySelector("#inputPassword");
let spanEmailIndexRef = document.querySelector("#spanEmailIndex");
let spanSenha = document.querySelector("#spanSenha");
let buttonReferencia = document.querySelector("button");
let emailValido = false;
let senhaValida = false;

function validateLogin() {
  if (emailValido && senhaValida) {
    buttonReferencia.disabled = false;
  } else {
    buttonReferencia.disabled = true;
  }
}

emailReferencia.addEventListener("keyup", () => {
  emailValido = emailReferencia.checkValidity();
  if (emailValido) {
    spanEmailIndex.classList.remove("show");
  } else {
    spanEmailIndex.classList.add("show");
  }
  validateLogin();
});

senhaReferencia.addEventListener("keyup", () => {
  senhaValida = senhaReferencia.checkValidity();
  if (senhaValida) {
    spanSenha.classList.remove("show");
  } else {
    spanSenha.classList.add("show");
  }
  validateLogin();
});

buttonReferencia.addEventListener("click", function (event) {
  event.preventDefault();
});
