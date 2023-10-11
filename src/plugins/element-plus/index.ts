import type { App } from 'vue'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
export function useElementPlus(app: App) {
  app.use(ElementPlus, { locale: zhCn, size: 'default', zIndex: 2000 })
}
