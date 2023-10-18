import { http } from '@/utils/http'

// 查询所有标签
export function getTalkPage(params:any) {
  return http.get('/talk/user/page',params)
}

// 查询所有标签
export function getTalk(id:string|number) {
  return http.get('/talk/detail/'+id)
}
