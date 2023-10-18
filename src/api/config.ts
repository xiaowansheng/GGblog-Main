import { http } from "@/utils/http"

// 获取所有的配置信息列表
export function getConfig() {
  return http.get("/website/config/list")
}

// 获取关于 
export function getAbout() {
  return http.get("/website/about")
}