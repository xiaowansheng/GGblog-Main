<template>
  <div class="bulletin">
    <div class="title"><span class="iconfont icon-gonggao5"></span>{{ $t('home.bulletin') }}</div>
    <div class="content">
      {{ website.bulletin }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useConfigStoreHook } from '@/store/modules/config'
const website = computed(() => {
  return useConfigStoreHook().website
})
</script>

<style lang="scss" scoped>
.bulletin {
  background-color: white;
  padding: 1rem;

  .title {
    // padding: 0.8rem 0;
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;

    .iconfont {
      margin-right: 0.5rem;
    }
  }

  .content {
    margin-top: 0.7rem;
    font-size: 1.3rem;
    text-align: left;
  }
}
.dark {
  .bulletin {
    background-color: black;
  }
}
</style>
