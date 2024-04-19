import { createRouter, createWebHistory } from 'vue-router'
import Home from './View/Home.vue'
import About from './View/Sobre.vue'

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
      component: About
    },
  ]
})
export default router;