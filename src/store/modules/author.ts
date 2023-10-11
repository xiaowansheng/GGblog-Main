import { defineStore } from 'pinia'
import { store } from '@/store'

export const useAuthorStore = defineStore('author', {
  state: () => ({
    nickname: '',
    avatar: '',
    introduction: '',
    contact: {
      Email: {
        value: '',
        show: false
      },
      QQ: {
        value: '',
        show: false
      },
      Wechat: {
        value: '',
        show: false
      },
      Weibo: {
        value: '',
        show: false
      },
      Facebook: {
        value: '',
        show: false
      },
      Twitter: {
        value: '',
        show: false
      },
      Telegram: {
        value: '',
        show: false
      },
      Github: {
        value: '',
        show: false
      },
      Gitee: {
        value: '',
        show: false
      }
    }
  }),
  getters: {},
  actions: {}
})

export function useAuthorStoreHook() {
  return useAuthorStore(store)
}
