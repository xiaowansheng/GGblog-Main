import { defineStore } from 'pinia'
import { store } from '@/store'

export const useModuleStore = defineStore('module', {
  state: () => ({
    login: false,
    signuop: false,
    changePassword:false
  }),
  getters: {},
  actions: {}
})

export function useModuleStoreHook() {
  return useModuleStore(store)
}
