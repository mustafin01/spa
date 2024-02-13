let isAuth = false
let users = []

let user = {
    login: 'user',
    password: 'Qwerty123'
}

document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault()
    let form = document.forms.login,
        login = form.elements[0].value,
        psw = form.elements[1].value

    if (login === user.login && psw === user.password){
        isAuth = true
    } else {
        isAuth = false
    }
    console.log(isAuth);
})