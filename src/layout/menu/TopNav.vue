<template>
  <div class="nav pc" :class="topNavShow ? '' : 'hidden'">
    <el-menu
      :background-color="backColor"
      :default-active="activeIndex"
      class="el-menu"
      :class="colorStyle"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      id="topNav-pc"
      :router="true"
    >
      <el-menu-item index="/">
        <el-image style="height: 50px" src="/images/wbxnl.png" fit="scale-down" />
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/">
        <span class="iconfont icon-home"></span>
        <span>{{ $t('menu.homepage') }}</span>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <span class="iconfont icon-bianjiwenzhang_huaban"></span>
          <span>{{ $t('menu.blog') }}</span>
        </template>
        <el-menu-item index="/article/archive">
          <span class="iconfont icon-guidang"></span>
          <span>{{ $t('menu.archive') }}</span>
        </el-menu-item>
        <el-menu-item index="/article/category">
          <span class="iconfont icon-fenlei"></span>
          <span>{{ $t('menu.category') }}</span>
        </el-menu-item>
        <el-menu-item index="/article/tag">
          <span class="iconfont icon-biaoqian"></span>
          <span>{{ $t('menu.tag') }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/talk">
        <span class="iconfont icon-41shuoshuo"></span>
        <span>{{ $t('menu.talk') }}</span>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <span class="iconfont icon-weibiaoti1"></span>
          <span>{{ $t('menu.pastime') }}</span>
        </template>
        <el-menu-item index="/album">
          <span class="iconfont icon-shangchuantupian"></span>
          <span>{{ $t('menu.album') }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/friend">
        <span class="iconfont icon-pengyou"></span>
        <span>{{ $t('menu.blogroll') }}</span>
      </el-menu-item>
      <el-menu-item index="/guestbook">
        <span class="iconfont icon-liuyanban-05"></span>
        <span>{{ $t('menu.guestbook') }}</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <span class="iconfont icon-guanyu"></span>
        <span>{{ $t('menu.about') }}</span>
      </el-menu-item>
      <!-- <el-menu-item index="" @click="setLanguage(locale == 'zh'?'en':'zh')">

      <span class="language">
<span v-show="locale == 'zh'" class="iconfont icon-fuhao-zhongwen"></span>
<span v-show="locale == 'en'" class="iconfont icon-fuhao-yingwen"></span>
      </span>
      </el-menu-item> -->
      <el-menu-item v-if="modules.Login && !user.username" index="" @click="login">
        <span class="iconfont icon-gerenzhongxin"></span>
        <span>{{ $t('menu.login') }}</span>
      </el-menu-item>

      <el-sub-menu index="" v-if="modules.Login && user.username">
        <template #title>
          <el-avatar :size="35" :src="avatar" />
          <!-- user.information.avatar
                ? user.information.avatar
                : store.state.config.avatar.userDefault -->
        </template>
        <el-menu-item index="/user/information">
          <span class="iconfont icon-gerenzhongxin"></span>
          <span>{{ $t('menu.information') }}</span>
        </el-menu-item>
        <el-menu-item index="" @click="changePassword">
          <span class="iconfont icon-xiugaimima"></span>
          <span> {{ $t('menu.changePassword') }}</span>
        </el-menu-item>
        <el-menu-item index="" @click="logout">
          <span class="iconfont icon-zhuxiao"></span>
          <span>{{ $t('menu.logout') }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, toRefs, type ComputedRef, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
// import { getDefaultLang } from "@/locales/langUtils";
import { useConfigStoreHook } from '@/store/modules/config'
import { useUserStoreHook } from '@/store/modules/user'
import { useModuleStoreHook } from '@/store/modules/module'
import { throttleFunction } from '@/utils/tool';
// const menuConfig = useConfigStoreHook().menus
defineOptions({
  name: 'TopNav'
})
const modules = computed(() => {
  return useConfigStoreHook().module
})
const avatars = computed(() => {
  return useConfigStoreHook().avatar
})
const user = useUserStoreHook()

const avatar = computed(() => {
  return user.avatar ? user.avatar : avatars.value.User
})
const dialog = useModuleStoreHook()
// const { locale } = useI18n();
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
}
// const { t } = useI18n();
const router = useRouter()

const toPage = (path: string) => {
  router.push(path)
}

//       setLanguage(language: any) {
//         locale.value = language;
// }
const backColor = ref('rgba(0, 0, 0,0)')
// 控制导航栏是否显示的变量
const topNavShow = ref(true)
// 声明一个数组存放比对数据
let scrollData: any = []
// 一个响应速度的参数，值越大响应越慢
let responseSpeed = 5
const colorStyle = ref('white')
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
const setColor = () => {
  if (document.documentElement.scrollTop === 0) {
    colorStyle.value = 'white transparent'
    //  backColor = "rgba(0, 0, 0,0)";
  } else {
    colorStyle.value = 'black'
  }
}
const setColorThrottle=throttleFunction(setColor,50)
const showMenu = () => {
  var scrollTop =
    document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

  // 只有不在最顶部时才会生效
  if (scrollTop > 100) {
    // console.log( scrollData);
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
onBeforeMount(() => {})
onMounted(() => {
  window.addEventListener('scroll', setColorThrottle)
  // 监听页面滚动
  window.addEventListener('scroll', showMenuThrottle)
})
onUnmounted(() => {
  window.removeEventListener('scroll', setColorThrottle)
  window.removeEventListener('scroll', showMenuThrottle)
})
</script>

<style lang="scss" scoped>
.el-menu {
  border: 0;
  .iconfont {
    margin-right: 0.5rem;
  }
  .language {
    .iconfont {
      font-size: 2.3rem;
    }
  }
}

.flex-grow {
  flex-grow: 1;
}

.nav {
  height: 4.65rem;
  position: fixed;
  overflow: hidden;
  // transition: height 2s, linear 1s;
  transition-delay: 0;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: linear;
  z-index: 99;
  // border-color: rgba(238, 245, 245, 0.4);
}

.hidden {
  height: 0 !important;
  // background-color: red;
}

@media screen and (min-width: 768px) and (max-width: 1600px) {
  .nav {
    margin: 0 auto;
    width: 100%;
  }
}

@media screen and (min-width: 1600px) {
  .nav {
    margin: 0 auto;
    width: 100%;
  }
}
</style>
<style lang="scss">
.pc {
  .white {
    background-color: rgba(0, 0, 0, 0);
    li {
      color: white !important;
    }
    .el-sub-menu__title {
      color: white !important;
    }
  }
  .black {
    background-color: rgba(255, 255, 255, 0.75);
    li {
      color: black !important;
    }
    .el-sub-menu__title {
      color: black !important;
    }
  }
}
#topNav-pc {
  .el-sub-menu__title {
    border: 0;
    font-size: 1.3rem;
    // 解决菜单背景透明度不一样问题
    background-color: rgba(255, 255, 255, 0) !important;
  }
  li {
    font-size: 1.3rem;
    border: 0 !important;
    // TODO 下边框动画效果
    // transition: border-width 1s linear 0;
  }
  li:active {
    --el-menu-hover-bg-color: rgba(255, 255, 255, 0);
  }
  li:hover {
    --el-menu-hover-bg-color: rgba(255, 255, 255, 0);
    color: rgb(133, 198, 242) !important;
  }
  li:focus {
    --el-menu-hover-bg-color: rgba(255, 255, 255, 0);
    // color: white !important;
  }
  .el-sub-menu__title:hover {
    color: rgb(141, 205, 241) !important;
  }
}

.dark {
  #topNav-pc {
    background-color: black;
    // PC顶部导航栏夜间背景色
    --el-menu-bg-color: rgba(8, 42, 49, 0.6) !important;
    li:hover {
      color: rgb(87, 189, 227) !important;
      // background-color: black;
    }
    // .el-sub-menu__title {
    //   color: white !important;
    // }
  }

  .transparent {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  #topNav-pc > li {
    color: white !important;
  }
  #topNav-pc > li > .el-sub-menu__title {
    color: white !important;
  }
}
</style>
