let buttonRef = document.querySelector('#signUp')

let inputRefName = document.querySelector('#name')
let inputRefLastName = document.querySelector('#lastName')
let inputRefMail = document.querySelector('#mail')
let inputRefPassW = document.querySelector('#passW')



buttonRef.addEventListener('click',event =>{
    
    event.preventDefault()
    
    let signUpData = {

        firstName : inputRefName.value,
        lastName : inputRefLastName.value,
        email : inputRefMail.value,
        password : inputRefPassW.value
    }
    
    
    let requestHeaders = {
    
        'Content-Type': 'application/json'
    }
    
    
    let requestConfiguration = {
    
        method: 'POST',
        body: JSON.stringify(signUpData),
        headers: requestHeaders
    
    }
    
    
    fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestConfiguration).then(
    
        response => {
    
            response.json().then(
    
                data => {
    
                    console.log(data)                    
    
                }    
            )    
        }    
    )    
})