const token = 'Bearer ' + sessionStorage.getItem('token');
const postId = sessionStorage.getItem('post');


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
        document.location.href = "index.html";
    }
}

getPost()

