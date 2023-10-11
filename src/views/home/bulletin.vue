<template>
  <div class="bulletin">
    <div class="title"><span class="iconfont icon-gonggao5"></span>{{ t('home.bulletin') }}</div>
    <div class="content">
      {{ website.Bulletin }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Bulletin',
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const website = computed(() => {
      return store.state.website
    })
    return {
      t,
      website
    }
  }
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
