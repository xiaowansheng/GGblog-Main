import { defineStore } from 'pinia'
import { store } from '@/store'
import { getConfig } from '@/api/config'

import { getSimpleStatistic } from '@/api/article'

import { useModuleStoreHook } from '@/store/modules/module'
export const useConfigStore = defineStore('config', {
  state: () => ({
    author: {
      nickname: '',
      avatar: '',
      introduction: ''
    },
    contact: {
      Email: {
        value: '',
        show: false
      },
      QQ: {
        value: '',
        show: false
      },
      Wechat: {
        value: '',
        show: false
      },
      Weibo: {
        value: '',
        show: false
      },
      Facebook: {
        value: '',
        show: false
      },
      Twitter: {
        value: '',
        show: false
      },
      Telegram: {
        value: '',
        show: false
      },
      Github: {
        value: '',
        show: false
      },
      Gitee: {
        value: '',
        show: false
      }
    },
    website: {
      title: '',
      icon: '',
      homeTitle: '',
      website: '',
      github: '',
      introduction: '',
      createTime: '',
      recordNumber: '',
      bulletin: '',
      pageView: 0
    },
    menus: {},
    covers: {
      Welcome: '',
      Home: '',
      Archive: '',
      Category: '',
      Tag: '',
      Talk: '',
      Album: '',
      Friend: '',
      Guestbook: '',
      About: '',
      Other: '',
      Information: ''
    },
    login: {
      Email: false,
      QQ: false,
      Weibo: false,
      Google: false,
      Twitter: false,
      Facebook: false,
      Github: false,
      Gitee: false
    },
    module: {
      Bulletin: false,
      Login: false,
      Comment: false,
      ThirdPartLogin: false,
      Register: false,
      Search: false,
      Reward: false
    },
    privacy: {
      Address: false,
      Device: false,
      Browser: false,
      Location: false,
      Visitor: false,
      LoginVerificationCode: false,
      CommentVerificationCode: false,
      LeaveWordVerificationCode: false
    },
    avatar: {
      User: '',
      Visitor: '',
      Anonymous: ''
    },
    reward: {
      Alipay: '',
      Wechat: ''
    },
    statistic: {
      article: 0,
      category: 0,
      tag: 0,
      talk: 0
    }
  }),
  getters: {},
  actions: {
    setCovers(data: any[]) {
      this.covers = data.reduce((obj, item) => {
        obj[item.name] = item.url
        return obj
      }, {})
      // console.log(this.covers );
    },
    setMenus(data: any[]) {},
    setWebsite(data: any) {
      Object.assign(this.website, data)
    },
    setPageView(number: number) {
      this.website.pageView = number
    },
    setAuthor(data: any) {
      Object.assign(this.author, data)
    },
    setSocialAccount(data: any[]) {
      this.contact = data.reduce((obj, item) => {
        obj[item.name] = {
          value: item.value,
          show: item.show == 1 ? true : false
        }
        return obj
      }, {})
    },
    setThirdPartLogin(data: any[]) {
      this.login = data.reduce((obj, item) => {
        obj[item.name] = item.show
        return obj
      }, {})
    },
    setComponent(data: any[]) {
      this.module = data.reduce((obj, item) => {
        obj[item.name] = item.show
        return obj
      }, {})
    },
    setAvatar(data: any[]) {
      this.avatar = data.reduce((obj, item) => {
        obj[item.name] = item.url
        return obj
      }, {})
    },
    setPrivacy(data: any[]) {
      this.privacy = data.reduce((obj, item) => {
        obj[item.name] = item.show == 1 ? true : false
        return obj
      }, {})
    },
    setReward(data: any) {
      Object.assign(this.reward, data)
    },
    async setStatistic(): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
        useModuleStoreHook().loading++
        getSimpleStatistic()
          .then((data: any) => {
            this.statistic = data

            useModuleStoreHook().loading--
            resolve(true)
          })
          .catch(() => {
            useModuleStoreHook().loading--
            reject(false)
          })
      })
    },
    async setConfigInfo(): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
        useModuleStoreHook().loading++
        getConfig()
          .then((data: any) => {
            console.log('配置信息:', data)
            this.setAuthor(data.author)
            this.setMenus(data.menu)
            this.setCovers(data.cover)
            this.setWebsite(data.website)
            this.setPageView(data.pageView)
            this.setSocialAccount(data.socialAccount)
            this.setThirdPartLogin(data.login)
            this.setComponent(data.component)
            this.setPrivacy(data.privacy)
            this.setAvatar(data.avatar)
            this.setReward(data.reward)

            useModuleStoreHook().loading--
            resolve(true)
          })
          .catch(() => {
            useModuleStoreHook().loading--
            reject(false)
          })
      })
    }
  }
})

export function useConfigStoreHook() {
  return useConfigStore(store)
}
