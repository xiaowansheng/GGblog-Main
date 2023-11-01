<template>
  <div class="album">
    <Header :cover="covers.Album">
      <template #title>
        {{ $t("menu.album") }}
      </template>
    </Header>

    <div class="content">
      <div class="albums">
        <router-link
          v-for="album in albums"
          :key="album.id"
          :to="`/album/detail/${album.id}?album_name=${album.name}`"
        >
          <div class="album-item">
            <div class="img" :style="`background-image:url(${album.cover})`">
              <!-- <el-image
            :src="'https://wbxnl-blog.oss-cn-chengdu.aliyuncs.com/images/233443Tpprj.jpg'"
            fit="cover"
          /> -->
            </div>
            <div class="info">
              <div class="title">{{ album.name }}</div>
              <div class="introduction">{{ album.description }}</div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="empty" v-if="!loading&&albums.length == 0">
        <el-empty description="Empty~" />
      </div>
      <div class="loading" v-show="loading" v-loading='loading' ></div>
      <!-- <div class="more" v-show="albums.length < params.total">
        <el-button @click="getData" link><span>查看更多</span></el-button>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/layout/header/index.vue";
import { computed, onMounted, reactive, ref } from "vue";
// import { useStore } from "vuex";
import {useConfigStoreHook} from "@/store/modules/config"
import { getAlbumPage } from "@/api/album"
defineOptions({
  name: 'Album'
})
const covers = computed(() => {
  return useConfigStoreHook().covers
});
const albums: any = reactive([]);
const empty = ref(false);
const params = reactive({
  page: 1,
  limit: 9,
});
const total=ref(0)
const loading = ref(false);
const getData = () => {
  if (loading.value) {
    return;
  }
  loading.value = true;
  getAlbumPage(params)
    .then((data: any) => {
      total.value = data.total;
      data.list.forEach((e: any) => {
        albums.push(e);
      });
      params.page++;
      if (total.value == 0) {
        empty.value = true;
      } else {
        empty.value = false;
      }
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};
onMounted(() => {
  getData();
  window.onscroll = function () {
    const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
    const scrollT =
      document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
    const screenH = window.screen.height; // 屏幕可视高度
    if (scrollH - scrollT - screenH < 5) {
      // 5 只是一个相对值，可以让页面再接近底面的时候就开始请求
      // 执行请求
      if (total.value > albums.length) {
        getData();
      }
    }
  };
});
</script>

<style lang="scss" scoped>
.album {
  .content {
    margin: 0 auto;
    padding: 1rem 1rem;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1.5rem;
    // background-color: red;
    .albums {
      // background-color: bisque;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      // grid-column-gap: 2.2rem;
      // grid-row-gap: 2.2rem;

      .album-item {
        position: relative;
        border-radius: 1.5rem;
        overflow: hidden;
        .img {
          height: 20rem;
          background-size: cover;
          background-position: center;
        }
      }
      .info {
        // width: 100%;
        // background-color: red;
        color: white;
        position: absolute;
        padding: 0 1.5rem;
        top: 2rem;
        .title {
          font-size: 2.2rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /*显示行数*/
        }
        .introduction {
          font-size: 1.5rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; /*显示行数*/
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
  .album {
    .content {
      width: 96%;
      .albums {
        grid-template-columns: repeat(1, 1fr);
        // grid-column-gap: 1rem;
        grid-row-gap: 1rem;
        .album-item {
        }
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .album {
    .content {
      width: 95%;
      .albums {
        padding: 1rem 1rem;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 2rem;
        grid-row-gap: 2rem;
      }
    }
  }
}
@media screen and (min-width: 992px) {
  .album {
    .content {
      width: 95%;
      .albums {
        padding: 1rem 2rem;

        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 2rem;
        grid-row-gap: 2rem;
      }
    }
  }
}
</style>
<style lang="scss">
.album {
  .albums {
    .img {
      filter: brightness(85%);
    }
    .img:hover {
      filter: brightness(80%);
    }
    .img:active {
      filter: brightness(75%);
    }
  }
}
</style>
