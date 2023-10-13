import { http } from '@/utils/http'

// 查询所有标签
export function getTalkPage(params:any) {
  return http.get('/talk/user/page',params)
}
