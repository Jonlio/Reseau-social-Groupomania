const connexion = document.getElementById('connexion');
 window.addEventListener('load', () => {
    if(!sessionStorage.getItem('token')) {
        alert('Veuillez vous reconnecter!')
        window.location.replace('index.html')
    }

    let tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if(Date.now() >= tokenPayload.exp * 1000){
        alert('Votre session à expiré!')
        window.location.replace('index.html')
    }
})

