import { http } from '@/utils/http'

// 分页查询照片
export function getPicturePage(params:any) {
  return http.get('/picture/user/page',params)
}
