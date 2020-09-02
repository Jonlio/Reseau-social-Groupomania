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

        img.classList.add('rounded-circle', 'profilPic');
        img.alt = "photo de profil"

        div.appendChild(img)
        div.appendChild(firstName)
        div.appendChild(email)

    } catch (error) {
        alert('Désolé, vous n\'avez pas accès à ce profil')
        document.location.href = "index.html";
    }
}

async function deleteProfil() {
    if (confirm("Êtes-vous sûr de vouloir supprimer votre profil?")) {
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
            alert("Votre profil à été supprimé");
            document.location.href = 'signup.html';
        }

    } else {
        window.location.reload()
    }
}

getProfil();