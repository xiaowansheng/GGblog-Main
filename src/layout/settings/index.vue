<template>
  <div id="settings">
    <div class="set skin">
      <div link @click="toggleDark">
        <span v-show="isDaylight">
          <!-- <span v-show="isDaylight">
          <svg-icon name="sun" iconStyle="width:50px;height:50px"></svg-icon> </span
        ><span v-show="!isDaylight">
          <svg-icon name="night" iconStyle="width:50px;height:50px"></svg-icon>
        </span> -->
          <span class="iconfont icon-tianqitaiyangqichuang daylight"></span> </span
        ><span v-show="!isDaylight"><span class="iconfont icon-Star-Night night"></span></span>
      </div>
    </div>

    <div class="set" v-show="toUp">
      <div @click="handleScroll">
        <span class="iconfont icon-24gl-paperPlane arrow"></span>
      </div>

      <!-- <el-backtop right="50" bottom="50">
        <div>↑</div>
      </el-backtop> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { useConfigStoreHook } from '@/store/modules/config'
const modules = computed(() => {
  return useConfigStoreHook().module
})
const isDaylight = ref(false)
const isDark = useDark()
isDaylight.value = isDark.value
const toggleDarkFunc = useToggle(isDark)
const toggleDark = () => {
  // console.log("dark:", isDark);
  toggleDarkFunc()
  isDaylight.value = isDark.value
}

const handleScroll = () => {
  let scrollTop =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  // console.log(scrollTop, "scrollTop");
  if (scrollTop > 0) {
    const timeTop = setInterval(() => {
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop -= 80 //一次减50往上滑动
      if (scrollTop <= 0) {
        clearInterval(timeTop)
      }
    }, 10) //定时调用函数使其更顺滑
  }
}
const toUp = ref(false)
onMounted(() => {
  //监听滚动事件
  window.addEventListener(
    'scroll',
    () => {
      // console.log("top",document.documentElement.scrollTop)
      if (document.documentElement.scrollTop > 500) {
        toUp.value = true
      } else {
        toUp.value = false
      }
    },
    { once: false }
  )
})
</script>

<style lang="scss" scoped>
#settings {
  position: fixed;
  bottom: 2rem;
  right: 0.5rem;
  // width: 3rem;
  // padding: 0.2rem;
  color: rgb(47, 47, 134);
  text-align: center;
  .set {
    padding: 0;
    margin: 0;
    // margin-top: 1rem;
  }
  .daylight,
  .night {
    border-radius: 50%;
    // border: 1px rgb(235, 235, 75) solid;
  }
  .set {
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
    // align-content: center;
    // justify-items: center;

    .iconfont {
      font-size: 3rem;
      font-weight: bold;
    }
    .daylight {
      color: rgb(235, 235, 75);
    }
    .night {
      color: rgb(76, 99, 101);
    }
    .arrow {
      // font-size: 2.5rem;
      color: rgb(57, 163, 240);
    }
  }
}
</style>
