import { defineStore } from 'pinia'
import { store } from '@/store'

export const useWebsiteStore = defineStore('website', {
  state: () => ({
    title: '',
    icon: '',
    homeTitle: '',
    website: '',
    github: '',
    introduction: '',
    createTime: '',
    recordNumber: '',
    bulletin: ''
  }),
  getters: {},
  actions: {}
})

export function useWebsiteStoreHook() {
  return useWebsiteStore(store)
}
