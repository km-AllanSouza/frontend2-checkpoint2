let userNameRef = document.querySelector('#userName')
let closeAppRef = document.querySelector('#closeApp')
let newTaskRef = document.querySelector('#newTask')
let skeletonRef = document.querySelector('#skeleton')
let ulTarefasRef = document.querySelector('.tarefas-pendentes')
let ulTarefasTerminadasRef = document.querySelector('.tarefas-terminadas')
let novaTarefaRef = document.querySelector('#novaTarea')
let requestHeaders = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token")
}
let taskList = []
let tasksCompletedList = []
console.log(taskList)
console.log(tasksCompletedList)

//faz o logout da pagina de tarefas
function logOutUser() {
    localStorage.clear();
    window.location.href = "./index.html";
}

function taskRender() {
    ulTarefasRef.innerHTML = ""
    ulTarefasTerminadasRef.innerHTML = ""

    for (const task of taskList) {
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
            <div class="not-done" onclick="taskCompleted(${task.id})"></div>
            <div class="descricao">
              <p class="nome">${task.description}</p>
              <div class="right">
                <p class="timestamp">Criada em: ${dataFormatada}</p>
                <p id="EditButtun" onclick="EditTarefa(${task.id})">Editar</p>
                <p id="closeApp" onclick="excluir(${task.id})">Excluir</p>
              </div>
            </div>
          </li>`    
    }
    for (const task of tasksCompletedList) {
        const dataCreat = new Date(task.createdAt)
        const dataFormatada = dataCreat.toLocaleDateString(
            'pt-br',
            {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
                
            }
        )
            ulTarefasTerminadasRef.innerHTML += `
          <li class="tarefa">
            <div class="not-done" onclick="taskCompletedReturn(${task.id})"></div>
            <div class="descricao">
              <p class="nome">${task.description}</p>
              <p class="timestamp">Criada em: ${dataFormatada}</p>
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
        response.json().then(data =>{
            taskList.push(data)
            taskRender()
        })
        
        
    });
   
}
function taskCompletedReturn(id) {
    
    let taskCompletedReturn = {
        
        completed: false
    }
    
    let requestConfigurationPut = {
        method: "PUT",
        body: JSON.stringify(taskCompletedReturn),
        headers: requestHeaders
    }

    fetch(
        `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`,
        requestConfigurationPut
    ).then(response => {
        response.json()
        
    });
    location.reload()
    alert('Tarefa de volta para pendentes')
   
}
function taskCompleted(id) {
    
    let taskCompleted = {
        
        completed: true
    }
    
    let requestConfigurationPut = {
        method: "PUT",
        body: JSON.stringify(taskCompleted),
        headers: requestHeaders
    }

    fetch(
        `https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`,
        requestConfigurationPut
    ).then(response => {
        response.json()
        
        
    });
    location.reload()
    alert('Parabéns por concluir a tarefa!')
   
}


function EditTarefa(idValue) {
    let edit = prompt('Editar tarefa')   
    if(edit){

        let EditTask = {
            description: edit,
            completed: false
        }
        
        let requestConfigurationPut = {
            method: "PUT",
            body: JSON.stringify(EditTask),
            headers: requestHeaders
        }
    
        fetch(
            `https://ctd-todo-api.herokuapp.com/v1/tasks/${idValue}`,
            requestConfigurationPut
        ).then(response => {
            response.json().then(data=>{
               
                alert('Tarefa Editada Com sucesso!')
                location.reload()
            })
            
            
            
        });

    }
    
    
    
   
}

let requestConfigurationGet = {
    headers: requestHeaders
};



function excluir(idValue){
    if(confirm("Deseja realmente excluir a tarefa?")){
        let settingDelete = {
            method: "DELETE",
            headers: requestHeaders
        }
    
        fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${idValue}`, settingDelete).then(response =>{
    
            response.json().then(data =>{      
                
                taskList = taskList.filter(i =>{return i["id"] !== idValue})
                taskRender()
            })
    
        })

    }  

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
            
                for (const task of data) {
                
                if(task.completed){
                    tasksCompletedList.push(task)
                }else taskList.push(task)
    
            }
                
            skeletonRef.style.display = "none";
            taskRender()            
        });
        taskRender()
    });

}
  
newTaskRef.addEventListener('click', event => {

    event.preventDefault()
    creatTask()
    novaTarefaRef.value = ""
    
    
})

closeAppRef.addEventListener('click', () => {

    logOutUser()
})

