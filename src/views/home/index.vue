<template>
  <div class="home">
    <div class="header">
      <Cover />
    </div>
    <div class="common-layout content" ref="contentRef" id="home-content">
      <el-container>
        <el-aside class="aside">
          <div id="information" class="info">
            <Information />
          </div>
        </el-aside>
        <el-main class="main">
          <div>
            <div class="other">
              <div class="bulletin" v-if="modules.Bulletin">
                <div class="title">
                  <span class="iconfont icon-gonggao5"></span> {{ $t('home.bulletin') }}
                </div>
                <div class="bulletin-content">
                  {{ website.bulletin }}
                </div>
              </div>
              <!-- <Share /> -->
              <!-- TODO 待做 -->
              <div v-if="false">
                <Talk />
              </div>
              <!-- <div class="share">
              </div>
              <div class="talk">
              </div> -->
            </div>
            <div class="aticles">
              <el-skeleton :count="10" :loading="loading" :throttle="200" animated>
                <template #template>
                  <div class="skeleton-item">
                    <div class="cover">
                      <el-skeleton-item class="image" variant="image" style="height: 100%" />
                    </div>
                    <div class="content">
                      <el-skeleton-item class="title" variant="h3" />
                      <div class="info">
                        <div>
                          <el-skeleton-item class="date" variant="p" />
                        </div>
                        <el-skeleton-item class="tag" variant="text" />
                        <el-skeleton-item class="tag" variant="text" />
                        <el-skeleton-item class="tag" variant="text" />
                      </div>
                      <div class="description">
                        <!-- <el-skeleton-item variant="p" style="width: 50%" /> -->
                        <div style="align-items: center; justify-items: space-between">
                          <el-skeleton-item class="text" variant="text" />
                          <el-skeleton-item class="text" variant="text" />
                          <el-skeleton-item class="text" variant="text" />
                          <!-- <el-skeleton-item class="text" variant="text" /> -->
                          <!-- <el-skeleton-item class="text" variant="text" />
                        <el-skeleton-item class="text" variant="text" /> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template #default>
                  <div class="article" v-for="article in list" :key="article.id">
                    <BriefArticle :article="article" />
                  </div>
                  <div class="pagination">
                    <el-pagination
                      :hide-on-single-page="true"
                      v-model:current-page="params.page"
                      v-model:page-size="params.limit"
                      :disabled="false"
                      :background="true"
                      layout="prev, pager, next, jumper,total"
                      :total="total"
                      :pager-count="5"
                      @size-change="toTop"
                      @current-change="toTop"
                    />
                  </div>
                </template>
              </el-skeleton>
            </div>
            <!-- 
            <div
              class="loading"
              v-show="params.total != 0 && params.total > list.length"
              v-loading="true"
            ></div> -->
            <!-- <div class="article" v-show="loading" v-loading="loading"></div> -->
          </div>
          <div class="empty" v-if="!loading && list.length == 0">
            <el-empty description="Empty~" />
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Cover from './cover.vue'
import Information from './information.vue'
import BriefArticle from './briefArticle/index.vue'
import Talk from './talk.vue'
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { getArticlePage } from '@/api/article'
import { useConfigStoreHook } from '@/store/modules/config'
defineOptions({
  name: 'Home'
})
const modules = computed(() => {
  return useConfigStoreHook().module
})
const website = computed(() => {
  return useConfigStoreHook().website
})
const params = reactive({
  page: 1,
  limit: 10
})
const total = ref(0)
const list = ref<any>([])
const loading = ref(false)
const contentRef = ref()
/**
 * 获取某页数据，并跳转顶部
 */
async function toTop() {
  // 获取数据
  try {
    await getData()
    // 滚到顶部
    if (contentRef.value) {
      contentRef.value.scrollIntoView({ behavior: 'auto' })
    }
  } catch (e) {}
}
const getData = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (loading.value) {
      return
    }
    loading.value = true
    // 使用await调用异步函数
    getArticlePage(params)
      .then((data: any) => {
        total.value = data.total
        list.value = data.list
        loading.value = false
        resolve(null)
      })
      .catch(() => {
        loading.value = false
        reject(null)
      })
  })
}
onBeforeMount(() => {
  getData()
})
onMounted(() => {})
</script>

<style lang="scss" scoped>
$cover-height: 10.8 * 1.8rem;
$cover-height2: 10.8 * 1.3rem;

.pagination {
  display: flex;
  justify-content: right;

  .el-pagination {
    flex-wrap: wrap;
    justify-content: right;
    gap: 0.8rem;
  }
}
.skeleton-item {
  border-radius: 1.5rem;
  overflow: hidden;
  margin-bottom: 15px;
  background-color: rgb(231, 234, 237);
  .cover {
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    width: 100%;
    padding: 1.8rem;
    .title {
      width: 100%;
      height: 4rem;
    }
    .info {
      .date {
        width: 13rem;
      }
      .tag {
        width: 5rem;
        margin-right: 1rem;
      }
    }
    .description {
      .text {
        width: 100%;
        height: 2rem;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .skeleton-item {
    display: flex;
    height: $cover-height;
    .cover {
      width: 70%;
    }
  }
}
@media screen and (max-width: 768px) {
  .skeleton-item {
    .cover {
      height: $cover-height2;
      width: 100%;
    }
  }
}

.header {
  position: relative;
}
.other > div {
  margin: 0 0 1.5rem 0;
}
.main {
  .article {
    border-radius: 1.5rem;
  }
  // .empty{
  //   background-color: white;
  // }
  // .article:hover {
  //   box-shadow: -2px 0 2px 2px rgba(149, 226, 228, 0.5),
  //     0px -2px 2px 2px rgba(149, 226, 228, 0.5),
  //     2px 0 2px 2px rgba(149, 226, 228, 0.5),
  //     0 2px 2px 2px rgba(149, 226, 228, 0.5);
  // }
}
@media screen and (max-width: 768px) {
  .home {
    .content {
      margin: 0 auto;
      width: 92%;
      .main {
        width: 100%;
      }
      .article:not(:last-of-type) {
        margin-bottom: 1.5rem;
      }
    }
    .aside {
      display: none;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .home {
    .content {
      margin: 0 auto;
      width: 90%;
      .main {
        // width: 100%;
      }
      .article:not(:last-of-type) {
        margin-bottom: 1.5rem;
      }
    }
    .aside {
      display: none;
    }
  }
}

@media screen and (min-width: 992px) {
  .home {
    .content {
      // position: relative;
      margin: 0 auto;
      // width: 85%;
      .main {
        padding-left: 0 !important;
        // margin-left: 0;
        // width: 80%;
        .article:not(:last-of-type) {
          margin-bottom: 1.5rem;
        }

        .bulletin {
          display: none;
        }
      }
      .aside {
        // background-color: red;
        position: relative;
        overflow: visible !important;
        padding-right: 1.5rem !important;
        // max-height: 90vh;
        // margin-left: 3rem !important;
        .info {
          max-height: 100vh;
          padding-bottom: 2rem;
          // background-color: red;
          overflow: auto;
          // width: 2000px;
          position: sticky;
          // position: fixed;
          // width: inherit;
          // width: 100%;
          left: 0;
          right: 0;
          top: 2rem;
        }

        /* 去除滚动条 */
        .info::-webkit-scrollbar {
          /* 滚动条的宽度 */
          width: 0px !important;
        }
      }
      .main,
      .aside {
        padding-top: 2rem !important;
      }
    }
  }
}

@media screen and (min-width: 992px) and (max-width: 1300px) {
  .home {
    .content {
      width: 88%;

      .main {
        // width: 70%;
      }
      .aside {
        width: 26%;
      }
    }
  }
}
@media screen and (min-width: 1300px) {
  .home {
    .content {
      width: 85%;

      .main {
        // width: 80%;
      }
      .aside {
        width: 23%;
      }
    }
  }
}
@media screen and (max-width: 992px) {
  .main {
    .bulletin {
      border-radius: 1.5rem;
      background-color: white;
      padding: 1.5rem 2rem;
      .title {
        padding-bottom: 0.5rem;
        font-weight: bold;
        font-size: 1.5rem;
      }
      .bulletin-content {
        margin-top: 0.5rem;
        font-size: 1.35rem;
        line-height: 130%;
      }
    }
  }
}
.dark {
  .home {
    .main {
      .other {
        .bulletin {
          color: rgb(108, 97, 97);
          background-color: black !important;
        }
      }
    }
  }
}
</style>
<style lang="scss">
#home-content {
  .main {
    padding: 2rem 0;
  }
  .aside {
    padding: 0;
    margin: 0;
  }
}

// #home-articles {
// }
</style>
