<template>
  <body>
    <!--Header-->
    <header class="navbar navbar-bc-color">
        <h1>Bienvenue sur le réseau Groupomania</h1>
    </header>

    <!--Connexion-->

        <section class="formulaire">
          <h2>Connexion</h2>
            <form id="form">

                <div class="form-group">
                    <label for="email">Votre email</label>
                    <input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" class="form-control" placeholder="nom@exemple.com" id="clientEmail">
                </div>
                <div class="form-group">
                    <label for="password">Votre mot de passe</label>
                    <input type="text" class="form-control">
                </div>
                <div class="buttons">
                    <button disabled id="validBtn" type="submit" class="btn btn-color">Connexion</button>
                </div>
            </form>
            <button type="submit" class="btn btn-primary">Inscription</button>
        </section>
        
</body>
</template>

<script>
//import Login from "./Connexion/Login.vue";
//import Signup from "./Connexion/Signup.vue";

export default {
  name: "Connexion",
  data() {
    return {
      component: "",
    };
  },

  components: {
    //login: Login,
    // signup: Signup,
  },
};
</script>

<style>
.navbar-bc-color,
.btn-color {
    background-color: #f2e8f0;
}

h2 {
    margin-bottom: 30px;
}

/*Formulaire*/
.formulaire {
    max-width: 400px;
    margin: 60px auto;
    display: flex;
    flex-direction: column;
}
 .form-group {
    text-align: left;
}

.formulaire h2{
  text-align: center;
}

</style>