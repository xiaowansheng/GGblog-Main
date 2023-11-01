<template>
  <div class="record">
    <div class="title"><span class="iconfont icon-zixun1"></span>{{ $t('record.title') }}</div>
    <div class="content">
      <!-- <div>{{ createTime }}</div> -->
      <table border="0">
        <tr>
          <td class="runtime">
            <label>{{ $t('record.runtime') }} : </label>
          </td>
          <td>
            <span>{{ createTime }}</span>
          </td>
        </tr>
        <!-- TODO -->
        <tr class="traffic">
          <!-- <td><label>访问量:</label></td>
          <td><span>987654</span></td> -->

          <td>
            <label>{{ $t('record.pageView') }} : </label>
          </td>
          <td>
            {{ website.pageView }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { convertIntervalTime } from '@/utils/timeUtils'
// import { useStore } from 'vuex'
import { useConfigStoreHook } from '@/store/modules/config'
//计算两个时间之间的时间差 多少天时分秒

// import { useI18n } from 'vue-i18n'
// import { service } from 'utils/axios'
// const { t } = useI18n()
import { t } from '@/plugins/i18s/index'
defineOptions({
  name: 'Record'
})
const website = computed(() => {
  return useConfigStoreHook().website
})
// watch((website), () => {
//   timestamp.value=(new Date().getTime()-new Date(website.createTime).getTime())
// })
const timer: any = ref(null)
const timestamp = ref(0)
const createTime = computed(() => {
  let str = convertIntervalTime(timestamp.value)
  return str
    .replace('天', t('record.days'))
    .replace('小时', t('record.hours'))
    .replace('分钟', t('record.minutes'))
    .replace('秒', t('record.seconds'))
})
const formatTime = (value: any) => {
  if (value.createTime) {
    let dateStr = value.createTime
    dateStr = dateStr.replace(/-/g, '/')
    let start = new Date(dateStr)
    timestamp.value = new Date().getTime() - start.getTime()
    timer.value = setInterval(() => {
      timestamp.value = timestamp.value + 1000
    }, 1000)
    return true
  } else {
    return false
  }
}
const websiteWatch = watch(website.value, () => {
  formatTime(website.value)
  websiteWatch()
})

const getCount = () => {
  // service.get('/website/visitor/count').then((data: any) => {
  //   if (data) {
  //     visitorCount.value = data
  //   }
  // })
}
onBeforeMount(() => {
  formatTime(website.value)
  getCount()
})
onBeforeUnmount(() => {
  // console.log("unmounted,",this.timer)
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.record {
  margin-top: 1.2rem;
  padding-block: 1rem;
  background-color: rgba(255, 255, 255, 0.8);

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    .iconfont {
      margin-right: 0.3rem;
      font-weight: 100;
    }
  }

  .content {
    margin-top: 0.8rem;
    padding: 0 1rem;
    text-align: left;
    label {
      font-weight: bold;
      font-size: 1.2rem;
    }
    span {
      font-size: 1.2rem;
    }
    table {
      .traffic {
        margin-top: 10px;
      }
    }
  }
}
.dark {
  .record {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>
