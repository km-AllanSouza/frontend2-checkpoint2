let userNameRef = document.querySelector('#userName')
let closeAppRef = document.querySelector('#closeApp')
let newTaskRef = document.querySelector('#newTask')
let skeletonRef = document.querySelector('#skeleton')
let ulTarefasRef = document.querySelector('.tarefas-pendentes')
let novaTarefaRef = document.querySelector('#novaTarea')

let taskList = []

function logOutUser() {
    localStorage.clear();
    window.location.href = "./index.html";
}

function taskRender() {

    for (const task of taskList) {

        ulTarefasRef.innerHTML += `
        <li class="tarefa">
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${task.description}</p>
          <p class="timestamp">${task.createdAt}</p>
        </div>
      </li>
        
        `

    }

}

function creatTask() {
    fetch(
        "https://ctd-todo-api.herokuapp.com/v1/tasks",
        requestConfigurationPost
    ).then(response => {
        response.json().then(data => {

            console.log(data)

        });
    });
}

let requestHeaders = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token")
}

let requestConfigurationGet = {
    headers: requestHeaders
};

let newTask = {
    description: novaTarefaRef.value,
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

        for (const task of data) {

            taskList.push(task)

        }
        console.log(taskList)

        skeletonRef.style.display = "none";
        taskRender()
        
    });
});


newTaskRef.addEventListener('click', event => {

    event.preventDefault()

    creatTask()
    
})

closeAppRef.addEventListener('click', () => {

    logOutUser()
})

