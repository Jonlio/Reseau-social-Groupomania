//Connexion de l'utilisateur
const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('form')
const url = 'http://localhost:3000/api/user/login'

sessionStorage.clear();

const postData = async (url, dataElt) => {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(dataElt)
    })
    if (response.ok) {
        return await response.json();
    } else {
        if (response.status == 400) {
            Swal.fire({
                title: 'La connexion à échouée!',
                text: 'Veuillez vérifier vos identifiants',
                icon: 'error',
                confirmButtonText: 'Ok'
          })
        }
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = { email: email.value, password: password.value }

    const data = await postData(url, login);
    if (data.error) {
        return console.error(data.error)
    }
    sessionStorage.setItem('token', data.token)
    window.location = `wall.html`;
})