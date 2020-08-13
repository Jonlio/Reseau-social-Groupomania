<template>
    <v-app class="signup ma-auto mt-6" v-if="form">
        <v-card class="signup__card" shaped>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field  v-model="dataSignup.email" :rules="emailRules" label="e-mail" prepend-icon="mdi-at" required></v-text-field>
                    <v-text-field  v-model="dataSignup.password" :rules="passRules" type="password" label="mot de passe" prepend-icon="mdi-lock" required></v-text-field>
                </v-form>
                <v-btn :disabled="!valid" class="success" >Connexion</v-btn>
            </v-card-text>
        </v-card>
    </v-app>
</template>
<script>


export default {
    name : "Signup",
    data(){
        return{
            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passRules: [
                v => !!v || 'Password is required'
            ],
            dataSignup:{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
            dataSignupS: "", 
            form: true,
            msg: false,
            message: ""
        }
    },
    
}
</script>
<style lang="scss">
    .signup{
        position: relative;
        top : 5%;
        width: 350px;
        max-height: 200px;
        text-align: center;
    }
</style>