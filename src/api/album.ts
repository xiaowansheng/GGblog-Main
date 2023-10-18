import { http } from '@/utils/http'

// 分页查询相册
export function getAlbumPage(params:any) {
  return http.get('/album/user/page',params)
}

// 根据id查询相册
export function getAlbum(albumId:number|string) {
  return http.get('/album/detail/'+albumId)
}
