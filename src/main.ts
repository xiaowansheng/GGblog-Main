import 'element-plus/dist/index.css'
import './assets/main.css'
import { createApp } from 'vue'
import { setupStore } from '@/store/index'
import { useElementPlus } from '@/plugins/element-plus/index'
import { useI18n } from './plugins/i18s'
import App from './App.vue'
import router from './router'
const app = createApp(App)

setupStore(app)
useElementPlus(app)
useI18n(app)
app.use(router)
app.mount('#app')
