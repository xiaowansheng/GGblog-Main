<template>
  <div class="album-detail">
    <Header :cover="album.cover">
      <template #title>
        {{ album.name }}
      </template>
      <template #content>
        <div class="info">
          <div class="date">
            <p class="time">
              <span class="iconfont icon-riqi"></span
              ><span>{{$t('album.createTime')}}{{ album.createTime }}</span>
            </p>
            <p class="time">
              <span class="iconfont icon-riqi"></span
              ><span>{{$t('album.updateTime')}}{{ album.updateTime }}</span>
            </p>
          </div>
          <p class="description">
            {{ album.description }}
          </p>
        </div>
      </template>
    </Header>

    <div class="content">
      <div class="empty" v-show="!loading&&pictures.length == 0">
        <el-empty description="Empty~" />
      </div>
      <div class="pictures">
        <div
          class="picture"
          v-for="(picture, index) in pictures"
          :key="picture.id"
        >
          <el-image
            :preview-src-list="pictureList"
            :initial-index="index"
            :lazy="true"
            :src="picture.url"
            fit="cover"
          />
        </div>
      </div>

      <div
      ref="loadingRef"
        class="loading"
        v-show="total != 0 && total > pictures.length"
        v-loading="true"
      ></div>
      <!-- <div class="more" v-show="pictures.length<params.total">
        <el-button @click="getData" link><span>查看更多</span></el-button>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/layout/header/index.vue";
import { onMounted,onBeforeMount,onUnmounted, reactive, ref  } from "vue";
import { getQueryString } from "@/utils/stringUtils";
import {getPicturePage} from "@/api/picture"
import { getAlbum } from "@/api/album"
defineOptions({
  name: 'AlbumDetail'
})
const pictures = reactive<any>([]);
const pictureList: any = reactive([]);
const album = ref({});
const params = reactive<any>({
  albumId: 0,
  page: 1,
  limit: 25,
});
const total=ref(0)
const loading = ref(false);
const getAlbumInfo = () => {
  getAlbum(params.albumId).then((data: any) => {
    album.value = data;
  });
};
const getData = () => {
  if (loading.value) {
    return;
  }
  loading.value = true;
  getPicturePage(params)
    .then((data: any) => {
      total.value = data.total;
      data.list.forEach((e: any) => {
        pictures.push(e);
        pictureList.push(e.url);
      });
      params.page++;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};
onBeforeMount(() => {
  let id = getQueryString("error~");
  if (id != "") {
    params.albumId = id;
    getAlbumInfo()
    getData();
  }
});
let myObserver: IntersectionObserver | null = null
const loadingRef = ref()
onMounted(() => {
  //回调函数
  const callback = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      // 当目标元素进入视窗时
      if (entry.isIntersecting) {
        console.log('目标元素进入视窗！')
        getData()
      } else {
        // 当目标元素离开视窗时
        console.log('目标元素离开视窗！')
      }
    })
  }
  //配置对象
  const options = {}
  myObserver = new IntersectionObserver(callback, options)
  //获取目标元素
  //开始监听目标元素
  myObserver.observe(loadingRef.value)
})
onUnmounted(() => {
  if (myObserver) {
    myObserver.disconnect()
  }
})
</script>

<style lang="scss" scoped>
.album-detail {
  .info{
    .date{
      margin-top: 1.5rem;
      .time{
        margin: 0.5rem 0;
      }
    }
    .description{
      letter-spacing: 0.1rem;
      line-height: 120%;
      margin-top: 1rem;
      font-size: 1.4rem;

    }
  }
  .content {
    padding: 1rem;
    .pictures {
      display: grid;
      .picture {
        position: relative;
        padding-bottom: 100%;
        .el-image {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
    .more {
      margin-top: 0.5rem;
      text-align: center;
      span {
        padding: 0.5rem 1rem;
        font-size: 1.8rem;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .album-detail {
    .content {
      .pictures {
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 0.2rem;
        grid-row-gap: 0.2rem;
        .picture {
        }
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .album-detail {
    .content {
      .pictures {
        padding: 0 2rem;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 0.3rem;
        grid-row-gap: 0.3rem;
        .picture {
        }
      }
    }
  }
}
@media screen and (min-width: 992px) {
  .album-detail {
    .content {
      .pictures {
        padding: 0 3rem;
        grid-template-columns: repeat(6, 1fr);
        grid-column-gap: 0.5rem;
        grid-row-gap: 0.5rem;
        .picture {
        }
      }
    }
  }
}
</style>
