let userNameRef = document.querySelector('#userName')

let requestHeaders = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token")
}

let requestConfigurationGet = {
    headers: requestHeaders
};

let newTask = {
    description: "Aprender Javascript",
    completed: false
}

let requestConfigurationPost = {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: requestHeaders
};


fetch(
    "https://ctd-todo-api.herokuapp.com/v1/users/getMe",
    requestConfigurationGet
).then(response => {
    response.json().then(data => {
        userNameRef.innerHTML = data.firstName
        console.log(data)

    });
});

fetch(
    "https://ctd-todo-api.herokuapp.com/v1/tasks",
    requestConfigurationGet
).then(response => {
    response.json().then(data => {

        //console.log(data)

    });
});

fetch(
    "https://ctd-todo-api.herokuapp.com/v1/tasks",
    requestConfigurationPost
).then(response => {
    response.json().then(data => {

        console.log(data)

    });
});

