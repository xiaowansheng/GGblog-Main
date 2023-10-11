import type { RouteRecordName } from "vue-router";

export type userType = {
  username?: string
  nickname?: string
  /** 头像 */
  avatar?: string
  roles?: Array<string>
  verifyCode?: string
  information?:any
}
