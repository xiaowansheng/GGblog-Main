<template>
  <div class="conmment-section">
    <div class="title">
      <span>
        {{ t('comment.section.commentSection') }}
      </span>
    </div>
    <div class="tip" v-if="!loading&&empty">
      <el-empty description="Empty~" :image-size="200" />
    </div>
    <div
      class="loading"
      v-loading="loading"
      v-show="loading"
    ></div>
    <div class="comments">
      <CommentItem
        :show="show"
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id"
        @show="showReply"
        :rootId="comment.id"
        @addComment="addComment"
        :userInfo="userInfo"
      >
        <template
          #comment
          v-if="comment.children && privacy.MultipleLayerComment"
        >
          <div
            class="child"
            v-for="(child, index) in comment.children.slice(
              0,
              comment.showNumber
            )"
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
              @addComment="addComment"
              :userInfo="userInfo"
            />
          </div>
          <div
            class="more"
            v-show="comment.children.length > comment.showNumber"
          >
            <el-button link @click="showReplyNumber(comment)"
              ><span>{{ t("comment.section.more")}}</span></el-button
            >
          </div>
        </template>
      </CommentItem>
    </div>
    <!-- <div class="more" v-show="params.total > comments.length">
      <el-button @click="getData" link><span>查看更多评论</span></el-button>
    </div> -->
    <div class="loading" v-show="loading" v-loading='loading'></div>
    <!-- <div class="item" v-for="number in [1, 2, 3, 4, 5]" :key="number"> -->
  </div>
</template>

<script lang='ts'>
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue-demi";

import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { service } from "utils/axios";
import CommentForm from "../commentForm/index";
import CommentItem from "./commentItem.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "CommentSection",
  props: ["topicType", "topicId", "userInfo"],
  setup(props) {
    const {t}=useI18n()
    const store = useStore();

    const privacy = computed(() => {
      return store.state.config.privacy;
    });
    // const comments = props.comments;
    const { topicType, topicId, userInfo } = toRefs(props);
    const comments: any = reactive([]);
    const params = reactive({
      topicType: null,
      topicId: null,
      page: 1,
      limit: 5,
      total: 0,
    });

    const loading = ref(false);
    const empty = ref(false);
    const getData = () => {
      if(loading.value){
        return
      }
      loading.value = true;
      // console.log("commentParam:", topicType.value);
      // console.log("commentParam:", topicId.value);
      params.topicType = topicType.value;
      params.topicId = topicId.value;
      const { total, ...other } = params;
      // console.log("params:", other);
      service
        .get("/comment/info/page", { params: other })
        .then((data: any) => {
          if (data.total == 0) {
            empty.value = true;
          }
          data.list.forEach((e: any) => {
            e.showNumber = 2;
            comments.push(e);
          });
          params.total = data.total;
          params.page++;
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    };
    const unwatch = watch(topicId, (value: any, preValue: any) => {
      if (value != null && value != undefined && value != 0) {
        getData();
        unwatch();
      }
    });
    const show: any = ref(-1);
    return {
      t,
      privacy,
      getData,
      comments,
      userInfo,
      show,
      params,
      loading,
      empty,
      showReply(id: number) {
        // console.log("show:", id);
        show.value = id;
      },
      showMoreNumber: ref(2),
      showReplyNumber: (parent: any) => {
        let number = parent.showNumber + 5;
        if (number > parent.children.length) {
          parent.showNumber = parent.children.length;
        } else {
          parent.showNumber = number;
        }
      },
      addComment: (comment: any) => {
        if (comment.parentId == 0) {
          comment.showNumber = 0;
          comments.unshift(comment);
        } else {
          // console.log("comments", comments);
          comments.forEach((e: any) => {
            // console.log("e.id:", e.id, "comment.rootid:", comment.rootId);
            if (e.children == undefined || e.children == null) {
              e.children = [];
            }
            if (e.id == comment.rootId) {
              e.children.unshift(comment);
              e.showNumber++;
            }
          });
        }
        show.value = -1;
        empty.value = false;
      },
    };
  },
  mounted() {
    if (this.topicId == 0) {
      //如果没有ID则直接查询整个模块
      this.getData();
      // console.log("this.topicId",this.topicId)
    }
    window.onscroll =  ()=> {
      const scrollH = document.documentElement.scrollHeight; // 文档的完整高度
      const scrollT =
        document.documentElement.scrollTop || document.body.scrollTop; // 当前滚动条的垂直偏移
      const screenH = window.screen.height; // 屏幕可视高度
      if (scrollH - scrollT - screenH < 5) {
        // 5 只是一个相对值，可以让页面再接近底面的时候就开始请求
        // 执行请求
        if (this.params.total > this.comments.length) {
          this.getData();
        }
      }
    };
  },
});
</script>

<style lang="less" scoped>
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
 <style lang="less">
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