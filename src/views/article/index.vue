<template>
  <div class="article">
    <Header :cover="cover">
      <template #title>
        {{ article.title }}
      </template>
      <template #content>
        <div class="other">
          <p class="date">
            <span class="iconfont icon-riqi"></span
            ><span>{{ $t('article.createTime') }} {{ article.createTime }}</span>
          </p>
          <p class="date">
            <span class="iconfont icon-riqi"></span
            ><span>{{ $t('article.updateTime') }} {{ article.updateTime }}</span>
          </p>
          <!-- <p>
            <span class="iconfont icon-fenlei"></span
            ><span class="category">{{
              article.categoryDto == null ? " 暂无" : article.categoryDto.name
            }}</span>
            <span v-for="tag in article.tagDtos" :key="tag.id">
              <span class="iconfont icon-biaoqian"></span>
              <span class="tag">{{
                tag.name == null ? "暂无" : tag.name
              }}</span>
            </span>
          </p> -->
          <p>
            {{ $t('article.numberOfWords') }}: {{ wordNumber }}
            <span class="divided">|</span>
            {{ `${$t('article.commentCount')} : ${commentCount}` }}
            <span class="divided">|</span>
            {{ `${$t('article.pageView')} : ${article.pageView}` }}
            <!-- TODO 待做 -->
            <!--<span class="divided">|</span> {{ "浏览量：2023" }} -->
          </p>
        </div>
      </template>
    </Header>
    <!-- <a href="#copyright">哈哈哈哈哈哈哈</a> -->
    <el-container class="main" v-loading="loading">
      <div class="catalog-mobile">
        <div class="btn">
          <el-button link @click="showCatalog = true">
            <span class="iconfont icon-shejimulu"></span
          ></el-button>
        </div>
        <el-drawer id="catalogDialog" v-model="showCatalog" direction="ltr">
          <template #header>
            <h4 class="title">
              {{ $t('article.directory') }}
            </h4>
          </template>
          <template #default>
            <div>
              <!-- <div>
                {{ "目录" }}
              </div> -->
              <el-tree :data="catalog" :props="defaultProps" @node-click="onCatalogClick">
                <template #default="{ node, data }">
                  <div class="catalog-item">
                    <span class="btn-jump">{{ node.label }}</span>

                    <!-- <a :href="`#${data.id}`">111
                </a> -->
                  </div>
                </template>
              </el-tree>
            </div>
          </template>
        </el-drawer>
      </div>
      <el-aside class="aside">
        <div class="catalog">
          <div class="title">
            {{ $t('article.directory') }}
          </div>
          <el-tree :data="catalog" :props="defaultProps" @node-click="onCatalogClick">
            <template #default="{ node, data }">
              <div class="catalog-item">
                <span class="btn-jump">{{ node.label }}</span>

                <!-- <a :href="`#${data.id}`">111
                </a> -->
              </div>
            </template>
          </el-tree>
        </div>
      </el-aside>
      <!-- <div id="temp"></div> -->
      <el-main class="content">
        <div ref="mdRef" id="markdown" class="md markdown-body cherry-markdown" v-html="html"></div>
        <!-- <div ref="mdRef" id="markdown" class="md markdown-body"></div> -->
        <div class="article-tag">
          <div class="category">
            {{ $t('article.category') }}
            <router-link
              v-show="article.categoryDto"
              :to="`/article/category/query/${article.categoryDto.id}`"
            >
              {{ article.categoryDto == null ? $t('article.unknown') : article.categoryDto.name }}
            </router-link>
          </div>
          <div class="tags">
            <router-link
              class="tag"
              :to="`/article/tag/query/${tag.id}`"
              v-for="tag in article.tagDtos"
              :key="tag.id"
            >
              <el-tag type="success"
                ><span>{{ tag.name }}</span>
              </el-tag>
            </router-link>
          </div>
        </div>
        <!-- TODO 待做 -->
        <!-- <div class="encourage">
          <el-popover
            placement="top"
            :title="'扫码打赏'"
            :width="200"
            trigger="click"
          >
            <div class="img">
              <el-image
                class="QRCode"
                :src="'https://wbxnl-blog.oss-cn-chengdu.aliyuncs.com/images/001457Of5d7.jpg'"
                fit="fill"
              />
            </div>
            <template #reference>
              <el-button link><span>赞赏</span></el-button>
            </template>
          </el-popover>
        </div> -->
        <div class="copyright">
          <p>
            <span class="label">{{ $t('article.author') }} </span>{{ author.nickname }}
          </p>
          <p>
            <span class="label">{{ $t('article.link') }}</span
            ><a :href="href" target="_blank"> {{ href }}</a>
          </p>
          <p>
            <span class="label">{{ $t('article.copyright') }}</span>
            {{ $t('article.use') }}
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
              CC BY-NC-SA 4.0 </a
            >{{ $t('article.protocol') }}{{ $t('article.transit') }}
          </p>
        </div>
        <Comment :topicType="TopicType.article" :topicId="topicId" />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
// import 'github-markdown-css'
import Header from '@/layout/header/index.vue'
import Comment from '@/components/comment/index.vue'

import { TopicType } from '@/enums/topic'
import { getArticle } from '@/api/article'
import { getQueryString } from '@/utils/stringUtils'
import { onMounted, reactive, ref, nextTick, computed } from 'vue'
// import Vditor from "vditor/src/method";
// import "vditor/src/assets/scss";

// import Vditor from 'vditor'
// import { useStore } from 'vuex'
// import { onBeforeRouteLeave } from 'vue-router'
import { ElMessage } from 'element-plus'
import { mdConvertToHtml } from '@/utils/markdown'
import { useConfigStoreHook } from '@/store/modules/config'
import { useModuleStoreHook } from '@/store/modules/module'
defineOptions({
  name: 'Article'
})
const topicId = ref<number>(-1)
const author = computed(() => {
  return useConfigStoreHook().author
})
const dialog = useModuleStoreHook()
const defaultProps = {
  children: 'children',
  label: 'title'
}
const onCatalogClick = (data: Title) => {
  // console.log("单击的节点", data);
  if (data.children && data.children.length != 0) {
    return false
  }
  let id = `#${data.id}`
  // window.location.hash = id;
  //使锚点不产生历史记录
  // window.location.replace(id);
  let node: HTMLElement | null = document.getElementById(data.id)

  if (node) {
    // console.log("node:", node);
    node.scrollIntoView()
    console.log('跳转到ID：', id)
  }
  showCatalog.value = false
}
const commentCount = ref(0)
// const getCommentCount = () => {
//   service
//     .get('/comment/info/count', {
//       params: {
//         topicType: TopicType.article,
//         topicId: topicId.value
//       }
//     })
//     .then((data: any) => {
//       commentCount.value = data
//     })
// }
const article = ref<any>({
  title: '',
  categoryDto: {},
  tagsDto: []
})
const cover = ref('')
const href = window.location.href
const wordNumber = ref(0)
let html = ref('')
const mdRef = ref<HTMLDivElement>()
const catalog: any = ref<Array<Title>>([])
const showCatalog = ref(false)
interface Title {
  id: string
  deep: number
  title: string
  children: Array<Title>
}
const getTitle = () => {
  // let nodes = mdRef.value.children
  let nodes = mdRef.value!.children
  let arr: Array<Title> = []
  // console.log("nodes", nodes);
  let templateH = /[hH][1-3]/
  for (let i = 0; i < nodes.length; i++) {
    let node: HTMLElement = nodes.item(i) as HTMLElement
    let nodeName = node.nodeName
    if (nodeName.match(templateH)) {
      // console.log(nodeName,'000',)
      let numberStr: any = nodeName.match(/[1-3]/)
      let deep = Number.parseInt(numberStr)
      let id = `title${deep}${i}`
      //给标题添加id值
      node.id = id
      // node.name=id
      // let a=document.createElement("a")
      // a.setAttribute('id',id)
      // node.insertAdjacentElement("afterbegin",a)
      // console.log(node)
      // console.log("numberStr", node.innerText);
      arr.push({
        id: id,
        deep: deep,
        title: node.innerText,
        children: []
      })
    }
  }

  let rootDeep = 1,
    maxDeep = 3
  let titles = buildTree(arr, rootDeep, maxDeep)
  catalog.value = titles
  // console.log("标题：", titles);
}
const buildTree = (arr: Array<Title>, rootDeep: number, maxDeep: number) => {
  if (rootDeep > maxDeep) {
    return
  }
  let titles: Array<Title> = []
  let i = -1
  while (++i < arr.length) {
    let temp: Title = arr[i]

    if (i == 0) {
      if (temp.deep != rootDeep) {
        //插入空节点
        titles.push({
          id: '',
          deep: rootDeep,
          title: '[Empty Title ~]',
          children: []
        })
        titles[titles.length - 1].children.push(temp)
        continue
      }
    }
    // console.log("i=", i, ",temp=", temp,',deep=',rootDeep,',arrLength:',arr.length);
    if (temp.deep == rootDeep) {
      titles.push(temp)
    } else {
      titles[titles.length - 1].children.push(temp)
    }
  }
  titles.forEach((e: any) => {
    e.children = buildTree(e.children, rootDeep + 1, maxDeep)
  })
  return titles
}

const loading = ref(true)
const getData = (id: string | number) => {
  dialog.loading++
  loading.value = true
  getArticle(id)
    .then((data: any) => {
      article.value = data
      //TODO 统计字数不精确
      wordNumber.value = data.content.length
      cover.value = data.cover
      window.document.title = data.title
      topicId.value = data.id
      html.value = mdConvertToHtml(data.content)
      nextTick(() => {
        getTitle()
      })
      // let markdownDiv = document.getElementById('markdown')
      // Vditor.preview( mdRef.value,data.content, {
      //   anchor: 1,
      //   hljs: {
      //     enable: true,
      //     lineNumber: true,
      //     style: 'vs'
      //   },
      //   markdown: {
      //     autoSpace: true,
      //     fixTermTypo: true,
      //     paragraphBeginningSpace: true,
      //     listStyle: true,
      //     mark: true
      //   },
      //   // theme:{
      //   //   current:'Dark'
      //   // },
      //   speech: {
      //     enable: true
      //   },
      //   renderers: {
      //     renderHeading: (node:any, entering:any) => {
      //       const id = Lute.GetHeadingID(node)
      //       if (entering) {
      //         return [
      //           `<h${node.__internal_object__.HeadingLevel} id="${id}" class="vditor__heading"><span class="prefix"></span><span>`,
      //           Lute.WalkContinue
      //         ]
      //       } else {
      //         return [
      //           `</span><a id="vditorAnchor-${id}" class="vditor-anchor" href="#${id}"><svg viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a></h${node.__internal_object__.HeadingLevel}>`,
      //           Lute.WalkContinue
      //         ]
      //       }
      //     }
      //   },
      //   after() {
      //     getTitle()
      //   }
      // });
      loading.value = false
      dialog.loading--
    })
    .catch(() => {
      loading.value = false
      dialog.loading--
    })
}
// const articleMd=ref("")
onMounted(() => {
  let id = getQueryString('')
  if (id) {
    topicId.value = Number.parseInt(id)
    getData(id)
  } else {
    ElMessage.error('Error~')
  }
})
// onBeforeRouteLeave((to, from, next) => {
//   // if (from.path == "/home") {
//   //   to.meta.isBack = true;
//   // } else {
//   //   to.meta.isBack = false;
//   // }
//   next();
// });
//TODO 有bug，三次后退会报错
// onBeforeRouteLeave((to,from,next)=>{
//   // if(to.path.indexOf('home')!=-1){
//   //   console.log('path:',to.path)
//   // }else{
//   //   to.meta.keepAlive=false
//   // }
//   // console.log('离开article',to,from)
//     // to.meta.keepAlive=true
//   next()
// })
</script>
<style lang="scss" scoped>
.article {
  .other {
    margin-top: 1rem;
    p {
      // padding: 0;
      margin: 0.5rem 0;
    }
    .category {
      margin-right: 1rem;
    }
    .iconfont {
      padding-right: 0.2rem;
    }
    .divided {
      padding: 0 0.05rem;
      font-weight: bold;
    }
  }
  .main {
    // background-color: red;
    margin: 0 auto;
    .content {
      box-sizing: border-box;
      border-radius: 2rem;

      background-color: rgba(255, 255, 255, 0.8);
      .category {
        a {
          color: rgb(96, 119, 133);
        }
      }
      .article-tag {
        border-top: 2px rgb(122, 214, 228) solid;
        // border-bottom: 2px rgb(122, 214, 228) solid;
        margin-top: 3rem;
        display: flex;

        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        // align-items: center;
        // justify-content: center;
        .category {
          font-size: 1.6rem;
        }
        .tags {
          .tag:not(:last-of-type) {
            margin-right: 1rem;
          }
        }
      }
      .article-tag > div {
        margin: 0.5rem 0;
      }
      .encourage {
        margin: 1rem;
        text-align: center;
        .el-button {
          border: 2px rgb(141, 209, 223) solid;
          padding: 0.5rem 1rem;
          font-size: 2rem;
        }
        // .img{
        //   width: 100%;
        //   padding-bottom: 100%;
        // }
      }
      .copyright {
        margin-top: 1rem;
        padding: 1rem 1.8rem;
        border-radius: 15px;
        font-size: 1.3rem;
        background-color: rgb(240, 244, 245);
        border: 3px;
        border-color: rgb(193, 216, 221);
        border-style: solid;
        p {
          // padding: 0;
          margin: 0.8rem 0;
        }
        .label {
          font-weight: bold;
        }
      }
    }
    .aside {
      overflow: visible !important;
      border-radius: 1.5rem;
    }
    .catalog {
      position: sticky;
      background-color: rgba(255, 255, 255, 0.8);
      top: 5rem;
      .el-tree {
        max-height: 75vh !important;
        overflow: auto;
      }
    }
    .catalog,
    .catalog-mobile {
      border-radius: 1.5rem;
      overflow: hidden;
      .title {
        font-size: 1.8rem;
        padding: 0.8rem 1rem;
      }
      .el-tree {
        padding: 1rem 0;
        background-color: rgba(255, 255, 255, 0);
        .el-icon {
          // display: none;
        }
        .el-tree-node {
          .el-tree-node__content {
            // box-sizing: border-box;
            // padding: 0rem 0;
            // text-align: left;
            // line-height: 150%;
            // display: flex;
            // flex-direction: row-reverse;
            // justify-content: space-between;
          }
        }
        .catalog-item {
          .btn-jump {
            font-size: 1.4rem;
          }
          // line-height: 10rem;
          // color: red;
          padding: 0 0rem;
        }
      }
    }
    .catalog-mobile {
      .el-tree {
      }
      .btn {
        .el-button {
          background-color: rgba(153, 238, 238, 0.8);
          position: fixed;
          z-index: 100;
          left: 5px;
          bottom: 3rem;
          width: 4rem;
          height: 4rem;
          overflow: hidden;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-content: center;
          align-items: center;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .main {
    width: 96%;
    .content {
      padding: 1rem 1rem;
      .md {
      }
    }
    .aside {
      display: none;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .main {
    width: 93%;
    .content {
      // margin-left: 1rem;
      padding: 1rem 1rem;
      .md {
      }
    }
    .aside {
      display: none;
    }
  }
}

@media screen and (min-width: 992px) {
  .main {
    width: 90%;

    display: flex;
    .content {
      margin-left: 1.5rem;
      // TODO 目录暂时先放
      // width: 80%;
      padding: 2rem 3rem;
      .md {
      }
    }
    .aside {
      width: 20%;
    }
    .catalog-mobile {
      display: none;
    }
  }
}
.dark {
  .content {
    background-color: black !important;
    .category {
      a {
        color: rgb(234, 240, 242);
      }
    }
    .copyright {
      background-color: rgb(29, 47, 49) !important;
    }
  }
  .catalog {
    background-color: rgba(0, 0, 0, 0.8) !important;
  }
}
</style>
<style lang="scss">
.article-tag {
  .tags {
    .el-tag {
      font-size: 1.4rem;
    }
  }
}
@media screen and (max-width: 768px) {
  .catalog-mobile {
    #catalogDialog {
      width: 75% !important;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .catalog-mobile {
    #catalogDialog {
      width: 40% !important;
    }
  }
}
</style>
