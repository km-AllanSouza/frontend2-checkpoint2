const userNameRef = document.querySelector('#userName')
const closeAppRef = document.querySelector('#closeApp')
const newTaskRef = document.querySelector('#newTask')
const skeletonRef = document.querySelector('#skeleton')
const ulTarefasRef = document.querySelector('.tarefas-pendentes')
const ulTarefasTerminadasRef = document.querySelector('.tarefas-terminadas')
const novaTarefaRef = document.querySelector('#novaTarea')
const imagem = document.querySelector('.user-image')


//Variavel de configuração dos herder utilizado nas requisições da API
const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token")
}

const requestConfigurationGet = {
    headers: requestHeaders
};


let taskList = [] // Variavel de armazenamento das tasks pendentes
let tasksCompletedList = [] // Variavel de armazenamento das tasks Concluidas


//faz o logout do usuario
function logOutUser() {
    localStorage.clear();
    window.location.href = "./index.html";
}

// faz a requisição get para redenrização da pagina apos realização das tarefas.
function atualizararray() {
    taskList = []
    tasksCompletedList = []
    fetch(
        "https://ctd-todo-api.herokuapp.com/v1/tasks",
        requestConfigurationGet
    ).then(response => {
        response.json().then(data => {

            for (const task of data) {

                if (task.completed) {
                    tasksCompletedList.push(task)
                } else taskList.push(task)

            }
            taskRender()
        });
    });
}

//Responsavel por redenrizar a pagina apos cada ação
function taskRender() {


    ulTarefasRef.innerHTML = ""
    ulTarefasTerminadasRef.innerHTML = ""

    for (const task of taskList) {
        const dataCreat = new Date(task.createdAt)
        const dataFormatada = dataCreat.toLocaleDateString(
            'pt-br', {
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
            'pt-br', {
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

// Responsavel por realizar a adição de novas tasks
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
        response.json().then(data => {
            taskList.push(data)
            taskRender()
        })
    });
}

//Responsavel por retorna a task de concluida para pendente
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
    });
}

//Responsavel por mover a task de pendente para concluida
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

// Responsavel por editar a task
function EditTarefa(idValue) {

    Swal.fire({
        title: 'Substitua sua tarefa',
        input: 'text',
        confirmButtonColor: '#7A93F9',
        cancelButtonColor: '#FA314A',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Substituir',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            //console.log(login)
            if (login) {

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
                    response.json().then(data => {

                        atualizararray()
                        //alert('Tarefa Editada Com sucesso!')
                        //location.reload()
                    })
                });
            }
        },
    })
}

// Responsavel por excluir a task
function excluir(idValue) {

    Swal.fire({
        title: 'Você tem certeza?',
        text: "Não vai ser possivel reverter essa ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7A93F9',
        cancelButtonColor: '#FA314A',
        confirmButtonText: 'Sim, delete!'
    }).then((result) => {
        if (result.isConfirmed) {
            let settingDelete = {
                method: "DELETE",
                headers: requestHeaders
            }

            fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${idValue}`, settingDelete).then(response => {

                response.json().then(data => {

                    //taskList = taskList.filter(i =>{return i["id"] !== idValue})
                    atualizararray()
                })
            })
        }
    })
}
// gerar fotos aleatórias de pokemons
function pokeImg() {
    let teste = Math.floor(Math.random() * 251) + 1;

    fetch(
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' + teste + '.png', )
        .then(response => {
            imagem.setAttribute("src", response.url)
        })
}

//REsponsavel por pegar uma foto atravez de outra API e exibir---------------------------------------------------------------------------------------------------------------------------
function userImg() {

    fetch('https://randomuser.me/api/')
        .then(response => {
            return response.json()
        })
        .then(data => {
            //console.log(data.results[0].picture.thumbnail)
            imagem.setAttribute("src", data.results[0].picture.thumbnail)
        })
}

//REsponsavel por mudar o tema de claro para escuro e virse-versa
function modoDark() {

    let BoryDarkReference = document.querySelector('.d-dark')
    BoryDarkReference.classList.toggle('dark')
    userImg()
}


//REsponsavel por pegar os nome do usuario e exibir-----------------------------------------------------------------------------------------------------------------------------------------
fetch(
    "https://ctd-todo-api.herokuapp.com/v1/users/getMe",
    requestConfigurationGet
).then(response => {
    response.json().then(data => {
        userNameRef.innerHTML = data.firstName
    });
});



//Responsavel por fazer o a solicitação Get ao logar e chama a função taskRender() para redenrizar a tela quando o usuaario loga---------------------------------------------------------
// substuido pela função atualizar array !comentar com o grupo


//Responsavel por escutar o botão nova tarefa e disparar uma ação-----------------------------------------------------------------------------------------------------------------------------

newTaskRef.addEventListener('click', event => {

    event.preventDefault()
    if (novaTarefaRef.value == "") {
        novaTarefaRef.focus()
        Swal.fire({
            title: 'Digite a descrição da tarefa no campo nova tarefa',
            confirmButtonColor: '#7A93F9',
        })

    } else {
        event.preventDefault()
        creatTask()
        novaTarefaRef.value = ""
    }
})

//Responsavel por escutar o botão logout e disparar uma ação
closeAppRef.addEventListener('click', () => {

    logOutUser()
})
userImg()
atualizararray()