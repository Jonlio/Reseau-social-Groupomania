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
        
        console.log(post) 

    } catch (error) {
        sessionStorage.removeItem('post');
        document.location.href = "wall.html";
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

//TODO: AFFICHAGE Comments

getPost()
