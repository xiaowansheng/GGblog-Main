<template>
  <div id="iframe">
    <!-- 选项菜单 -->
    <Menu></Menu>
    <!-- 内容 -->
    <Mainer></Mainer>
    <Footer></Footer>
    <!-- 加载页 -->
    <FullScreenLoading />
    <!-- <FullScreenLoading2 /> -->
    <!-- 弹窗页 -->
    <Login />
    <Signup />
    <ChangePassword />
    <ForgetPassword />
    <!-- 工具 -->
    <Settings />

    <!-- 背景效果 -->
    <BackgroundEffect/>
    <!-- 鼠标特效 -->
    <MouseEffect/>
  </div>
</template>
<script lang="ts" setup>
import Mainer from './mainer/index.vue'
import Footer from './footer/index.vue'
import Menu from './menu/index.vue'
import Settings from './settings/index.vue'
// import FullScreenLoading2 from '@/components/loading/index.vue'
import FullScreenLoading from '@/components/loading/animation/index.vue'
import Login from '@/components/login/index.vue'
import Signup from '@/components/signup/index.vue'
import ChangePassword from '@/components/changePassword/index.vue'
import ForgetPassword from '@/components/forgetPassword/index.vue'
import BackgroundEffect from "@/components/background/index.vue"
import MouseEffect from "@/components/mouseEffect/index.vue"
import { useConfigStoreHook } from '@/store/modules/config'
defineOptions({
  name: 'Layout'
})
// 获取配置信息
useConfigStoreHook().setConfigInfo()
useConfigStoreHook().setStatistic()
</script>

<style lang="scss" scoped>
#iframe {
  max-width: 1920px;
  min-width: 320px;
  margin: 0 auto;
}
</style>
