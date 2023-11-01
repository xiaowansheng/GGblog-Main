<template>
  <div class="talk">
    <Header :cover="covers.Talk">
      <template #title>
        {{ $t('menu.talk') }}
      </template>
    </Header>
    <div class="content">
      <el-skeleton :count="5" :throttle="200" :loading="loading" animated>
        <template #template>
          <div class="talk-item">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <div class="title">
                    <div class="avatar">
                      <!-- <el-avatar :size="65" :src="author.avatar" /> -->

                      <el-skeleton-item
                        variant="image"
                        style="border-radius: 50%; height: 65px; width: 65px"
                      />
                    </div>
                    <div class="info">
                      <div class="name">
                        <el-skeleton-item variant="text" style="width: 10rem; height: 2.3rem" />
                      </div>
                      <div class="date">
                        <el-skeleton-item variant="text" style="width: 12rem; height: 1.6rem" />
                      </div>
                    </div>
                  </div>
                  <!-- <el-button class="button" text>button</el-button> -->
                </div>
              </template>
              <div class="text">
                <el-skeleton-item variant="p" />
                <el-skeleton-item variant="p" />
                <el-skeleton-item variant="p" />
                <el-skeleton-item variant="p" />
                <el-skeleton-item variant="p" />
              </div>

              <div class="bottom">
                <div class="address">
                  <p>
                    <el-skeleton-item variant="p" style="width: 6rem" />
                  </p>
                </div>
                <div>
                  <p>
                    <el-skeleton-item variant="p" style="width: 6rem" />
                  </p>
                  <p>
                    <el-skeleton-item variant="p" style="width: 6rem" />
                  </p>
                </div>
              </div>
            </el-card>
          </div>
        </template>
        <template #default> </template>
      </el-skeleton>
      <el-card
        class="box-card"
        @click="toPage('/talk/' + talk.id)"
        v-for="talk in talks"
        :key="talk.id"
      >
        <template #header>
          <div class="card-header">
            <span v-if="talk.top" class="top"
              ><el-tag>{{ $t('talk.top') }}</el-tag></span
            >
            <div class="title">
              <div class="avatar">
                <el-avatar :size="65" :src="author.avatar" />
              </div>
              <div class="info">
                <div class="name">{{ author.nickname }}</div>
                <div class="date">{{ talk.createTime }}</div>
              </div>
            </div>
            <!-- <el-button class="button" text>button</el-button> -->
          </div>
        </template>
        <div class="text" v-html="talk.content"></div>
        <div class="imgs" @click.stop :class="getClassName(talk.images)" v-if="talk.images">
          <div
            class="img"
            v-show="
              (talk.images.length < 6 && index < 3) ||
              talk.images.length == 4 ||
              (talk.images.length >= 6 && index < 6) ||
              (talk.images.length >= 9 && index < 9)
            "
            v-for="(img, index) in talk.images.slice(0, 9)"
            :key="index"
          >
            <!-- TODO 还差左滑下一张，右滑上一张 -->
            <el-image
              :src="img"
              fit="cover"
              :preview-src-list="talk.images ? talk.images : []"
              :initial-index="index"
            >
              <template #error>
                <div class="image-slot" style="font-size: 1.6rem">Image Loading Error</div>
              </template>
            </el-image>
            <router-link :to="'/talk/' + talk.id" class="more" v-if="showMore(talk.images, index)">
              <span class="sign">{{ '+' }}</span>
              <span class="number">{{ getRemainNumber(talk.images) }}</span>
            </router-link>
          </div>
        </div>

        <div v-if="privacy.Browser || privacy.Device || privacy.Address" class="bottom">
          <div v-if="privacy.Address" class="address">
            <el-tag
              ><span>{{ talk.ipSource }}</span></el-tag
            >
          </div>
          <div>
            <p v-if="privacy.Browser">{{ talk.browser }}</p>
            <p v-if="privacy.Device">{{ talk.device }}</p>
          </div>
        </div>
      </el-card>
      <div class="empty" v-if="!loading && talks.length == 0">
        <el-empty description="Empty~" />
      </div>
      <div class="loading" v-show="total != 0 && total > talks.length" v-loading="true"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/header/index.vue'
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStoreHook } from '@/store/modules/config'
import { getTalkPage } from '@/api/talk'
defineOptions({
  name: 'Talk'
})
const router = useRouter()
const author = computed(() => {
  return useConfigStoreHook().author
})
const covers = computed(() => {
  return useConfigStoreHook().covers
})

const privacy = computed(() => {
  return useConfigStoreHook().privacy
})
const toPage = (path: string) => {
  router.push(path)
}
const talks: any = reactive([])
const params = reactive({
  page: 1,
  limit: 10
})
const total = ref(0)
const getClassName = (images: any) => {
  if (!images || images.length == 0) {
    return ''
  }
  let length = images.length
  if (length == 1) {
    return 'image-one'
  } else {
    if (length == 2) {
      return 'images-two'
    } else {
      if (length > 2 && length < 9) {
        if (length == 4) {
          return 'images-four'
        } else if (length == 6) {
          return 'images-three'
        } else {
          return 'images-three'
        }
      } else {
        return 'images-nine'
      }
    }
  }
}
const showMore = (images: any, index: number) => {
  let length = images.length
  if (length > 3 && length < 6 && length != 4 && index == 2) {
    return true
  }
  if (length > 6 && length < 9 && index == 5) {
    return true
  }
  if (length > 9 && index == 8) {
    return true
  }
  return false
}
const getRemainNumber = (images: any) => {
  let length = images.length
  if (length > 3 && length < 6) {
    return length - 3
  }
  if (length > 4 && length < 9) {
    return length - 6
  }
  if (length > 9) {
    return length - 9
  }
}
const loading = ref(false)
const getData = () => {
  if (loading.value) {
    return
  }
  loading.value = true
  getTalkPage(params)
    .then((data: any) => {
      data.list.forEach((e: any) => {
        // console.log("images:",e.images)
        // let imgs = [];
        // for (let i = 0; i < 0; i++) {
        //   imgs.push(
        //     "https://wbxnl-blog.oss-cn-chengdu.aliyuncs.com/images/201021LATX2.jpg"
        //   );
        //   imgs.push(
        //     "https://wbxnl-blog.oss-cn-chengdu.aliyuncs.com/images/231419vaVVJ.jpg"
        //   );
        //   imgs.push(
        //     "https://wbxnl-blog.oss-cn-chengdu.aliyuncs.com/images/234256qhzWe.jpg"
        //   );
        // }
        e.images = JSON.parse(e.images)
        if (e.content) {
          e.content = e.content.replace(/\n/g, '<br>')
        }
        talks.push(e)
      })

      params.page++
      total.value = data.total
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
onBeforeMount(() => {
  getData()
  window.onscroll = function () {
    const scrollH = document.documentElement.scrollHeight // 文档的完整高度
    const scrollT = document.documentElement.scrollTop || document.body.scrollTop // 当前滚动条的垂直偏移
    const screenH = window.screen.height // 屏幕可视高度
    if (scrollH - scrollT - screenH < 5) {
      // 5 只是一个相对值，可以让页面再接近底面的时候就开始请求
      // 执行请求
      if (total.value > talks.length) {
        getData()
      }
    }
  }
})
</script>
<style lang="scss">
.el-card {
  position: relative !important;
}
.talk {
  .content {
    .text {
      img {
        height: 2.5rem;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.talk {
  .content {
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 1.5rem;
    margin: 0 auto;
    padding: 1rem 1.8rem;

    .box-card {
      margin: 1.5rem auto;
      border-radius: 1.5rem;
      .top {
        border-radius: 0.8rem;
        overflow: hidden;
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
      }
      .title {
        display: flex;

        // justify-content: space-between;
        align-items: center;
        // justify-content: center;
        .avatar {
          span {
          }
        }
        .info > div {
          margin: 1rem;
        }
        .info {
          .name {
            font-size: 1.5rem;
            font-weight: bold;
          }
          .date {
            font-size: 1.1rem;
          }
        }
      }
      .text {
        font-size: 1.5rem;
        letter-spacing: 0.12rem;
        line-height: 2rem;
      }
      .imgs {
        padding-top: 1rem;
        .img {
          .more {
            position: absolute;
            color: white;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.45);
            display: flex;
            // text-align: center;
            align-items: center;
            justify-content: center;

            .sign {
              // font-size: 5rem;
            }
            .number {
              // font-size: 5rem;
            }
          }
        }
      }
      .imgs:not(.image-one) {
        display: grid;

        grid-column-gap: 0.5rem;
        grid-row-gap: 0.5rem;
        // justify-content: space-between;
        margin: 0 auto;
        .img:not(.image-one) {
          width: 100%;
          padding-bottom: 100%;

          // min-height: 10rem;
          // max-height: 35rem;
          position: relative;
          // height: 0;

          .el-image {
            position: absolute;
            width: 100%;
            height: 100%;
            // border: 1px red solid;
          }
        }
      }
      .image-one {
        .img {
          .el-image {
            max-height: 35rem;
          }
          // max-width: 45rem;
          // width: 33%;
          // padding-bottom: 33%;
        }
      }
      .images-two {
        grid-template-columns: repeat(2, 1fr);
        .img {
        }
      }
      .images-three {
        grid-template-columns: repeat(3, 1fr);
        .img {
        }
      }
      .images-four {
        grid-template-columns: repeat(2, 1fr);
        .img {
        }
      }
      .images-nine {
        grid-template-columns: repeat(3, 1fr);
      }
      .bottom {
        margin-top: 1.2rem;
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .address {
          font-size: 1.3rem;
          text-align: left;
        }
        p {
          text-align: right;
          margin: 0.5rem 0;
          // padding: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .talk {
    .content {
      .imgs {
        .img {
          .more {
            font-size: 3rem;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .talk {
    .content {
      .imgs {
        .img {
          .more {
            font-size: 5rem;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .talk {
    .content {
      width: 90%;
    }
  }
}
@media screen and (min-width: 992px) {
  .talk {
    .content {
      width: 85%;
    }
  }
}
.dark {
  .content {
    background-color: rgb(13, 28, 30) !important;
  }
}
</style>
