const token = 'Bearer ' + sessionStorage.getItem('token');
const postId = sessionStorage.getItem('post');

//Gestion des Posts
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
        
        const div = document.getElementById('post');
        const content = document.createElement('p');
        const img = document.createElement('img');

        content.innerHTML += post.content;
        img.src = post.imageUrl;
        
        div.append(content);
        div.append(img);

    } catch (error) {
        sessionStorage.removeItem('post');
        document.location.href = "wall.html";
    }
}

async function displayComments() {
    try {
        response = await fetch("http://localhost:3000/api/comment/" + postId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            mode: 'cors',
        })

        let comments = await response.json();

        if(comments.length > 0){
            comments.forEach(function(comment){
                const section = document.getElementById('comments');
                const div = document.createElement('div');
                const firstName = document.createElement('h4');
                const textContent = document.createElement('p');
                const img = document.createElement('img');

                firstName.innerHTML += comment.User.firstName + ' à commenté:';
                textContent.innerHTML += comment.content;

                section.appendChild(div);
                div.appendChild(firstName)
                div.appendChild(textContent)
            });
        }    
    } catch (error) {
        console.log('Impossible d\'afficher le commentaire')
    }
}


async function deletePost() {
    response = await fetch("http://localhost:3000/api/post/" + postId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        mode: 'cors',
    })
    let post = await response.json();
    alert('Publication supprimée!')
    if (response.status === 200) {
        sessionStorage.removeItem('post')
        document.location.href = 'wall.html';
    } else {
        window.location.reload()
    }
}


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
        let post = await response.json()
        if (response.status === 201) {
            window.location.reload()
        } else {
            alert(post.message)
        }
    } catch (error) {
        alert('impossible de commenter')
        window.location.reload()
    }
}

//TODO: Suppression commentaires

getPost();
displayComments();