import Vue from 'vue'
import VueRouter from 'vue-router'
import Connexion from '../components/Connexion.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  }
]

const router = new VueRouter({
  routes
})

export default router
