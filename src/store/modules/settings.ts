import { defineStore } from "pinia";
import { store } from "@/store";

export const useSettingStore = defineStore({
  id: "pure-setting",
  state:()=> {
return{

}
  },
  getters: {
    getTitle(state) {
    },
  },
  actions: {}
});

export function useSettingStoreHook() {
  return useSettingStore(store);
}
