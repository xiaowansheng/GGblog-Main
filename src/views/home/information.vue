<template>
  <div class="information">
    <header>
      <div>
        <el-avatar :size="110" :src="author.avatar" />
      </div>
      <div class="nickname">
        <label>{{ author.nickname }}</label>
      </div>
      <div class="introduction">
        <label>{{ author.introduction }}</label>
      </div>
      <div class="data">
        <div>
          <router-link to="/article/archive">
            <label>{{ $t('menu.blog') }}</label>
            <br />
            <span>{{ numberInfo.article }}</span>
          </router-link>
        </div>
        <div>
          <router-link to="/article/category">
            <label>{{ $t('menu.category') }}</label>
            <br />
            <span>{{ numberInfo.category }}</span>
          </router-link>
        </div>
        <div>
          <router-link to="/article/tag">
            <label>{{ $t('menu.tag') }}</label>
            <br />
            <span>{{ numberInfo.tag }}</span>
          </router-link>
        </div>
      </div>
    </header>
    <main>
      <!-- <Bulletin v-if="modules.Bulletin" /> -->
      <!-- TODO 待做 -->
      <Record />
    </main>
    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import Bulletin from './bulletin.vue'
import Record from './record.vue'
import { getSimpleStatistic } from '@/api/article'
import { useConfigStoreHook } from '@/store/modules/config'
const author = computed(() => {
  return useConfigStoreHook().author
})
const numberInfo = computed(() => {
  return useConfigStoreHook().statistic
})
// const modules = useConfigStoreHook().module
// const numberInfo = ref({
//   article: 0,
//   category: 0,
//   tag: 0,
//   talk: 0
// })
onBeforeMount(() => {
  // getSimpleStatistic().then((data: any) => {
  //   numberInfo.value=data
  // })
})
</script>

<style lang="scss" scoped>
.information {
  // padding: 1rem;
  border-radius: 15px;
  // background-color: rgb(125, 183, 75);
  text-align: center;
  header,
  main > div {
    border-radius: 12px;
  }
  header {
    padding: 1rem 0;
    background-color: white;
    .nickname {
      font-size: 2rem;
      margin: 1.1rem 0;
      font-weight: bold;
      letter-spacing: 0.1rem;
    }
    .introduction {
      font-size: 1.3rem;
      padding: 0 1rem;
    }
    .data {
      margin-top: 2rem;
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      text-align: center;
      label {
        font-size: 1.5rem;
        font-weight: bold;
      }
      span {
        font-size: 1.4rem;
        line-height: 180%;
      }
      a {
        color: rgb(87, 111, 119);
        cursor: pointer;
      }
    }
  }
  main {
    margin-top: 1.2rem;
  }
}
.dark {
  header {
    background-color: black !important;
    a {
      color: white !important;
    }
  }
}
</style>
