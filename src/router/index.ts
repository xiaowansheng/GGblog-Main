import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
// import Home from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: routes
})

export default router
