let buttonLoginRef = document.querySelector("#buttonLogin");
let emailReferenciaL = document.querySelector("#inputEmail");
let senhaReferenciaL = document.querySelector("#inputPassword");

buttonLoginRef.addEventListener("click", event => {
  event.preventDefault();

  let credentials = {
    email: emailReferenciaL.value,
    // emailReferencia.value,
    password: senhaReferenciaL.value
    // senhaReferencia.value
  };

  let requestHeaders = {
    "Content-Type": "application/json"
  };

  let requestConfiguration = {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: requestHeaders
  };

  fetch(
    "https://ctd-todo-api.herokuapp.com/v1/users/login",
    requestConfiguration
  ).then(response => {
    if (response.ok) {
      response.json().then(data => {

        localStorage.setItem("token", data.jwt);

        window.location.href = './tarefas.html'

      })
    } else {
      Swal.fire({
        title: 'Usuario não encontrado',
        text: "e-mail ou senha incorreto",
        icon: 'warning',

      })
    }
  });
});