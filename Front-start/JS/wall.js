const content = document.getElementById('content');
const fileField = document.querySelector('input[type=file]')
const btn = document.getElementById('btn');

const url = 'http://localhost:3000/api/post';
const token = 'Bearer ' + sessionStorage.getItem('token');

// Création datas Post 
const createData = async (url, formData) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': token
            },
            method: 'POST',
            body: formData
        })
        return await response.json()
    } catch (err) {
        throw new Error(err)
    }
}

// Création Post
btn.addEventListener('click', async (e) => {
    try {
        e.preventDefault();

        if (content.value.length > 0) {
            const formData = new FormData();
            const post = {
                content: content.value
            }
            formData.append('post', JSON.stringify(post))
            if (fileField.files[0]) formData.append('image', fileField.files[0])
            const data = await createData(url, formData)
            content.value = "";
            window.location.reload(true)
            return console.log(data.message)
        }
    } catch (err) {
        throw new Error(err)
    }
})

// GET POSTS
// Affichage des posts
const urlPosts = 'http://localhost:3000/api/post'
const displayPosts = async () => {
    const posts = await getPosts(urlPosts);
    for (let i = posts.length - 1; i >= 0; i--) {
        const { userId, User, content, imageUrl } = posts[i]
        renderPost(userId, User,imageUrl, content)
    }
}

// Récupération datas posts
const getPosts = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        return await response.json()
    } catch (err) {
        throw new Error(err)
    }
}

const renderPost = (userId, User, imageUrl, postContent) => {
    const section = document.getElementById('post');
    const article = document.createElement('article');

    article.innerHTML = `
        <div class="post">
            <p>Publication de: ${User.firstName}</p>
            <a href="post.html?"><p>${postContent}</p>
            <img src="${imageUrl}"></a>
        </div>    `

    section.appendChild(article)
}

displayPosts()
