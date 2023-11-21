import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
// import Home from '@/views/home/index.vue'
import NProgress from '@/utils/progress'
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果存在 savedPosition，则恢复到之前的滚动位置
    if (savedPosition) {
      return savedPosition
    } else {
      // 否则，滚动到页面顶部
      return { top: 0 }
    }
  }
})

router.beforeEach((to: any, _from, next) => {
  // if (to.meta?.keepAlive) {

  // }
  NProgress.start()

  next()
})

router.afterEach((to, from) => {
  // if (!to.meta.keepAlive) {
    
  // }
  NProgress.done()
})
export default router
