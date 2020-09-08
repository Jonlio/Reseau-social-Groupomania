const connexion = document.getElementById('connexion');
 window.addEventListener('load', () => {
    if(!sessionStorage.getItem('token')) {
        window.location.replace('index.html')
    }

    let tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if(Date.now() >= tokenPayload.exp * 1000){
        alert('Session expirée')
        window.location.replace('index.html')
    }
})

