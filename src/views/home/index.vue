<template>
  <div class="home">
    <div class="header">
      <Cover />
    </div>
    <div class="common-layout content" id="home-content">
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
                <Talk/>
              </div>
              <!-- <div class="share">
              </div>
              <div class="talk">
              </div> -->
            </div>
            <div class="article" v-for="article in list" :key="article.id">
              <BriefArticle :article="article" />
            </div>
            <!-- 
            <div
              class="loading"
              v-show="params.total != 0 && params.total > list.length"
              v-loading="true"
            ></div> -->
            <div class="article" v-show="loading" v-loading="loading"></div>
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
// import Share from "./share.vue";
import Talk from './talk.vue'
import { computed, onMounted, reactive, ref } from 'vue'
// import { getArticles } from 'api/article'
// import { service } from 'utils/axios'
import { onBeforeRouteLeave } from 'vue-router'
// import { useStore } from 'vuex'

// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()
// const store = useStore()
import {useConfigStoreHook} from "@/store/modules/config"
import {useWebsiteStoreHook} from "@/store/modules/website"
const modules = useConfigStoreHook().module
const website = useWebsiteStoreHook()
const params = reactive({
  page: 1,
  limit: 10,
  total: 0
})
const list = reactive<any>([])
const loading = ref(false)
// const getList = () => {
//   if (loading.value) {
//     return
//   }
//   loading.value = true
//   let { total, ...other } = params
//   service
//     .get('/article/info/page', {
//       params: other
//     })
//     .then((data: any) => {
//       let { total } = data
//       params.total = total
//       data.list.forEach((e: any) => {
//         list.push(e)
//       })
//       params.page++

//       loading.value = false
//       // console.log(list);
//     })
//     .catch(() => {
//       loading.value = false
//     })
// }
onMounted(() => {
  // getList()
  window.onscroll = function () {
    const scrollH = document.documentElement.scrollHeight // 文档的完整高度
    const scrollT = document.documentElement.scrollTop || document.body.scrollTop // 当前滚动条的垂直偏移
    const screenH = window.screen.height // 屏幕可视高度
    if (scrollH - scrollT - screenH < 10) {
      // 5 只是一个相对值，可以让页面再接近底面的时候就开始请求
      // 执行请求
      if (params.total > list.length) {
        // getList()
      }
    }
  }
  // window.addEventListener("scroll", (event) => {
  //   console.log("scroll", event);
  //   let element: HTMLElement | null = document.getElementById("information");
  //   let aside: HTMLElement | null = document.getElementById("home-content");
  //   let offsetTop = aside?.offsetTop;
  //   let winHeight =
  //     window.pageYOffset ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop;
  //   console.log("scroll", element, offsetTop, winHeight);
  //   if (offsetTop && winHeight > offsetTop) {
  //     console.log(1)
  //     element?.classList.add("float");
  //   }else{
  //     element?.classList.remove('float')
  //   }
  // });
})
</script>

<style lang="scss" scoped>
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
// .float {
//   position: fixed !important;
//   width: inherit;
//   top: 2rem;
// }
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
