<template>
  <div class="nav mobile">
    <div class="top-nav" id="topNav-mobile" :class="style">
      <div id="top-btn">
        <!-- <span class="iconfont icon-liebiao"></span> -->
        <svg-icon
          name="menu"
          iconStyle="width:3.5rem;height:3.5rem"
          @click="leftDrawer = true"
        ></svg-icon>
        <!-- <spa><span class="iconfont icon-caidan3"></span></span> -->
        <!-- <span v-if="modules.Search && false">搜索<span class="iconfont icon-sousuo"></span></span> -->
      </div>
      <div class="logo" @click="toPage('/')">
        <el-image style="width: 185px" src="/images/wbxnl.png" fit="scale-down" />
      </div>
    </div>

    <el-drawer
      class="side-nav"
      v-model="leftDrawer"
      direction="ltr"
      :with-header="false"
      :lock-scroll="false"
      id="sideNav"
      @open="handleScrollbars(true)"
      @close="handleScrollbars(false)"
    >
      <div class="info">
        <div class="avatar">
          <el-avatar :size="100" :src="author.avatar" />
        </div>
        <div class="nickname">
          <span>{{ author.nickname }}</span>
        </div>
        <div class="information">
          <router-link to="/article/archive" @click="leftDrawer = false">
            <label>{{ $t('menu.blog') }}</label>
            <br />
            <span>{{ numberInfo.article }}</span>
          </router-link>
          <router-link to="/article/category" @click="leftDrawer = false">
            <label>{{ $t('menu.category') }}</label>
            <br />
            <span>{{ numberInfo.category }}</span>
          </router-link>
          <router-link to="/article/tag" @click="leftDrawer = false">
            <label>{{ $t('menu.tag') }}</label>
            <br />
            <span>{{ numberInfo.tag }}</span>
          </router-link>
        </div>
      </div>
      <el-menu class="el-menu" :router="true" id="sideNav" @select="leftDrawer = false">
        <el-menu-item index="/">
          <span class="iconfont icon-home"></span>{{ $t('menu.homepage') }}
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <span class="iconfont icon-bianjiwenzhang_huaban"></span>
            {{ $t('menu.blog') }}
          </template>
          <el-menu-item index="/article/archive">
            <span class="iconfont icon-guidang"></span>
            {{ $t('menu.archive') }}
          </el-menu-item>
          <el-menu-item index="/article/category">
            <span class="iconfont icon-fenlei"></span>{{ $t('menu.category') }}
          </el-menu-item>
          <el-menu-item index="/article/tag">
            <span class="iconfont icon-biaoqian"></span>{{ $t('menu.tag') }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/talk">
          <span class="iconfont icon-41shuoshuo"></span>{{ $t('menu.talk') }}
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <span class="iconfont icon-weibiaoti1"></span>{{ t('menu.pastime') }}
          </template>
          <el-menu-item index="/album">
            <span class="iconfont icon-shangchuantupian"></span>{{ t('menu.album') }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/friend">
          <span class="iconfont icon-pengyou"></span>
          {{ $t('menu.blogroll') }}
        </el-menu-item>
        <el-menu-item index="/guestbook">
          <span class="iconfont icon-liuyanban-05"></span>{{ $t('menu.guestbook') }}
        </el-menu-item>
        <el-menu-item index="/about">
          <span class="iconfont icon-guanyu"></span>{{ $t('menu.about') }}
        </el-menu-item>
        <el-menu-item v-if="modules.Login && !user.username" index="" @click="login">
          <span class="iconfont icon-gerenzhongxin"></span>{{ $t('menu.login') }}
        </el-menu-item>

        <el-sub-menu index="" v-if="modules.Login && user.username">
          <template #title>
            <span class="iconfont icon-gerenzhongxin"></span>
            {{ $t('menu.center') }}
          </template>
          <el-menu-item index="/user/information">
            <span class="iconfont icon-gerenxinxi1"></span>{{ $t('menu.information') }}
          </el-menu-item>
          <el-menu-item index="" @click="changePassword">
            <span class="iconfont icon-xiugaimima"></span>{{ $t('menu.changePassword') }}
          </el-menu-item>
          <el-menu-item index="" @click="logout">
            <span class="iconfont icon-zhuxiao"></span>{{ $t('menu.logout') }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
      <!-- <div class="set">
        <div class="title">
          <span>{{ $t('menu.set.language') }}</span>
        </div>
        <div class="content">
          <ul>
            <li>
              <el-button link v-show="locale == 'zh'" @click="setLanguage('en')"
                ><span class="iconfont icon-fuhao-zhongwen"></span
              ></el-button>
            </li>
            <li>
              <el-button link v-show="locale == 'en'" @click="setLanguage('zh')"
                ><span class="iconfont icon-fuhao-yingwen"></span
              ></el-button>
            </li>
          </ul>
        </div>
      </div> -->

      <template #footer>
        <div>
          <div id="runTime">
            <label> {{ $t('record.runtime') }}： </label>
            <br />
            <span>{{ createTime }}</span>
          </div>
          <div id="pageView">
            <label> {{ $t('record.pageView') }}： </label><span>{{ website.pageView }}</span>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, watch, ref, onUnmounted } from 'vue'

import { convertIntervalTime } from '@/utils/timeUtils'
import { useRouter } from 'vue-router'
import { useConfigStoreHook } from '@/store/modules/config'
import { useUserStoreHook } from '@/store/modules/user'
import { useModuleStoreHook } from '@/store/modules/module'
import { t } from '@/plugins/i18s'
import { throttleFunction } from '@/utils/tool';
import { handleScrollbars } from '@/utils/pageUtils'
defineOptions({
  name: 'SideNav'
})
const user = useUserStoreHook()
const dialog = useModuleStoreHook()
// const menuConfig = computed(() => {
//   return useConfigStoreHook().menus
// })
const author = computed(() => {
  return useConfigStoreHook().author
})
const modules = computed(() => {
  return useConfigStoreHook().module
})
const website = computed(() => {
  return useConfigStoreHook().website
})
const numberInfo = computed(() => {
  return useConfigStoreHook().statistic
})
const router = useRouter()
const leftDrawer = ref(false)
const topDrawer = ref(true)
const colorStyle = ref('white')
const topNavShow = ref(true)
let timer = null
const timestamp = ref(0)
const createTime = computed(() => {
  let str = convertIntervalTime(timestamp.value)
  return str
    .replace('天', t('record.days'))
    .replace('小时', t('record.hours'))
    .replace('分钟', t('record.minutes'))
    .replace('秒', t('record.seconds'))
})
const timeWatch = watch(website.value, () => {
  formatTime(website.value)
  timeWatch()
})
const formatTime = (value: any) => {
  if (value.createTime) {
    let dateStr = value.createTime
    dateStr = dateStr.replace(/-/g, '/')
    let start = new Date(dateStr)
    timestamp.value = new Date().getTime() - start.getTime()
    timer = setInterval(() => {
      timestamp.value = timestamp.value + 1000
    }, 1000)
  }
}

const backColor = ref('')
// 声明一个数组存放比对数据
let scrollData: any = []

// 一个响应速度的参数，值越大响应越慢
const responseSpeed = 3
const style = computed(() => {
  return topNavShow.value ? colorStyle.value : 'hidden ' + colorStyle.value
})
const login = () => {
  dialog.login = true
}
const changePassword = () => {
  dialog.changePassword = true
}
const logout = () => {
  user.logOut()
  // console.log("token", store.state.user.token);
}
const toPage = (path: string) => {
  router.push(path)
  leftDrawer.value = false
}
const bgColorChange = () => {
  if (document.documentElement.scrollTop == 0) {
    colorStyle.value = 'white transparent'
  } else {
    colorStyle.value = 'black'
  }
}
const colorChangeThrottle=throttleFunction(bgColorChange,50)
const showMenu = () => {
  let scrollTop: any =
    document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

  // 只有不在最顶部时才会生效
  if (scrollTop > 100) {
    // console.log(_this.scrollData);
    if (scrollData.length == responseSpeed) {
      if (scrollData[0] < scrollData[responseSpeed - 1]) {
        // 下划，屏幕往上走，隐藏
        topNavShow.value = false
      }
      if (scrollData[0] > scrollData[responseSpeed - 1]) {
        // 上划，屏幕往下走，显示
        topNavShow.value = true
      }
    }
    if (scrollData.length >= responseSpeed) {
      scrollData = []
    } else {
      scrollData.push(scrollTop)
    }
  } else {
    topNavShow.value = true
  }
}
const showMenuThrottle=throttleFunction(showMenu,50)
onBeforeMount(() => {
  formatTime(website.value)
  // this.setLanguage(getDefaultLang());
})
onMounted(() => {
  // setLanguage(getDefaultLang());
  window.addEventListener('scroll', colorChangeThrottle)
  // 监听页面滚动
  window.addEventListener('scroll', showMenuThrottle)
  
})
onUnmounted(() => {
  window.removeEventListener('scroll', colorChangeThrottle)
  window.removeEventListener('scroll', showMenuThrottle)
  
})
</script>

<style lang="scss" scoped>
.mobile {
  position: fixed;
  width: 100%;
  overflow: hidden;
  z-index: 99;

  .white {
    color: white;
    background-color: rgba(0, 0, 0, 0);
  }
  .black {
    color: black;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
.el-menu {
  border: 0;
}

.el-drawer {
  padding: 0;
}

.hidden {
  height: 0 !important;
}
.top-nav {
  height: 3.78rem;
  width: 100%;
  // position: fixed;
  z-index: 999;
  display: flex;

  justify-content: space-between;
  // background-color: rgba(179, 233, 231, 0.1);

  overflow: hidden;
  // transition: height 2s, linear 1s;
  transition-delay: 0;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: linear;
  #top-btn {
    display: flex;
    align-items: center;
    padding-left: 1.5rem;
    .logo {
      // margin-right: 2rem;
      // line-height: 2.5rem;
      // font-size: 2.5rem;
      overflow: hidden;
      line-height: 3.78rem;
      padding: 0rem 1rem;
    }
  }
}

.side-nav {
  .info {
    .avatar {
      text-align: center;
    }
    .nickname {
      text-align: center;
      margin: 1.5rem 0;
      span {
        letter-spacing: 0.1rem;
        font-size: 1.8rem;
        font-weight: bold;
      }
    }

    .information {
      display: flex;
      justify-content: space-around;

      margin: 0.5rem 0 1rem 0;
      text-align: center;
      label {
        font-weight: bold;
        font-size: 1.35rem;
      }
      span {
        font-weight: bold;
        font-size: 1.2rem;
      }
      a {
        color: rgb(51, 73, 80);
        cursor: pointer;
      }
    }
  }
  #runTime,
  #pageView {
    label {
      font-weight: bold;
    }
  }
  #pageView {
    margin-top: 0.5rem;
  }
}

.dark {
  #topNav-mobile {
    // 顶部导航栏夜间背景色
    color: white !important;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .transparent {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  .side-nav {
    .information {
      a {
        color: white;
      }
    }
  }
}
</style>
<style lang="scss">
.mobile {
  #sideNav {
    .el-menu {
      width: 100% !important;

      .el-sub-menu__title {
        font-size: 1.35rem;
        background-color: rgba(255, 255, 255, 0) !important;
      }

      li {
        font-size: 1.35rem;

        &:active,
        &:hover,
        &:focus {
          --el-menu-hover-bg-color: rgba(255, 255, 255, 0);
        }

        &:hover {
          color: rgb(133, 198, 242) !important;
        }

        &:focus {
          color: rgba(0, 0, 0, 1) !important;
          // color: white !important;
        }

        .iconfont {
          margin-right: 1rem;
        }
      }
    }
  }
}

.dark {
  .mobile {
    #sideNav {
      li:focus {
        color: rgba(255, 255, 255, 1);
        // color: white !important;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .nav {
    #sideNav {
      width: 55% !important;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1000px) {
  .nav {
    #sideNav {
      width: 35% !important;
    }
  }
}

/* 去除滚动条 */
.el-drawer__body::-webkit-scrollbar {
  /* 滚动条的宽度 */
  width: 0px !important;
  /* 滚动条的颜色 */
  // background-image: linear-gradient(lightgreen, pink, lightblue);
}
/* div */
</style>
