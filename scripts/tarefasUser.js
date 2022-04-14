let userNameRef = document.querySelector('#userName')
let closeAppRef = document.querySelector('#closeApp')
let newTaskRef = document.querySelector('#newTask')
let skeletonRef = document.querySelector('#skeleton')
let ulTarefasRef = document.querySelector('.tarefas-pendentes')
let ulTarefasTerminadasRef = document.querySelector('.tarefas-terminadas')
let novaTarefaRef = document.querySelector('#novaTarea')
let imagem = document.querySelector('.user-image')
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
function atualizararray(){
    taskList = []
    tasksCompletedList = []
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
            taskRender()                    
        });
       
    });
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
            <li " class="tarefa">
            <div class="not-done" onclick="taskCompleted(${task.id})"></div>
            <div class="descricao">
              <p class="nome">${task.description}</p>
              <div class="right">
                <p class="timestamp">Criada em: ${dataFormatada}</p>
                <p id="EditButtun" onclick="EditTarefa(${task.id})">Editar</p>
                <p id="delete-buttum" onclick="excluir(${task.id})">Excluir</p>
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
          <li " class="tarefa">
            <div class="not-done" onclick="taskCompletedReturn(${task.id})"></div>
            <div class="descricao">
              <p class="nome">${task.description}</p>
              <p class="timestamp">Criada em: ${dataFormatada}</p>
            </div>
            <img src="https://img.icons8.com/ios-glyphs/344/fa314a/trash--v1.png" class="delete-image" onclick="excluir(${task.id})">
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
        atualizararray()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tarefa de volta a lista de pendencias!',
            showConfirmButton: false,
            timer: 800
          })
        //alert('Tarefa de volta para pendentes')
    });
    //location.reload()
    
   
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
        atualizararray()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Parabéns por concluir a tarefa!',
            showConfirmButton: false,
            timer: 800
          })
        //alert('Parabéns por concluir a tarefa!')
        
    });
    
   
}


function EditTarefa(idValue) {
    //let edit = prompt('Editar tarefa')
     
Swal.fire({
    title: 'Substitua sua tarefa',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Substituir',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
        console.log(login)
        if(login){

            let EditTask = {
                description: login,
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
                    
                    atualizararray()
                    //alert('Tarefa Editada Com sucesso!')
                    //location.reload()
                })
                
                
                
            });
    
        }
    },
    
  }) 
    
    
    
    
   
}

let requestConfigurationGet = {
    headers: requestHeaders
};



function excluir(idValue){
    //if(confirm("Deseja realmente excluir a tarefa?")){
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Não vai ser possivel reverter essa ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, delete!'
          }).then((result) => {
            if (result.isConfirmed) {
                let settingDelete = {
                    method: "DELETE",
                    headers: requestHeaders
                }
            
                fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${idValue}`, settingDelete).then(response =>{
            
                    response.json().then(data =>{      
                        
                        //taskList = taskList.filter(i =>{return i["id"] !== idValue})
                        atualizararray()
                    })
            
                })
              
            }
          })
        

    }  

//}

fetch(
    "https://ctd-todo-api.herokuapp.com/v1/users/getMe",
    requestConfigurationGet
).then(response => {
    response.json().then(data => {
        userNameRef.innerHTML = data.firstName
    });
});

    fetch('https://randomuser.me/api/')
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data.results[0].picture.thumbnail)
        imagem.setAttribute("src", data.results[0].picture.thumbnail)

    })

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
if(novaTarefaRef.value == ""){
    novaTarefaRef.focus()
    Swal.fire('Digite a descrição da tarefa no campo nova tarefa')
    
}else{
    event.preventDefault()
    creatTask()
    novaTarefaRef.value = ""
}
    
    
    
})

closeAppRef.addEventListener('click', () => {

    logOutUser()
})

