import { http } from '@/utils/http'

// 查询所有分类
export function getAllCategory() {
  return http.get('/category/user/list')
}

// 查询分类信息
export function getCategory(id:string|number) {
  return http.get('/category/'+id)
}