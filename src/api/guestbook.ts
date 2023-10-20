import { http } from '@/utils/http'

// 分页查询留言信息
export function getLeaveWordPage(params:any) {
  return http.get('/guestbook/user/page',params)
}

// 添加留言信息
export function addLeaveWord(data:any) {
  return http.post('/guestbook',data)
}
