import { defineStore } from 'pinia'
import { store } from '@/store'
import type { userType } from '../types'
import { login, logout, refreshToken } from '@/api/user'
import { storageLocal, getLocalStorage, removeLocalStorage } from '@/utils/storageUtils'
import { useModuleStoreHook } from './module'
// import { storageSession } from "@pureadmin/utils";
const storageKey = 'user_info'
const accessKey = 'authorized_token'

// {
//     // 用户名
//     username: localStorage.getItem(storageKey).username??"",
//     // 用户昵称
//     nickname: localStorage.getItem(storageKey).nickname??"",
//     // 用户头像
//     avatar: localStorage.getItem(storageKey).avatar??"",
//     // 页面级别权限
//     roles:  localStorage.getItem(storageKey).roles??[]
//     // information: {}
//   }
export const useUserStore = defineStore({
  id: 'user',
  state: (): userType => ({
    // 用户名
    username: (getLocalStorage(storageKey) as userType)?.username ?? '',
    // 用户昵称
    nickname: (getLocalStorage(storageKey) as userType)?.nickname ?? '',
    // 用户头像
    avatar: (getLocalStorage(storageKey) as userType)?.avatar ?? '',
    // 页面级别权限
    roles: (getLocalStorage(storageKey) as userType)?.roles ?? []
    // information: {}
  }),
  actions: {
    /** 存储用户名 */
    setUsername(username: string) {
      this.username = username
    },
    /** 存储用户昵称 */
    setNickname(nickname: string) {
      this.nickname = nickname
    },
    /** 存储用户头像 */
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    /** 存储角色 */
    setRoles(roles: Array<string>) {
      this.roles = roles
    },
    setToken(accessToken: any, expires: number, refreshToken: string) {
      storageLocal(accessKey, {
        accessToken,
        expires,
        refreshToken
      })
    },
    getToken() {
      return getLocalStorage(accessKey)
    },
    storageInfo(info?: userType) {
      if (info) {
        storageLocal(storageKey, info)
      } else {
        storageLocal(storageKey, {
          username: this.username,
          nickname: this.nickname,
          avatar:this.avatar,
          roles:this.roles
        })
      }
    },
    removeInfo() {
      removeLocalStorage(accessKey)
      removeLocalStorage(storageKey)
    },
    setData(data: any) {
      const { accessToken, refreshToken, username, nickname, avatar, roles, expires } = data
      this.setUsername(username)
      this.setNickname(nickname)
      this.setAvatar(avatar)
      this.setRoles(roles)

      // 保存token到会话
      this.setToken(accessToken, expires, refreshToken)
      // 保存用户信息到本地空间
      this.storageInfo({
        username,
        nickname,
        avatar,
        roles
      })
    },
    /** 登入 */
    async loginByUsername(loginForm: any): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        login(loginForm)
          .then((data: any) => {
            console.log('logindfata', data)
            this.setData(data)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    clearUserCache() {
      this.username = ''
      this.nickname = ''
      this.avatar = ''
      this.roles = []
    },
    /** 前端登出（调用接口） */
    logOut() {
      const clearData = () => {
        // 清除piano数据
        this.clearUserCache()
        // 清空本地存储
        this.removeInfo()
      }
      // 清空状态管理中用户信息
      // 调用注销接口
      logout()
        .then(() => {
          clearData()
        })
        .catch(() => {
          clearData()
        })
    },
    /** 重新登录 */
    loginAgain() {
      this.clearUserCache()
      this.removeInfo()
      useModuleStoreHook().login = true
    },
    /** 刷新`token` */
    async handRefreshToken(data: any) {
      return new Promise<any>((resolve, reject) => {
        refreshToken(data)
          .then((data) => {
            if (data) {
              this.setData(data)
              resolve(data)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
