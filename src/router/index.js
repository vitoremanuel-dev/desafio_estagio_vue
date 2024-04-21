import { createRouter, createWebHistory } from 'vue-router'
import Home from '../View/Home.vue'
import Sobre from '../View/Sobre.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/sobre',
      component: Sobre
    },
  ]
})
export default router;