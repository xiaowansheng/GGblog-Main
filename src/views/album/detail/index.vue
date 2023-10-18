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
        class="loading"
        v-show="params.total != 0 && params.total > pictures.length"
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
import { onMounted, reactive, ref } from "vue";
import { getQueryString } from "@/utils/stringUtils";
import {getPicturePage} from "@/api/picture"
import {getAlbum} from "@/api/album"
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
onMounted(() => {
  let id = getQueryString("error~");
  if (id != "") {
    params.albumId = id;
    getAlbumInfo()
    getData();
  }
  window.onscroll = function () {
    const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
    const scrollT =
      document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
    const screenH = window.screen.height; // 屏幕可视高度
    if (scrollH - scrollT - screenH < 5) {
      // 5 只是一个相对值，可以让页面再接近底面的时候就开始请求
      // 执行请求
      if (total.value > pictures.length) {
        getData();
      }
    }
  };
});
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
