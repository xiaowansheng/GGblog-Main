import { defineStore } from 'pinia'
import { store } from '@/store'

export const useModuleStore = defineStore('module', {
  state: () => ({
    // 全屏加载
    loading: false,
    login: false,
    signup: false,
    changePassword: false,
    resetPassword: false
  }),
  getters: {},
  actions: {}
})

export function useModuleStoreHook() {
  return useModuleStore(store)
}
