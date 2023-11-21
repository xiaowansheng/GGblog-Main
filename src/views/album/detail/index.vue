<template>
  <div class="album-detail">
    <Header :cover="album.cover">
      <template #title>
        {{ album.name }}
      </template>
      <template #content>
        <div class="info">
          <div class="date">
            <p class="time">
              <span class="iconfont icon-riqi"></span
              ><span>{{ $t('album.createTime') }}{{ album.createTime }}</span>
            </p>
            <p class="time">
              <span class="iconfont icon-riqi"></span
              ><span>{{ $t('album.updateTime') }}{{ album.updateTime }}</span>
            </p>
          </div>
          <p class="description">
            {{ album.description }}
          </p>
        </div>
      </template>
    </Header>

    <div class="content">
      <div class="empty" v-show="!loading && pictures.length == 0">
        <el-empty description="Empty~" />
      </div>
      <!-- <div class="pictures">
        <div class="picture" v-for="(picture, index) in pictures" :key="picture.id">
          <el-image
            :preview-src-list="pictureList"
            :initial-index="index"
            :lazy="true"
            :src="picture.url"
            fit="cover"
          />
        </div>
      </div> -->
      <div ref="containerRef" class="waterfall-container">
        <div
          v-for="(item, index) in pictures"
          :key="index"
          class="waterfall-item"
          style="display: none"
        >
          <img :src="item.url" @click="previewImg(index, item)" alt="Image" />
        </div>
        <!-- <el-image-viewer
          v-if="preview"
          :url-list="pictureList"
          teleported
          @close="closePreview()"
          :initial-index="previewIndex"
        /> -->
        <ImgPreview
          v-model:show="preview"
          :list="pictureList"
          :index="previewIndex"
          :teleported="true"
        />
        <!-- 随机图片测试 -->
        <!-- <div v-for="(item, index) in 100" :key="index" class="waterfall-item" style="display: none;">
          <img :src="`https://www.dmoe.cc/random.php?${index}`" alt="Image" />
        </div> -->
      </div>
      <div
        ref="loadingRef"
        class="loading"
        v-show="total != 0 && total > pictures.length"
        v-loading="true"
      ></div>
      <!-- <div class="more" v-show="pictures.length<params.total">
        <el-button @click="getData" link><span>查看更多</span></el-button>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/header/index.vue'
import { onMounted, onBeforeMount, onUnmounted, reactive, ref, nextTick, unref } from 'vue'
import { getQueryString } from '@/utils/stringUtils'
import { getPicturePage } from '@/api/picture'
import { getAlbum } from '@/api/album'
import { debouncedFunction } from '@/utils/tool'
// import { handleScrollbars } from '@/utils/pageUtils'
import ImgPreview from '@/components/imgPreview/index.vue'
defineOptions({
  name: 'AlbumDetail'
})
const pictures = reactive<any>([])
// 由于图片加载顺序和获取的图片地址顺序不一致
const pictureList: any = reactive([])
const preview = ref(false)
const previewIndex = ref(0)
const previewImg = (index: number, item: any) => {
  // 根据原图片数据地址,找到图片在预览列表中的索引
  let newIndex = index
  for (let i = 0; i < pictureList.length; i++) {
    if (pictureList[i] == item.url) {
      newIndex = i
      // console.log("找到索引了");
      break
    }
  }
  preview.value = true
  previewIndex.value = newIndex
}
const album = ref<any>({})
const params = reactive<any>({
  albumId: 0,
  page: 1,
  limit: 25
})
const total = ref(0)
const loading = ref(false)
const getAlbumInfo = () => {
  getAlbum(params.albumId).then((data: any) => {
    album.value = data
  })
}
const getData = () => {
  if (loading.value) {
    return
  }
  loading.value = true
  getPicturePage(params)
    .then((data: any) => {
      total.value = data.total
      data.list.forEach((e: any) => {
        pictures.push(e)
        // pictureList.push(e.url)
      })
      params.page++
      loading.value = false
      nextTick(() => {
        // 等页面元素加载后执行
        setupWaterfallLayout()
      })
    })
    .catch(() => {
      loading.value = false
    })
}

// ===============瀑布流效果
// 初始条件
//定义间隙10像素
const gap = 10
// 默认列宽
const columnWidth = 300
const containerRef = ref()
/**
 * 获取数字集合中，最小的数字的下标
 * @param columnHeights
 */
const getMinHeight = (columnHeights: number[]) => {
  let minIndex: number = 0
  for (let i = 1; i < columnHeights.length; i++) {
    if (columnHeights[i] < columnHeights[minIndex]) {
      minIndex = i
    }
  }
  return minIndex
}
/**
 * 获取数字集合中，最大的数字的下标
 * @param columnHeights
 */
const getMaxHeight = (columnHeights: number[]) => {
  let maxIndex: number = 0
  for (let i = 1; i < columnHeights.length; i++) {
    if (columnHeights[i] > columnHeights[maxIndex]) {
      maxIndex = i
    }
  }
  return maxIndex
}
/**
 * 执行瀑布流计算
 */
const setupWaterfallLayout = () => {
  let newGap = gap
  let newColumnWidth = columnWidth
  const container = containerRef.value
  const items = Array.from(container.querySelectorAll('.waterfall-item'))
  // console.log(container, items)

  // 获取容器宽度
  const containerWidth = container.clientWidth

  // 计算列数
  const columns = Math.floor(containerWidth / newColumnWidth) // 假设每列宽度为300px

  // 计算列宽度
  if (columns == 1) {
    // 只有一列时，图片占全部宽度
    newColumnWidth = containerWidth
    // 行间隔10
    newGap = gap
  } else {
    // 动态计算行列间隔
    do {
      // 若间隔过大，则让列宽变大，以缩小间隔
      if (newGap > 10) {
        newColumnWidth++
      }
      // 若间隔过小，则让列宽小一点，以扩大间隔
      else if (newGap < 3) {
        newColumnWidth--
      }
      newGap = (containerWidth - columns * newColumnWidth) / (columns - 1)
    } while (newGap > 10 || newGap < 3)
  }
  // 初始化列高度数组
  const columnHeights = new Array(columns).fill(0)

  // 设置每个瀑布流项的位置
  items.forEach((item: any, index) => {
    // 获取图片元素
    const img = item.getElementsByTagName('img')[0]
    // console.dir(img)

    // 图片有缓存时直接布局(主要在窗口尺寸变化时调用)
    if (img.complete) {
      imgLoaded(item, img, columnHeights, newColumnWidth, newGap)
    }
    // 图片无缓存时先对加载速度快的图片进行布局
    else {
      img.addEventListener('load', () => {
        imgLoaded(item, img, columnHeights, newColumnWidth, newGap)
      })
    }
  })

  // 设置容器高度，防止内容溢出
  // container.style.height = `${Math.max(...columnHeights)}px`
}
/**
 * 图片加载完成后，将图片加入瀑布流中
 * @param element 图片所在的div元素
 * @param img IMG图片元素
 * @param heights 记录瀑布流当前列高的数组
 * @param newColumnWidth 计算得出的当前列间距
 * @param newGap  计算得出的当前行间距
 */
const imgLoaded = (
  element: any,
  img: any,
  heights: number[],
  newColumnWidth: number,
  newGap: number
) => {
  const minValueIndex: number = getMinHeight(heights)
  const leftOffset = minValueIndex * (newColumnWidth + newGap)
  const topOffset = heights[minValueIndex] + newGap
  element.style.position = 'absolute'
  element.style.left = `${leftOffset}px`
  element.style.top = `${topOffset}px`
  img.style.width = `${newColumnWidth}px`
  element.style.display = 'block'

  // 更新列高度
  const imgWidth = img.width
  const imgHeight = img.height
  // heights[minValueIndex] += element.clientWidth + gap // 10px 的间隙
  heights[minValueIndex] += (imgHeight / imgWidth) * newColumnWidth + newGap // 10px 的间隙
  // console.log('item', element)
  // console.log('item.clientHeight', element.clientHeight)
  // console.log('columnHeights', heights)
  // console.log(' heights[getMaxHeight(heights)]', heights[getMaxHeight(heights)])
  containerRef.value.style.height = heights[getMaxHeight(heights)] + 'px'
  // 展示图片，
  pictureList.push(img.src) //并把当前图片加入预览图片列表
  containerRef.value.style.display = 'block'
}

//================瀑布流结束

onBeforeMount(() => {
  let id = getQueryString('error~')
  if (id != '') {
    params.albumId = id
    getAlbumInfo()
    getData()
  }
})
let myObserver: IntersectionObserver | null = null
const loadingRef = ref()
const debouncedFunctionImpl = debouncedFunction(setupWaterfallLayout)
onMounted(() => {
  // 窗口尺寸变化事件
  // 变化时，更新瀑布流样式
  // 向下还原和最大化监听不到,只要拖动改变窗口大小时能监听到
  window.addEventListener('resize', debouncedFunctionImpl)

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
  // 移除监听器
  window.removeEventListener('resize', debouncedFunctionImpl)
})
</script>
<style lang="scss" scoped>
// 瀑布流基本样式
.waterfall-container {
  // width: 100%;
  position: relative;
  // overflow: hidden;
  // display: none;
}

.waterfall-item {
  position: absolute;
  box-sizing: border-box;
}
.album-detail {
  .info {
    .date {
      margin-top: 1.5rem;
      .time {
        margin: 0.5rem 0;
      }
    }
    .description {
      letter-spacing: 0.1rem;
      line-height: 120%;
      margin-top: 1rem;
      font-size: 1.4rem;
    }
  }
  .content {
    padding: 1rem;
    .more {
      margin-top: 0.5rem;
      text-align: center;
      span {
        padding: 0.5rem 1rem;
        font-size: 1.8rem;
      }
    }
  }
}
</style>
