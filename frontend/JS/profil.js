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

async function updateProfilPic() {
    try {
        let input = document.getElementById('imageUrl').value
        const formData = new FormData()
        formData.append('image', imageUrl.files[0])
        if (input == 0) {
        alert('Veuillez sélectionner une photo de profil')
        } else {
        const response = await fetch('http://localhost:3000/api/user/', {
            method: 'PUT',
            headers: {
                'Authorization': token
            },
            body: formData
        })     
        
        if (response.status == 201){
            window.location.reload();
        } else {
            alert('Le format de votre image n\'est pas valide')
        }
    }} catch (error) {
        alert('Modification de la photo impossible');
        window.location.reload();
    }       
}

async function deleteProfil() {
    try {
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
        }
    } catch (error) {
        alert('Désolé, vous ne pouvez pas supprimer ce profil')
        document.location.href = "index.html";
    }
}

getProfil();