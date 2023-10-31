<template>
  <div class="talk-detail">
    <Header :cover="covers.Talk">
      <template #title>
        {{ $t('menu.talk') }}
      </template>
    </Header>
    <div class="content">
      <div class="talk-content">
        <div class="title">
          <div class="avatar">
            <el-avatar :size="65" :src="authorInfo.Avatar" />
          </div>
          <div class="info">
            <div class="name">{{ authorInfo.Nickname }}</div>
            <div class="date">{{ talk.createTime }}</div>
          </div>
        </div>
        <div class="text" v-html="talk.content"></div>
        <div class="imgs" :class="getClassName(talk.images)" v-if="talk.images">
          <div class="img" v-for="(img, index) in talk.images" :key="index">
            <el-image
              :src="img"
              fit="cover"
              lazy
              :preview-src-list="talk.images"
              :initial-index="index"
            >
              <template #error>
                <div class="image-slot" style="font-size: 1.6rem">Image Loading Error</div>
              </template>
            </el-image>
            <!-- <el-image-viewer @close="closeImgViewer" :url-list="imageList" v-if="showImageViewer"/> -->
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
      </div>
      <div class="coment">
        <Comment :topicType="TopicType.talk" :topicId="topicId" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/header/index.vue'

import { TopicType } from '@/enums/topic'
import { computed, onMounted, reactive, ref } from 'vue'

import Comment from "@/components/comment/index.vue";
import { getQueryString } from '@/utils/stringUtils'
import { useConfigStoreHook } from '@/store/modules/config'
import { getTalk } from '@/api/talk'
const covers = computed(() => {
  return useConfigStoreHook().covers
})

const privacy = computed(() => {
  return useConfigStoreHook().privacy
})
const authorInfo = computed(() => {
  return useConfigStoreHook().author
})
const topicId: any = ref(null)
// const { t } = useI18n();
const talk: any = ref({})
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
      if (length == 4) {
        return 'images-four'
      } else {
        return 'images-three'
      }
    }
  }
}
const getData = (id: any) => {
  getTalk(id).then((data: any) => {
    // let imgs = [];
    // for (let i = 0; i < 6; i++) {
    //   //   imgs.push(
    //   //     "https://wbxnl-blog.oss-cn-chengdu.aliyuncs.com/images/201021LATX2.jpg"
    //   //   );
    //   //   imgs.push(
    //   //     "https://wbxnl-blog.oss-cn-chengdu.aliyuncs.com/images/231419vaVVJ.jpg"
    //   //   );
    //   imgs.push(
    //     "https://wbxnl-blog.oss-cn-chengdu.aliyuncs.com/images/234256qhzWe.jpg"
    //   );
    // }
    data.images = JSON.parse(data.images)
    if (data.content) {
      data.content = data.content.replace(/\n/g, '<br>')
    }
    talk.value = data
  })
}
onMounted(() => {
  let id = getQueryString('error~')
  if (id) {
    topicId.value = Number.parseInt(id)
    getData(id)
  }
})
</script>

<style lang="scss">
.talk-detail {
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
.talk-detail {
  .content {
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 1.5rem;
    margin: 0 auto;
    padding: 1rem 1.8rem;

    .talk-content {
      border-width: 0 0 1px 0;
      border-style: solid;
      border-color: black;
      .title {
        display: flex;
        // justify-content: space-between;
        align-items: center;
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
        overflow: hidden;
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
  .talk-detail {
    .content {
      .talk-content {
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .talk-detail {
    .content {
      .talk-content {
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .talk-detail {
    .content {
      width: 90%;
    }
  }
}
@media screen and (min-width: 992px) {
  .talk-detail {
    .content {
      width: 85%;
    }
  }
}

.dark {
  .talk-detail {
    .content {
      background-color: rgb(7, 28, 30);
    }
  }
}
</style>
