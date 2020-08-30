const connexion = document.getElementById('connexion');
 window.addEventListener('load', () => {
    if( !sessionStorage.getItem('token')) {
        return window.location.replace('index.html')
    }
})