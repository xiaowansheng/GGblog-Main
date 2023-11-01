import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
// import Home from '@/views/home/index.vue'
import NProgress from '@/utils/progress'
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: routes
})

router.beforeEach((to: any, _from, next) => {
  // if (to.meta?.keepAlive) {

  // }
  NProgress.start()

  next()
})

router.afterEach(() => {
  NProgress.done()
})
export default router
