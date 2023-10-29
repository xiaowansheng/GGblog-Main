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



// 用户注册
export function signup(data:any) {
  return http.post('/user/auth/signup',data)
}

// 获取验证码
export function getVerificationCode(params: any) {
  return http.get('/user/auth/verificationCode', params)
}

// 修改密码
export function changePassword(data: any) {
  return http.put('/user/auth/password', data)
}

// 重置密码
export function resetPassword(data: any) {
  return http.put('/user/auth/reset/password', data)
}