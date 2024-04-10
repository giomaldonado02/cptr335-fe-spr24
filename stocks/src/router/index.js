import { createRouter, createWebHistory } from 'vue-router'
import Createuser from '../views/Createuser.vue'
import LoginView from '../views/LoginView.vue'
import UpdateUser from '../views/UpdateUser.vue'
import LoggedIn from '../views/LoggedInView.vue'
import Welcome from '../views/Welcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/loggedin',
      name: 'loggedin',
      component: LoggedIn
    },
    {
      path: '/create',
      name: 'Createuser',
      component: Createuser
    },
    {
      path: '/update',
      name: 'UpdateUser',
      component: UpdateUser
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },

  ]
})

export default router
