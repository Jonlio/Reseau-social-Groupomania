//Inscription profil utilisateur

const imageUrl = document.querySelector("#imageUrl")
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('form')

// Requete API
const postData = async (url, formData) => {
    try {
        const response = await fetch('http://localhost:3000/api/user/signup', {
            method: 'POST',
            body: formData
        })
        return await response.json();
    } catch (err) {
        throw new Error(err)
    }
}

// Création du profil
form.addEventListener("submit", async (e) => {
    try {
        e.preventDefault()
        
        const user = { firstName: firstName.value, lastName: lastName.value, email: email.value }
        
        const formData = new FormData()
        formData.append('image', imageUrl.files[0])
        formData.append('user', JSON.stringify(user))
        formData.append('password', password.value)
        
        const data = await postData('http://localhost:3000/api/user/signup', formData);
            if (data.error) {
                return console.error(data.error)
            }
            window.location = 'index.html';
        
    } catch (err) {
        throw new Error(err)
    }
})

