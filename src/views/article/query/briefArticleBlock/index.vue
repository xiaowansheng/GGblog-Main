<template>
  <div class="articleBlock">
    <div class="article">
      <div class="cover">
        <router-link :to="'/article/detail/' + article.id">
          <el-image class="image" :src="article.cover" fit="cover" />
        </router-link>
        <h2>
          <router-link class="title" :to="'/article/detail/' + article.id">
            {{ article.title }}
          </router-link>
        </h2>
      </div>
      <div class="content">
        <!-- <h2 class="title">{{ article.title }}</h2> -->
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
        <div class="brief">
          {{ article.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
defineOptions({
  name: 'BriefArticleBlock'
})
const pros = defineProps({
  article: {
    type:Object,
    required:true
  }
})

</script>

<style lang="scss" scoped>
.articleBlock {
  border-radius: 15px;
  overflow: hidden;
  // border: 2px rgb(58, 172, 225) solid;
  background-color: white;
  // padding: 0;
  // margin: 1rem 0;
  .article {
    .cover {
      position: relative;
      .el-image {
        width: 100%;
        height: 18rem;
        filter: brightness(80%);
      }
      h2 {
        // padding: 0;
        margin: 0 1rem;
        // writing-mode: horizontal-tb;
        font-size: 1.8rem;
        position: absolute;
        bottom: 1rem;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /*显示行数*/
        .title {
          color: rgb(255, 255, 255);
        }
      }
    }
    .content {
      padding: 0rem 1rem 1rem 1rem;
      .mark {
        padding: 0.3rem 0;
        .el-tag {
          font-size: 1.3rem;
          margin: 0.2rem 0.2rem;
        }
      }
      .brief {
        font-size: 1.3rem;
        line-height: 1.75rem;
        letter-spacing: 0.01rem;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /*显示行数*/
      }
    }
  }
}
// @media screen and (min-width: 1000px) {
//   .articleBlock {
//     padding: 0;
//     margin: 1rem 0;
//     .article {
//       // border: 2px red solid;
//       .cover {
//         position: relative;
//         h2 {
//           // background-color: rgba(255, 255, 255, 0.2);
//           padding: 0;
//           margin: 0 1rem;
//           // writing-mode: horizontal-tb;
//           font-size: 1.8rem;
//           position: absolute;
//           bottom: 1rem;
//           text-overflow: ellipsis;
//           overflow: hidden;
//           display: -webkit-box;
//           -webkit-box-orient: vertical;
//           -webkit-line-clamp: 2; /*显示行数*/

//         }
//       }
//       .content {
//         h2 {
//           display: none;
//         }
//       }
//     }
//   }
// }
// @media screen and (max-width: 1000px) {
//   .articleBlock {
//     padding: 0;
//     margin: 1rem 0;
//     .article {
//       // border: 2px red solid;
//       .cover {
//         position: relative;
//         h2 {
//           // background-color: rgba(255, 255, 255, 0.2);
//           padding: 0;
//           margin: 0 1rem;
//           // writing-mode: horizontal-tb;
//           font-size: 1.8rem;
//           position: absolute;
//           bottom: 1rem;
//           text-overflow: ellipsis;
//           overflow: hidden;
//           display: -webkit-box;
//           -webkit-box-orient: vertical;
//           -webkit-line-clamp: 2; /*显示行数*/

//         }
//       }
//       // .content {
//       //   h2 {
//       //     display: none;
//       //   }
//       // }
//     }
//   }
// }
.dark {
  .articleBlock {
    background-color: rgb(13, 28, 30) !important;
  }
}
</style>
<style lang="scss">
.articleBlock {
  img {
    transition: 0.3s;
  }
}

.articleBlock:hover {
  box-shadow: -2px 0 2px 2px rgba(149, 226, 228, 0.5), 0px -2px 2px 2px rgba(149, 226, 228, 0.5),
    2px 0 2px 2px rgba(149, 226, 228, 0.5), 0 2px 2px 2px rgba(149, 226, 228, 0.5);
  img {
    transform: scale(1.2);
  }
  background-color: rgb(234, 241, 244);
}
</style>
