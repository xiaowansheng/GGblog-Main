import { http } from '@/utils/http'

// 查询文章，分类，标签 数量统计
export function getSimpleStatistic() {
  return http.get('/article/user/statistics/number')
}

// 分页查询文章信息
export function getArticlePage(params?: any) {
  return http.get('/article/user/page', params)
}

// 查询文章归档信息
export function getArticleArchive(params?:any) {
  return http.get('/article/user/archive',params)
}


// 查询文章具体信息
export function getArticle(id:string|number) {
  return http.get('/article/detail/'+id)
}

