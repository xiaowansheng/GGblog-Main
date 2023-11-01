<template>
  <div class="brief">
    <div class="cover">
      <!-- <router-link :to="'/article/' + article.id">
        <el-image
          class="image"
          src="https://img0.baidu.com/it/u=3814670115,1077153406&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
          fit="cover"
      /></router-link> -->
      <!-- <el-image
        class="image"
        fit="scale-down"
        src='https://img1.baidu.com/it/u=4032766505,1918739454&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=844'
      /> -->
      <router-link :to="'/article/detail/' + article.id">
        <el-tag class="top" v-if="article.top">{{ $t('home.top') }}</el-tag>
        <el-image class="image" fit="cover" :src="article.cover">
          <template #error>
            <div class="image-slot"><span>Image Loading Error</span></div>
          </template>
        </el-image>
      </router-link>
    </div>
    <div class="content">
      <router-link :to="'/article/detail/' + article.id">
        <h2 class="title">
          <span>{{ article.title }}</span>
        </h2></router-link
      >

      <!-- <el-button link></el-button> -->
      <div class="other">
        <div>
          <span class="iconfont icon-riqi">
            <span>{{ '' + article.updateTime }}</span></span
          >
        </div>
        <div class="mark">
          <router-link
            v-if="article.categoryDto"
            :to="'/article/category/query/' + article.categoryDto.id"
          >
            <el-tag class="category">{{ article.categoryDto.name }}</el-tag>
          </router-link>
          <span v-if="article.tagDtos && article.tagDtos.length != 0">
            <router-link
              v-for="tag in article.tagDtos"
              :key="tag.id"
              :to="'/article/tag/query/' + tag.id"
            >
              <el-tag class="tag" type="success">{{ tag.name }}</el-tag></router-link
            >
          </span>
        </div>
      </div>
      <div class="introduction">
        <router-link :to="'/article/detail/' + article.id">
          <p class="p">{{ str }}</p></router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'

// import Vditor from 'vditor'
// import { t } from '@/plugins/i18s'
import { mdConvertToHtml } from '@/utils/markdown';
defineOptions({
  name: 'BriefArticle'
})
const props = defineProps({
  article: {
    type:Object,
    required:true
  }
})
const { article } = toRefs(props)
const str = ref<string>(article.value.content)
// console.log(article);
str.value=mdConvertToHtml(str.value)
let parser = new DOMParser();
let domElement:Document = parser.parseFromString(str.value, 'text/html');
str.value=domElement.body.innerText
//去除md标签
// Vditor.md2html(article.value.content)
//   .then((mdStr) => {
//     str.value = mdStr
//       .replace(/<\/?[^>]*>/g, ' ')
//       .replace(/[|]*\n/, ' ')
//       .replace(/&npsp;/gi, ' ')
//   })
//   .catch((error) => {
//     console.log(error)
//   })
</script>

<style lang="scss" scoped>
.brief {
  width: 100%;
  background-color: white;
  border-radius: 1.5rem;
  color: rgb(108, 97, 97);
  overflow: hidden;
  .cover {
    position: relative;
    .top {
      position: absolute;
      left: 0.6rem;
      top: 0.6rem;
      z-index: 10;
      border-radius: 1rem;
    }
    .image {
      height: 100%;
    }
    .image-slot {
      font-size: 2rem;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: var(--el-fill-color-light);
      color: var(--el-text-color-secondary);
    }
  }
  .content {
    .iconfont {
      font-size: 1rem;
      margin-right: 0.6rem;
      span {
        padding-left: 0.15rem !important;
      }
    }
    .title {
      color: rgb(75, 97, 107);
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /*显示行数*/
    }
    .title:hover {
      color: rgb(133, 181, 201);
    }
    .title:active {
      color: rgb(80, 122, 142);
    }
    .other > div:not(:first-of-type) {
      margin-top: 0.3rem;
    }
    .other {
      .mark {
        .el-tag {
          margin: 0.25rem 0.3rem 0 0;
        }
      }
    }
    .introduction {
      // margin-top: 0.8rem;
      .p {
        margin: 0;
        color: rgb(143, 141, 141);
      }
    }
  }
}
.brief:hover {
  .content {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
@media screen and (min-width: 768px) {
  .brief {
    display: flex;
    height: 10.8 * 1.8rem;
    .cover {
      // text-align: center;
      // width: 40%;
      overflow: hidden;
      .image {
        // width: 100%;
        // width: 19.2 * 1.8rem;
        text-align: center;
        // width: 95%;
        // height: 95%;
        // border-radius: 1.5rem;
        border-top-left-radius: 1.5rem;
        border-bottom-left-radius: 1.5rem;
      }
    }

    .content {
      // width: 60%;
      // text-overflow: ellipsis;
      padding: 1rem 2.5rem 1rem 2.5rem;
      overflow: hidden;
      .title {
        margin: 0rem 0;
        padding: 1rem 1rem;
        font-size: 1.8rem;
        // text-align: center;
      }
      .introduction {
        margin-top: 0.5rem;
        font-size: 1.2rem;
        letter-spacing: 0.05rem;
        line-height: 120%;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4; /*显示行数*/
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .brief {
    .cover {
      width: 50%;
      .image {
        width: 100%;
      }
    }
    .content {
      width: 50%;
    }
  }
}
@media screen and (min-width: 992px) {
  .brief {
    .cover {
      width: 40%;
      .image {
        width: 100%;
      }
    }
    .content {
      width: 60%;
    }
  }
}
@media screen and (max-width: 768px) {
  .brief {
    .cover {
      height: 10.8 * 1.5rem;
      .image {
        width: 100%;
        // border-radius: 1.5rem;

        border-top-left-radius: 1.5rem;
        border-top-right-radius: 1.5rem;
      }
    }

    .content {
      padding: 0 2rem 1rem 2rem;
      .title {
        font-size: 1.8rem;
        // text-align: center;
        padding: 1rem 0.5rem;
      }
      .introduction {
        margin-top: 0.8rem;
        letter-spacing: 0.1rem;
        line-height: 120%;
        font-size: 1.3rem;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /*显示行数*/
      }
    }
  }
}
.dark {
  .brief {
    background-color: black;
  }
}
</style>
<style lang="scss">
.brief {
  .cover {
    .image {
      img {
        transition: 0.3s;
      }
    }
  }
}
.brief:hover {
  img {
    transform: scale(1.2);
  }
}
</style>
