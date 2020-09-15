const token = 'Bearer ' + sessionStorage.getItem('token');

async function getProfil() {
        response = await fetch("http://localhost:3000/api/user", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        return await response.json()
    }

async function displayProfil() {
    try {
        let profil = await getProfil();
       
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
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Veuillez sélectionner une image',
                showConfirmButton: false,
                timer: 1500
              })
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
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Format image non valide',
            showConfirmButton: false,
            timer: 1500
          })
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
                document.location.href = 'signup.html';
            }
        }
    } catch (error) {
        alert('Désolé, vous ne pouvez pas supprimer ce profil')
        document.location.href = "index.html";
    }
}

async function adminVue() {
    try {
        let profil = await getProfil();
        if (profil.isAdmin == true){
        response = await fetch("http://localhost:3000/api/user/admin", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        
        let users = await response.json()
        
        users.forEach(function(user) {
       
        let userPosts = user.Posts
        let lastPost = userPosts[userPosts.length - 1]

        let userComments = user.Comments
        let lastComment = userComments[userComments.length - 1]
        
        const section = document.getElementById('admin');
        const title = document.createElement('h3');
        const div = document.createElement('div');
        div.classList.add('userDisplay','badge', 'badge-secondary');
        const fullName = document.createElement('h4');
        const userPost = document.createElement('p');
        const userComment = document.createElement('p');

        title.innerHTML += 'Dernières participations des utilisateurs'
        fullName.innerHTML += user.firstName + ' ' + user.lastName

        if ((userPosts.length !== 0) && (userComments.length !== 0)) {
        userPost.textContent += 'Dernier post: ' + lastPost.content 
        userComment.textContent += 'Dernier commentaire: ' + lastComment.content
        }
        if ((userPosts.length !== 0) && (userComments.length == 0)) {
            userPost.textContent += 'Dernier post: ' + lastPost.content 
            userComment.textContent += 'Pas encore de commentaire'
        }
        if ((userPosts.length == 0) && (userComments.length !== 0)) {
            userPost.textContent += 'Pas encore de post' 
            userComment.textContent += 'Dernier commentaire: ' + lastComment.content
        } 
        if ((userPosts.length == 0) && (userComments.length == 0)) {
        userPost.textContent += 'Pas encore de post'
        userComment.textContent += 'Pas encore de commentaire'
        }
        
        section.append(div);
        div.append(fullName);
        div.append(userPost);
        div.append(userComment); 
        })    
    
    } else {
        document.getElementById('admin').style.visibility='hidden';
    }
} catch (error) {
    document.location.href = "wall.html";
}
}

displayProfil();
adminVue();
