import 'element-plus/dist/index.css'
import 'cherry-markdown/dist/cherry-markdown.css'

// import "vditor/dist/index.css";
import '@/assets/main.scss'

import '@/assets/css/markdown.scss'
import { createApp } from 'vue'
import { setupStore } from '@/store/index'
import { useElementPlus } from '@/plugins/element-plus/index'
import { useI18n } from './plugins/i18s'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
import { useSvgIcon } from '@/plugins/svg'
const app = createApp(App)

setupStore(app)
useElementPlus(app)
useI18n(app)
useSvgIcon(app)
app.use(router)
app.mount('#app')
