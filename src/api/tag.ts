import { http } from '@/utils/http'

// 查询所有标签
export function getAllTag() {
  return http.get('/tag/user/list')
}


// 查询标签信息
export function getTag(id:string|number) {
  return http.get('/tag/detail/'+id)
}
