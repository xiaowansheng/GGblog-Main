<template>
  <div class="conmment-section">
    <div class="title">
      <span>
        {{ t('comment.section.commentSection') }}
      </span>
    </div>
    <div class="tip" v-if="!loading && empty">
      <el-empty description="Empty~" :image-size="200" />
    </div>
    <div class="loading" v-loading="loading" v-show="loading"></div>
    <div class="comments">
      <CommentItem
        :show="show"
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id"
        @show="showReply"
        :rootId="comment.id"
        @add="addComment"
        :userInfo="userInfo"
      >
        <template #comment v-if="comment.children">
          <div
            class="child"
            v-for="(child, index) in comment.children.slice(0, comment.showNumber)"
            :key="child.id"
            v-show="index <= comment.showNumber - 1"
          >
            <CommentItem
              :show="show"
              :comment="child"
              @show="showReply"
              :rootId="comment.id"
              :comments="comment.children"
              v-if="index <= comment.showNumber"
              @add="addComment"
              :userInfo="userInfo"
            />
          </div>
          <div class="more" v-show="comment.children.length > comment.showNumber">
            <el-button link @click="showReplyNumber(comment)"
              ><span>{{ t('comment.section.more') }}</span></el-button
            >
          </div>
        </template>
      </CommentItem>
    </div>
    <!-- <div class="more" v-show="params.total > comments.length">
      <el-button @click="getData" link><span>查看更多评论</span></el-button>
    </div> -->
    <div ref="loadingRef" class="loading" v-show="loading" v-loading="true"></div>
    <!-- <div class="item" v-for="number in [1, 2, 3, 4, 5]" :key="number"> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, onUnmounted, reactive, ref, toRefs, watch } from 'vue'

// import { useI18n } from "vue-i18n";
import { ElMessage } from 'element-plus'
// import { service } from "utils/axios";
import CommentForm from '../commentForm/index.vue'
import CommentItem from './commentItem.vue'

import { userType } from '@/types/userType'
import { useConfigStoreHook } from '@/store/modules/config'
import { useUserStoreHook } from '@/store/modules/user'
import { useModuleStoreHook } from '@/store/modules/module'
import { t } from '@/plugins/i18s'
import { getCommentPage } from '@/api/comment'
defineOptions({
  name: 'CommentSection'
})
// const emits = defineEmits(['show', 'add'])
const props = defineProps({
  topicType: {
    type: String,
    required: true
  },
  topicId: {
    type: Number,
    required: true
  },
  userInfo: {
    type: Object,
    required: true
  }
})

const privacy = computed(() => {
  return useConfigStoreHook().privacy
})
// const comments = props.comments;
const { topicType, topicId, userInfo } = toRefs(props)
const comments: any = reactive([])
const params = reactive({
  topicType: topicType.value,
  topicId: topicId.value,
  page: 1,
  limit: 5,
})
const total=ref(0)

const loading = ref(false)
const empty = ref(false)
const getData = () => {
  if (loading.value) {
    return
  }
  loading.value = true
  // console.log("commentParam:", topicType.value);
  // console.log("commentParam:", topicId.value);
  // params.topicType = topicType.value
  // params.topicId = topicId.value
  // console.log("params:", other);
  getCommentPage(params)
    .then((data: any) => {
      if (data.total == 0) {
        empty.value = true
      }
      data.list.forEach((e: any) => {
        e.showNumber = 2
        comments.push(e)
      })
      total.value = data.total
      params.page++
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
// const unwatch = watch(topicId, (value: any) => {
//   if (value != null && value != undefined && value > 0) {
//     getData()
//     unwatch()
//   }
// })
const show: any = ref(-1)
const showReply = (id: number) => {
  // console.log("show:", id);
  show.value = id
}
// const showMoreNumber = ref(2)
const showReplyNumber = (parent: any) => {
  let number = parent.showNumber + 5
  if (number > parent.children.length) {
    parent.showNumber = parent.children.length
  } else {
    parent.showNumber = number
  }
}
const addComment = (comment: any) => {
  console.log('addComment-section1')

  if (comment.parentId == 0) {
    comment.showNumber = 0
    comments.unshift(comment)
  } else {
    // console.log("comments", comments);
    comments.forEach((e: any) => {
      // console.log("e.id:", e.id, "comment.rootid:", comment.rootId);
      if (e.children == undefined || e.children == null) {
        e.children = []
      }
      if (e.id == comment.rootId) {
        e.children.unshift(comment)
        e.showNumber++
      }
    })
  }
  show.value = -1
  empty.value = false
}

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  addComment
})
onBeforeMount(() => {
  getData()
})
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
.conmment-section {
  margin-top: 3rem;
  .title {
    span {
      font-size: 2.2rem;
      font-weight: bold;
      border-bottom: 5px rgb(175, 218, 231) solid;
    }
  }
  .loading {
    height: 10rem;
  }
  .comments > div {
    margin-top: 2rem;
  }
  .more {
    text-align: center;
    span {
      font-size: 1.5rem;
      padding: 0.5rem 1rem;
    }
  }
}
</style>
<style lang="scss">
.conmment-section {
  //   .reply {
  //     .text {
  //       border: 0;
  //       border-radius: 0;
  //     }
  //   }
  .comments {
    .conmment-item {
      .conmment-item {
        border: 0;
      }
      .child:not(:first-of-type) {
        margin-top: 1rem;
      }
    }
    .more {
      text-align: center;
      span {
        font-size: 1.5rem;
        padding: 0.5rem 1rem;
      }
    }
  }
}
</style>
