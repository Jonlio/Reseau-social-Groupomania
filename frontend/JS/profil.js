const token = 'Bearer ' + sessionStorage.getItem('token');

async function getProfil() {
    try {
        response = await fetch("http://localhost:3000/api/user", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        
        let profil = await response.json();
       
        const div = document.getElementById('profil');
        const firstName = document.createElement('h3');
        const email = document.createElement('p');
        const img = document.createElement('img');

        firstName.innerHTML += profil.firstName + ' ' + profil.lastName;
        email.innerHTML += profil.email;
        img.src = profil.imageUrl;

        img.classList.add('rounded-circle','profilPic')

        div.appendChild(img)
        div.appendChild(firstName)
        div.appendChild(email)

    } catch (error) {
        alert('Désolé, vous n\'avez pas accès à ce profil')
        document.location.href = "index.html";
    }
}

async function deleteProfil() {
    response = await fetch("http://localhost:3000/api/user", {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        mode: 'cors',
    })

    if (response.status === 200) {
        sessionStorage.clear();
        document.location.href = 'signup.html';
    }
}

getProfil()
