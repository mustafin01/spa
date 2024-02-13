let isAuth = false
let users = []

const BASE_URL = 'https://jsonplaceholder.typicode.com'

document.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.tagName == 'A') {
        route(e)
        handleLocation()
    }
})

const route = (e) => {
    window.history.pushState({}, '', e.target.href)
}

const routes = {
    '/spa/': 'main.html',
    '/spa/contacts': 'contacts.html',
    '/spa/about': 'about.html',
    '/spa/registration': 'registration.html',
    '/spa/login': 'login.html',
}

const handleLocation = async (e) => {
    const path = window.location.pathname;
    

    if (path === '/spa/login'){
        document.querySelector('.all').innerHTML = `
        <div class="block">
        <h1 class="title">Login</h1>
        <form action="" class="form" name="login">
            <div class="input-wrap">
                <label for="login" class="input-lable">Login</label>
                <input type="text"  class="input" name="login" id="login">
            </div>
    
            <div class="input-wrap">
                <label for="#password" class="input-lable">Password</label>
                <input type="text"  class="input" name="password" id="password">
            </div>
    
           <button class="btn">login</button>
    
        </form>

        <script src="./login.js"></script>
        `
    } else if (path === '/spa/registration'){
            document.querySelector('.all').innerHTML = `
            <div class="block">
        <h1 class="title">Registration</h1>
        <form action="" class="form" name="reg">
            <div class="input-wrap">
                <label for="email" class="input-lable">Email</label>
                <input type="email"  class="input" name="email" id="email">
            </div>

            <div class="input-wrap">
                <label for="login" class="input-lable">Login</label>
                <input type="text"  class="input" name="login" id="login">
            </div>
    
            <div class="input-wrap">
                <label for="password" class="input-lable">Password</label>
                <input type="password"  class="input" name="password" id="password">
            </div>

            <div class="input-wrap">
                <label for="repeat password" class="input-lable">Repeat Password</label>
                <input type="password"  class="input" name="repeat password" id="repeat password">
            </div>
           <button class="btn-reg">login</button>
    
        </form>

        <script src="./register.js"></script>
            `
    } else if (path === '/spa/posts') {
        document.querySelector('.all').innerHTML = '<h1><y posts</h1>'
        fetch (`${BASE_URL}/posts`)
        .then(data => data.json())
        .then(data => printPosts(data))
        

    } else {
        const html = await fetch(routes[path])
    .then(data => data.text());
    document.querySelector('.all').innerHTML = html;
    }

} 

function printPosts (posts) {
    posts.forEach(post => {
        return document.querySelector('.all').insertAdjacentHTML('beforeend',
            `
            <div>
                <h2 class='title'>${post.title}</h2>
                <p class='text'>${post.body}</p>
                <div class="comments">
                
                </div>
                <div class="com-block">
                    <input type="text" name="com" >
                    <button class="comment com">Добавить комментарий</button>

                </div>
                <hr>
            </div>

            `
        )
    });
}

window.onpopstate = handleLocation
window.route = route
handleLocation()


let user = {
    login: 'user',
    password: '123'
}

document.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('btn')){
        let form = document.forms.login,
        login = form.elements[0].value,
        psw = form.elements[1].value

        if (login === user.login && psw === user.password){
            isAuth = true
        } else {
            isAuth = false
        }
        console.log(isAuth);
    } else if (e.target.classList.contains('btn-reg')){
        e.preventDefault()
        let form = document.forms.reg,
            email = form.elements[0].value,
            login = form.elements[1].value,
            psw = form.elements[2].value,
            psw2 = form.elements[3].value
    
        if (psw === psw2) {
            users.push({email,login,psw})
            isAuth = true
        } else {
            isAuth = false
        }
        console.log(isAuth, users);
    } 
    
})


document.addEventListener('click', async (e) => {
    e.preventDefault();
    let elem = e.target.previousElementSibling;
    if (e.target.classList.contains('com')){
        let commetnt_text = elem.value
        let info = {
            userId:1,
            title:'khsfbvjk',
            body:'hbhj'
        }
        // console.log(elem.parentElement)
        elem.parentElement.previousElementSibling.innerHTML = commetnt_text;
        const response = await fetch(`${BASE_URL}/posts`,{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(info)
            });
            let post = await response.json()
            console.log(post)
        }
    
    // let comment = document.querySelector('.comments').innerHTML = commetnt_text

    }
)
