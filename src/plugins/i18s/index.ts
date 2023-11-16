// index.js
import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import zh from '@/locales/zh'
import en from '@/locales/en'
// element-plus国际化
import enLocale from "element-plus/es/locale/lang/en";
import zhLocale from "element-plus/es/locale/lang/zh-cn";
const messages = {
  en: {
    ...enLocale,
    ...en,
  },
  zh: {
    ...zhLocale,
    ...zh
  }
}
const language = (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言
const i18n = createI18n({
  locale: localStorage.getItem('lang') || language.split('-')[0] || 'zh', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'en', // 设置备用语言
  messages, 
})



export default i18n;

export function useI18n(app:App){
    app.use(i18n)
}

export function t(key: string) {
  return i18n.global.t(key)
}

export function toggleLanguage() :string{
  if ( i18n.global.locale == 'zh') {
     i18n.global.locale = 'en'
  } else {
     i18n.global.locale = 'zh'
  }
  return i18n.global.locale
}


export function setLanguage(language:string) :string{
  if (language == 'zh') {
    i18n.global.locale = 'zh'
  } else {
    i18n.global.locale = 'en'
  }
}
