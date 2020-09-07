const token = 'Bearer ' + sessionStorage.getItem('token');
const postId = sessionStorage.getItem('post');

async function getDatasUser() {
        response = await fetch("http://localhost:3000/api/user", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })   
        return await response.json();        
}

async function getDatasComment() {
    response = await fetch("http://localhost:3000/api/comment/" + postId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            mode: 'cors',
        })   
    return await response.json();        
}

//Gestion des Posts
//Affichage du post
async function getPost() {
    try {
        response = await fetch("http://localhost:3000/api/post/" + postId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            mode: 'cors',
        })
        
        let post = await response.json()
        let user = await getDatasUser()

        const div = document.getElementById('post');
        const content = document.createElement('h3');
        const img = document.createElement('img');

        content.innerHTML += post.content;
        img.src = post.imageUrl;
        img.classList.add('imgPost');
        img.alt = "image du post";
        
        div.append(content);
        div.append(img);
        
        if (post.userId !== user.id && user.isAdmin !== true ) {
           document.querySelector(".supp").style.visibility = "hidden";
        }
    } catch (error) {
        sessionStorage.removeItem('post');
        document.location.href = "wall.html";
    }
}

//Supprimer un post
async function deletePost() {
    try {
    response = await fetch("http://localhost:3000/api/post/" + postId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    await response.json();
    alert('Publication supprimée!')
    if (response.status === 200) {
        sessionStorage.removeItem('post')
        document.location.href = 'wall.html';
    }}
    catch (error) {
        window.location.reload()
    }
}

//Gestion des commentaires
//Poster un commentaire
async function postComment() {
    try {
        let com = document.getElementById('comment')
        let comment = new Object;
        comment.content = com.value
        response = await fetch("http://localhost:3000/api/comment/" + postId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            mode: 'cors',
            body: JSON.stringify(comment),
        })
        await response.json()
        if (response.status === 201) {
            window.location.reload()
        } else {
            alert("Le format de votre commentaire n\'est pas accepté ")
        }
    } catch (error) {
        alert('impossible de commenter')
        window.location.reload()
    }
}

//Afficher et supprimer les commentaires
async function displayComments() {
    try {
        let comments = await getDatasComment();
        let user = await getDatasUser();
        
        if(comments.length > 0){
            comments.forEach(function(comment){
                const section = document.getElementById('comments');
                const div = document.createElement('div');
                const firstName = document.createElement('h4');
                const textContent = document.createElement('p');
                const btn = document.createElement('button');
                
                div.classList.add('dataDisplay','badge', 'badge-pill', 'badge-light');

                firstName.innerHTML += comment.User.firstName + ' à commenté:';
                textContent.innerHTML += comment.content;
                btn.innerHTML += 'supprimer';
                btn.classList.add('btn','btn-outline-danger')
                btn.addEventListener('click', function() {
                    deleteCom()
                })

                section.appendChild(div);
                div.appendChild(firstName);
                div.appendChild(textContent);
                if (user.isAdmin == true) {
                    div.appendChild(btn);
                }
                
                async function deleteCom() {
                    response = await fetch("http://localhost:3000/api/comment/" + comment.id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }})
                    let post = await response.json();   
                    alert(post.message)
                    window.location.reload()
                } 
    });
} 
    } catch (error) {
        console.log('Impossible d\'afficher le commentaire')
    }
}

getPost();
displayComments();