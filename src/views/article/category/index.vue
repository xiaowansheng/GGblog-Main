<template>
  <div class="categorys">
    <Header :cover="covers.Category">
      <template #title>
        {{ $t('menu.category') }}
      </template>
    </Header>
    <div class="content">
      <div class="cg" v-for="category in categorys" :key="category.id">
        <router-link class="cg-link" :to="'/article/category/query/' + category.id"
          ><h2>
            {{ category.name }}
          </h2>
          <span class="count">{{ category.count }}</span></router-link
        >
      </div>
      <!-- <div class="cg cg-link" v-for="category in categorys" :key="category.id">
        <h2>
          {{ category.name }}
        </h2>
        <div>({{ category.count }})</div>
      </div> -->
      <div class="empty" v-if="categorys.length == 0">
        <el-empty description="Empty~" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/header/index.vue'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useConfigStoreHook } from '@/store/modules/config'
import { getAllCategory } from '@/api/category'
const covers = computed(() => {
  return useConfigStoreHook().covers
})
const categorys: any = ref([])
const getData = () => {
  getAllCategory().then((data: any) => {
    categorys.value = data
  })
}
onBeforeMount(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.categorys {
  .content {
    margin: 0 auto;
    box-sizing: border-box;
    border-radius: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: rgba(255, 255, 255, 0.8);
    .cg {
      // background-color: red;
      font-size: 1.3rem;
      margin: 1rem 0;
      font-weight: bold;
    }
    .cg-link {
      padding: 0.2rem 0.8rem;
      border-radius: 1.5rem;
      overflow: hidden;
      display: flex;
      // align-content: space-between;

      // justify-content: center;
      align-items: center;
      justify-content: space-between;

      .count {
        padding: 0.5rem 0.8rem;
        border-radius: 50%;
        background-color: rgb(205, 238, 241);
        // border: 0.3rem rgb(178, 239, 240) solid;
      }
    }
    h2,
    .count {
      // padding: 0;
      // margin: 0;
      color: rgb(99, 193, 212);
    }
  }
}
@media screen and (min-width: 768px) {
  .categorys {
    .content {
      width: 60%;
    }
  }
}
@media screen and (max-width: 768px) {
  .categorys {
    // overflow: hidden;
    .content {
      width: 85%;
    }
  }
}
.dark {
  .content {
    background-color: rgb(13, 28, 30) !important;
    .cg-link {
      background-color: rgb(61, 71, 75);
      .count,
      h2 {
        color: rgb(90, 154, 178);
      }
      .count {
        background-color: rgb(81, 103, 136);
      }
    }
  }
}
</style>
