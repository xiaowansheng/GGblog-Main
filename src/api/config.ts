import { http } from "@/utils/http"

export function getConfig() {
  return http.get("/website/config/list")
}