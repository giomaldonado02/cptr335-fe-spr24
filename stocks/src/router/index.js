import { createRouter, createWebHistory } from 'vue-router'
import Createuser from '../views/Createuser.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/create',
      name: 'Createuser',
      component: Createuser
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
