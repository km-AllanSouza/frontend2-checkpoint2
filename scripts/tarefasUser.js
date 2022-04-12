let userNameRef = document.querySelector('#userName')
let closeAppRef = document.querySelector('#closeApp')
let newTaskRef = document.querySelector('#newTask')
let skeletonRef = document.querySelector('#skeleton')
let ulTarefasRef = document.querySelector('.tarefas-pendentes')
let novaTarefaRef = document.querySelector('#novaTarea')
let requestHeaders = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token")
}
let taskList = []

//faz o logout da pagina de tarefas
function logOutUser() {
    localStorage.clear();
    window.location.href = "./index.html";
}

function taskRender() {

    for (const task of taskList.reverse()) {
        const dataCreat = new Date(task.createdAt)
        const dataFormatada = dataCreat.toLocaleDateString(
            'pt-br',
            {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
                
            }
        )
            ulTarefasRef.innerHTML += `
            <li class="tarefa">
            <div class="not-done"></div>
            <div class="descricao">
              <p class="nome">${task.description}</p>
              <p class="timestamp">${dataFormatada}</p>
              <p id="closeApp" onclick="excluir(${task.id})">Excluir</p>
            </div>
          </li>`    
    }
    
}

function creatTask() {

    let newTask = {
        description: novaTarefaRef.value,
        completed: false
    }
    
    let requestConfigurationPost = {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: requestHeaders
    }

    fetch(
        "https://ctd-todo-api.herokuapp.com/v1/tasks",
        requestConfigurationPost
    ).then(response => {
        response.json()
        
    });
   
}

let requestConfigurationGet = {
    headers: requestHeaders
};



function excluir(id){

    let settingDelete = {
        method: "DELETE",
        headers: requestHeaders
    }

    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, settingDelete).then(response =>{

        response.json()
        location.reload()
        alert('Tarefa excluida com sucesso')
           
    })

}

fetch(
    "https://ctd-todo-api.herokuapp.com/v1/users/getMe",
    requestConfigurationGet
).then(response => {
    response.json().then(data => {
        userNameRef.innerHTML = data.firstName
    });
});

atualizar()
function atualizar(){

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

}
  
newTaskRef.addEventListener('click', event => {

    //event.preventDefault()
    creatTask()
    
})

closeAppRef.addEventListener('click', () => {

    logOutUser()
})

