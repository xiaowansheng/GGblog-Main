import 'element-plus/dist/index.css'
import 'cherry-markdown/dist/cherry-markdown.css'
// 引入图标字体
import '@/assets/font/font_blog/iconfont.css'
// import "vditor/dist/index.css";
import '@/assets/css/global.scss'; // 引入全局样式文件
import '@/assets/main.scss'

import '@/assets/css/markdown.scss'
import { createApp } from 'vue'
import { setupStore } from '@/store/index'
import { useElementPlus } from '@/plugins/element-plus/index'
import { useI18n } from './plugins/i18s'
import App from './App.vue'
// import { Icon } from '@iconify/vue'
import router from './router'
import 'virtual:svg-icons-register'
import { useSvgIcon } from '@/plugins/svg'
const app = createApp(App)

setupStore(app)
useElementPlus(app)
useI18n(app)
useSvgIcon(app)
app.use(router)
// 注册全局图标
// app.component('Icon', Icon)
app.mount('#app')
