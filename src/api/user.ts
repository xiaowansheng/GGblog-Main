import { http } from '@/utils/http'

// 用户登录
export function login(data:any) {
  return http.post('/user/auth/login',data)
}

// 用户注销
export function logout() {
  return http.get('/user/auth/logout')
}

// 重新获取token
export function refreshToken(data: object | any) {
  return http.request<any>('get', '/user/auth/refresh/token', {
    headers: {
      Authorization: data.refreshToken
    }
  })
}
