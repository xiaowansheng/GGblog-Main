<template>
  <div class="tag">
    <Header :cover="covers.Tag">
      <template #title>
        {{ $t('menu.tag') }}
      </template>
    </Header>
    <div class="content">
      <div class="tags">
        <div class="tag-link" v-for="tag in tags" :key="tag.id">
          <router-link :to="'/article/tag/query/' + tag.id">
            <span class="info">
              <span class="name">
                {{ tag.name }}
              </span>
              <span class="count">{{ tag.count }}</span>
            </span>
          </router-link>
        </div>
      </div>
      <div class="empty" v-if="tags.length == 0">
        <el-empty description="Empty~" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/header/index.vue'
// import { service } from 'utils/axios'
import { computed, onMounted, ref } from 'vue'
// import { useStore } from 'vuex'
import {useConfigStoreHook} from "@/store/modules/config"
const covers = computed(() => useConfigStoreHook().covers)
import { getAllTag } from "@/api/tag"
defineOptions({
  name: 'Tag'
})
// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()
const tags: any = ref([])
const getData = () => {
  getAllTag().then((data: any) => {
    tags.value = data
  })
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.tag {
  .content {
    // display: flex;
    margin: 0 auto;

    box-sizing: border-box;
    padding: 1.5rem 2rem;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.8);
    .tags {
      display: flex;
      flex-wrap: wrap;
      // margin: 1rem;
      // font-size: 1.8rem;
      // font-weight: bold;
      .tag-link {
        background-color: rgb(218, 238, 241);
        margin: 0.5rem 1rem 0.5rem 0;
        padding: 0.35rem 0.8rem;
        border-radius: 1.5rem;
        .info {
          display: flex;
          align-items: center;
          .name {
            font-size: 1.5rem;
          }
          .count {
            margin-left: 0.6rem;
            font-size: 1.2rem;

            padding: 0.2rem 0.5rem;
            border-radius: 50%;
            background-color: rgb(177, 219, 236);
          }
          .name,
          .count {
            color: rgb(26, 164, 206);
          }
        }
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .tag {
    .content {
      width: 60%;
    }
  }
}
@media screen and (max-width: 768px) {
  .tag {
    .content {
      width: 88%;
    }
  }
}
.dark {
  .content {
    background-color: rgb(13, 28, 30) !important;
    .tag-link {
      background-color: rgb(48, 54, 58) !important;
      .info {
        .count {
          background-color: rgb(75, 90, 99) !important;
        }
        .name,
        .count {
          color: rgb(96, 155, 201) !important;
        }
      }
    }
  }
}
</style>
