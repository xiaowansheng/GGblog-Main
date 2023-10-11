<template>
  <div class="query">
    <Header :cover="covers.Home">
      <template #title>
        {{ name }}
      </template>
    </Header>
    <div class="content">
      <div class="articles">
        <BriefArticleBlock v-for="article in articles" :key="article.id" :article="article" />
      </div>
      <el-empty v-show="!loading && params.total == 0" description="Empty ~" />
      <div class="loading" v-show="loading" v-loading="loading"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layouts/default/header/index.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { getQueryString } from '@/utils/stringUtils'
// import { service } from '@/utils/axios'
import BriefArticleBlock from './briefArticleBlock/index.vue'
// import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

import {useConfigStoreHook} from "@/store/modules/config"
const covers = useConfigStoreHook().covers
const params = reactive<any>({
  page: 1,
  limit: 10,
  total: 0,
  categoryId: null,
  tagId: null
})
const articles: Array<any> = reactive([])
const loading = ref(false)
const getData = () => {
  if (loading.value) {
    return
  }
  loading.value = true
  const { total, ...other } = params
  // service
  //   .get('/article/info/page', {
  //     params: other
  //   })
  //   .then((data: any) => {
  //     params.total = data.total
  //     data.list.forEach((e: any) => {
  //       articles.push(e)
  //     })
  //     loading.value = false
  //   })
  //   .catch(() => {
  //     loading.value = false
  //   })
}
const name = ref('Unknown')
const getCategoryName = (id: string) => {
  // service.get('/category/detail/' + id).then((data: any) => {
  //   name.value = t('menu.category') + ' — ' + data.name
  // })
}
const getTagName = (id: string) => {
  // service.get('/tag/detail/' + id).then((data: any) => {
  //   name.value = t('menu.tag') + ' — ' + data.name
  // })
}
onMounted(() => {
  let id = getQueryString('')
  if (id) {
    if (window.location.href.indexOf('category') > 0) {
      params.categoryId = id
      getCategoryName(id)
    } else {
      params.tagId = id
      getTagName(id)
    }
    getData()
  } else {
    ElMessage.error('Error !')
  }
})
</script>

<style lang="scss" scoped>
.query {
  .content {
    margin: 0 auto;
    padding: 1rem 1rem;
    box-sizing: border-box;
  }
  .content > div {
  }
}

@media screen and (min-width: 992px) {
  .query {
    .content {
      width: 90%;
      .articles {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 2.2rem;
        grid-row-gap: 2.2rem;
      }
      // grid-template-rows: repeat(3, 1fr);
    }
    .content > div {
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .query {
    .content {
      width: 90%;
      .articles {
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 2.2rem;

        grid-row-gap: 2.2rem;
        // grid-template-rows: repeat(3, 1fr);
      }
    }
    .content > div {
    }
  }
}
@media screen and (max-width: 768px) {
  .query {
    .content {
      width: 90%;
      .articles {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-row-gap: 1.5rem;
      }
    }
    .content > div {
    }
  }
}
</style>
