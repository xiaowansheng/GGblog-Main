import { defineStore } from 'pinia'
import { store } from '@/store'
import type { userType } from '../types'
// import { storageSession } from "@pureadmin/utils";
export const useUserStore = defineStore({
  id: 'user',
  state: (): userType => ({
    // 用户名
    username: '',
    // 用户昵称
    nickname: '',
    // 用户头像
    avatar: '',
    // 页面级别权限
    roles: [],
    information: {}
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username
    },
    /** 存储用户昵称 */
    SET_NICKNAME(nickname: string) {
      this.nickname = nickname
    },
    /** 存储用户头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles
    },
    /** 登入 */
    // async loginByUsername(loginVo) {
    // return new Promise<LoginData>((resolve, reject) => {
    //   getLogin(loginVo)
    //     .then((data: any) => {
    //       setToken(data)
    //       resolve(data)
    //     })
    //     .catch((error) => {
    //       reject(error)
    //     })
    // })
    // },
    /** 前端登出（调用接口） */
    logOut() {
      const clearUserCache = () => {
        //   this.username = ''
        //   this.nickname = ''
        //   this.avatar = ''
        //   this.roles = []
        //   removeToken()
        //   useMultiTagsStoreHook().handleTags('equal', [...routerArrays])
        //   resetRouter()
        //   router.push('/login')
        // }
        // getLogout()
        //   .then(() => {
        //     clearUserCache()
        //   })
        //   .catch(() => {
        //     clearUserCache()
        //   })
      }
      /** 重新登录 */
      // loginAgain() {
      //   this.username = ''
      //   this.nickname = ''
      //   this.avatar = ''
      //   this.roles = []
      //   removeToken()
      //   router.push('/login')
      // },
      /** 刷新`token` */
      // async handRefreshToken(data) {
      //   return new Promise<RefreshTokenResult>((resolve, reject) => {
      //     refreshTokenApi(data)
      //       .then((data) => {
      //         if (data) {
      //           setToken(data)
      //           resolve(data)
      //         }
      //       })
      //       .catch((error) => {
      //         reject(error)
      //       })
      //   })
    }
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
