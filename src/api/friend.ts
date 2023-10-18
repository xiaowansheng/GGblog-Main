import { http } from '@/utils/http'

// 分页查询友情链接
export function getFriendPage(params:any) {
  return http.get('/friend/user/page',params)
}

// 添加友情链接
export function addFriend(data:any) {
  return http.post('/friend',data)
}
