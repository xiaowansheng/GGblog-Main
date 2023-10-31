import { http } from '@/utils/http'

// 添加评论
export function addComment(data:any) {
  return http.post('/comment',data)
}

// 分页查询评论信息
export function getCommentPage(params:any) {
  return http.get('/comment/info/page', params)
}
