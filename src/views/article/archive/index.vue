<template>
  <div class="archive">
    <Header :cover="covers.Archive">
      <template #title>{{ $t('menu.archive') }}</template>
    </Header>
    <div class="content">
      <el-timeline>
        <el-timeline-item
          v-for="(article, index) in list"
          :key="article.id"
          type="primary"
          color="#0bbd87"
          size="large"
          :hollow="false"
          :timestamp="article.createTime"
        >
          <span v-if="index == 0" class="title">{{ article.title }}</span>
          <router-link v-if="index != 0" :to="'/article/detail/' + article.id">
            <span class="size">{{ article.title }}</span>
          </router-link>
        </el-timeline-item>
      </el-timeline>
      <!-- <div class="more" v-show="list.length <total&&!loading">
        <el-button link @click="getData"><span>查看更多</span> </el-button>
      </div> -->

      <div
        ref="loadingRef"
        class="loading"
        v-show="total != 0 && total > list.length"
        v-loading="true"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/header/index.vue'
import { computed, onBeforeMount, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useConfigStoreHook } from '@/store/modules/config'
import { getArticleArchive } from '@/api/article'
defineOptions({
  name: 'Archive'
})
const covers = computed(() => {
  return useConfigStoreHook().covers
})
const list = reactive<any>([
  {
    createTime: '',
    title: ''
  }
])
const total = ref<number>(0)
const params = reactive({
  page: 1,
  limit: 15
})
const loading = ref(false)
const loadingRef = ref()
const getData = () => {
  if (loading.value) {
    return
  }
  loading.value = true
  getArticleArchive(params)
    .then((data: any) => {
      params.page++
      total.value = data.total
      list[0].title = '当前已创作' + data.total + '篇文章！'

      data.list.forEach((e: any) => {
        list.push(e)
      })
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
onBeforeMount(() => {
  getData()
  // TODO 点击加载
  // window.onscroll = function () {
  //   const scrollH = document.documentElement.scrollHeight // 文档的完整高度
  //   const scrollT = document.documentElement.scrollTop || document.body.scrollTop // 当前滚动条的垂直偏移
  //   const screenH = window.screen.height // 屏幕可视高度
  //   if (scrollH - scrollT - screenH < 5) {
  //     // 5 只是一个相对值，可以让页面再接近底面的时候就开始请求
  //     // 执行请求
  //     if (total.value > articles.length) {
  //       getData()
  //     }
  //   }
  // }
})
let myObserver: IntersectionObserver | null = null
onMounted(() => {
  //回调函数
  const callback = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      // 当目标元素进入视窗时
      if (entry.isIntersecting) {
        console.log('目标元素进入视窗！')
        getData()
      } else {
        // 当目标元素离开视窗时
        console.log('目标元素离开视窗！')
      }
    })
    // console.log('🚀🚀~ 执行了一次callback')
    // console.log('🚀🚀~ entries:', entries)
    // console.log('🚀🚀~ observer:', observer)
  }
  //配置对象
  const options = {}
  myObserver = new IntersectionObserver(callback, options)
  //获取目标元素
  //开始监听目标元素
  myObserver.observe(loadingRef.value)
})
onUnmounted(() => {
  if (myObserver) {
    myObserver.disconnect()
  }
})
</script>
<style lang="scss">
.archive {
  .el-timeline {
    a {
      span {
        color: rgb(27, 182, 202);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.archive {
  .content {
    border-radius: 15px;

    box-sizing: border-box;
    margin: 0 auto;
    padding: 3rem 2rem;
    background-color: rgba(255, 255, 255, 0.8);
    // white-space: nowrap;
    word-wrap: break-word;
    word-break: break-all;
    .size {
      font-size: 1.4rem;
    }
    .title {
      font-size: 2rem;
    }
    .more {
      text-align: center;
      button {
        font-size: 1.6rem;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .archive {
    .content {
      width: 70%;
    }
  }
}

@media screen and (max-width: 768px) {
  .archive {
    .content {
      width: 90%;
    }
  }
}

.dark .archive {
  // background-color: black !important;
  .content {
    background-color: rgb(13, 28, 30) !important;
  }
}
</style>
