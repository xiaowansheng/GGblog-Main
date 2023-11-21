import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CustomParamsSerializer
} from 'axios'
import Axios from 'axios'
import { stringify } from 'qs'
// import { getToken, formatToken } from "@/utils/auth";
import { useUserStoreHook } from '@/store/modules/user'
import { t } from '@/plugins/i18s'
// import { baseURL } from "../utils";
// 消息提示
import { ElMessage, ElMessageBox } from 'element-plus'
// import type { type } from 'os'
import NProgress from '../progress'

import type { Result } from './type'
//  获取环境变量
const baseURL = import.meta.env.VITE_BASE_API
const symbol = 'Authorization'
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求基路径
  baseURL: baseURL,
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
}

class CommonHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** token过期后，暂存待执行的请求 */
  private static requests: any[] = []

  /** 防止重复刷新token */
  private static isRefreshing = false

  /** 初始化配置对象 */
  // private static initConfig: PureHttpRequestConfig = {};

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** 重连原始请求 */
  private static retryOriginalRequest(config: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve) => {
      CommonHttp.requests.push((token: string) => {
        config.headers![symbol] = token
        resolve(config)
      })
    })
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    CommonHttp.axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<any> => {
        // 开启进度条动画
        NProgress.start()
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        // if (typeof config.beforeRequestCallback === "function") {
        //   config.beforeRequestCallback(config);
        //   return config;
        // }
        // if (PureHttp.initConfig.beforeRequestCallback) {
        //   PureHttp.initConfig.beforeRequestCallback(config);
        //   return config;
        // }
        /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
        const whiteList = ['/user/auth/refresh/token', '/user/auth/login']
        // 字串匹配
        // return whiteList.some(v => config.url.indexOf(v) > -1)
        // 改为完全匹配
        return whiteList.some((v) => v == config.url)
          ? config
          : new Promise((resolve) => {
              const data = useUserStoreHook().getToken()
              // console.log('tokendata:', data)
              if (data) {
                const now = new Date().getTime()
                const expired = parseInt(data.expires) - now <= 0
                if (expired) {
                  if (!CommonHttp.isRefreshing) {
                    CommonHttp.isRefreshing = true
                    console.info('token过期，暂存待执行的请求，刷新token')

                    // token过期刷新
                    useUserStoreHook()
                      .handRefreshToken({ refreshToken: data.refreshToken })
                      .then((res) => {
                        console.info('获取了新token')

                        const token = res.accessToken
                        config.headers![symbol] = token
                        CommonHttp.requests.forEach((cb) => cb(token))
                        CommonHttp.requests = []
                      })
                      .finally(() => {
                        CommonHttp.isRefreshing = false
                      })
                  }
                  resolve(CommonHttp.retryOriginalRequest(config))
                } else {
                  config.headers![symbol] = data.accessToken
                  resolve(config)
                }
              } else {
                resolve(config)
              }
            })
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = CommonHttp.axiosInstance
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const $config = response.config
        // 关闭进度条动画
        NProgress.done()
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        // if (typeof $config.beforeResponseCallback === "function") {
        //   $config.beforeResponseCallback(response);
        //   return response.data;
        // }
        // if (PureHttp.initConfig.beforeResponseCallback) {
        //   PureHttp.initConfig.beforeResponseCallback(response);
        //   return response.data;
        // }
        // 自定义数据处理
        const { code, message, data } = response.data
        console.log('api:[', response.config.url, '],data:', response.data)

        if (code && code == 200) {
          const whiteList = [
            '/user/auth/signup',
            '/user/auth/login',
            '/user/auth/reset/password',
            '/comment'
          ]
          // 登录和注册不显示公共的提示信息
          if (!whiteList.some((v) => v.trim() == response.config.url)) {
            let method = response.config.method
            // 显示操作提示
            if (method == 'post') {
              ElMessage.success(t('form.post'))
            } else if (method == 'put') {
              ElMessage.success(t('form.put'))
            } else if (method == 'delete') {
              ElMessage.success(t('form.delete'))
            }
          }
          // console.log('request:', response)

          return data
        } else if (code && message) {
          ElMessage.error(message)
          if (code == 40011) {
            // console.log(1)
            ElMessage.warning(t('login.loginInvalid'))
            // 重新登录
            useUserStoreHook().loginAgain()
            return
          }
          throw new Error('Error')
        } else {
          return response.data
        }
      },
      (error: AxiosError) => {
        const $error = error
        // $error.isCancelRequest = Axios.isCancel($error);
        // 关闭进度条动画
        // NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error)
      }
    )
  }

  /** 通用请求工具函数 */
  public request<R>(
    method: string,
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Result<R> | R> {
    return CommonHttp.axiosInstance.request({
      method,
      url,
      ...config
    })
  }

  /** 单独抽离的post工具函数 */
  public post<D, R>(url: string, data?: D, config?: AxiosRequestConfig): Promise<Result<R> | R> {
    return CommonHttp.axiosInstance.post(url, data, config)
  }

  /** 单独抽离的get工具函数 */
  public get<P, R>(url: string, params?: P, config?: AxiosRequestConfig): Promise<Result<R> | R> {
    return CommonHttp.axiosInstance.get(url, { ...config, params })
  }

  /** 单独抽离的put工具函数 */
  /** 单独抽离的get工具函数 */
  public put<D, R>(url: string, data?: D, config?: AxiosRequestConfig): Promise<Result<R> | R> {
    return CommonHttp.axiosInstance.put(url, data, config)
  }
  /** 单独抽离的post工具函数 */
  public delete<D, R>(url: string, data?: D, config?: AxiosRequestConfig): Promise<Result<R> | R> {
    return CommonHttp.axiosInstance.delete(url, { ...config, data })
  }
}
// url
export const http = new CommonHttp()
