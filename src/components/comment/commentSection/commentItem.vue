<template>
  <div class="conmment-item">
    <!-- <div class="item" v-for="number in [1, 2, 3, 4, 5]" :key="number"> -->
    <div class="comment">
      <div class="head">
        <div class="comment-title">
          <div class="avatar">
            <el-popover placement="bottom-start" :title="getName()" :width="200" trigger="hover">
              <template #reference>
                <el-avatar :size="50" :src="url" />
              </template>
              <div class="user-brief-pop" v-if="comment.type == userType.loginUser">
                <!-- <p>{{comment.infoEmail}}</p> -->
                <p>
                  <span>{{ $t('comment.section.profile') }}：</span>
                  {{ comment.introduction }}
                </p>
                <p class="website" v-show="comment.infoWebsite">
                  <a @click="toWebsite" href="javascript:;" target="_blank">{{
                    $t('comment.section.home')
                  }}</a>
                </p>
              </div>
            </el-popover>
          </div>
          <div class="info">
            <div class="name">
              <span class="nickname">{{ getName() }}</span
              ><el-tag
                :class="
                  comment.roleLabel
                    ? comment.roleLabel == 'admin'
                      ? 'admin'
                      : comment.roleLabel == 'test'
                      ? 'test'
                      : 'user'
                    : comment.type == 2
                    ? 'visitor'
                    : comment.type == 3
                    ? 'annonymous'
                    : 'none'
                "
                >{{
                  comment.roleLabel
                    ? comment.roleLabel == 'admin'
                      ? $t('comment.section.author')
                      : comment.roleLabel == 'test'
                      ? $t('comment.section.test')
                      : $t('comment.section.user')
                    : comment.type == 2
                    ? $t('comment.section.visitor')
                    : comment.type == 3
                    ? $t('comment.section.anonymous')
                    : $t('comment.section.unknown')
                }}</el-tag
              >
            </div>

            <div class="parent_name" v-if="parent_name != undefined && parent_name != ''">
              <span> {{ $t('comment.reply') }} @{{ parent_name }}</span>
            </div>
            <div class="date">{{ comment.createTime }}</div>
          </div>
        </div>
        <div class="reply-btn">
          <el-button v-show="show != comment.id" link @click="showItem(comment.id)"
            ><span>{{ $t('comment.section.reply') }}</span></el-button
          >
          <el-button v-show="show == comment.id" link @click="showItem(-1)"
            ><span>{{ $t('comment.section.close') }}</span></el-button
          >
        </div>
      </div>
      <div class="content">
        {{ comment.content }}
      </div>
      <div class="bottom" v-if="privacy.Device || privacy.Browser || privacy.Address">
        <div class="address" v-if="privacy.Address">
          <el-tag>
            <span>{{ comment.ipSource }}</span>
          </el-tag>
        </div>
        <div class="from">
          <div v-if="privacy.Browser" class="browser">
            {{ comment.browser }}
          </div>
          <div v-if="privacy.Device" class="device">{{ comment.device }}</div>
        </div>
      </div>
    </div>
    <div class="reply" v-show="show == comment.id">
      <div class="divided"></div>
      <!-- TODO 未登录状态 -->
      <CommentForm
        :topicType="comment.topicType"
        :topicId="comment.topicId"
        :to="parentName"
        :rootId="rootId"
        :parentId="comment.id"
        @add="addComment"
        :userInfo="userInfo"
      />
    </div>
    <div class="relate-comment">
      <slot name="comment"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, toRefs } from 'vue'
import CommentForm from '../commentForm/index.vue'

import { userType } from '@/types/userType'
import { useConfigStoreHook } from '@/store/modules/config'
import { useUserStoreHook } from '@/store/modules/user'
import { useModuleStoreHook } from '@/store/modules/module'
defineOptions({
  name: 'CommentItem'
})
import { t } from '@/plugins/i18s'
const emits = defineEmits(['show', 'add'])
const props = defineProps({
  // props: ["comment", "show", "rootId", "userInfo", "comments"],
  comment: {
    type: Object,
    required: true
  },
  show: {
    type: Number,
    required: true
  },
  userInfo: {
    type: Object,
    required: true
  },
  rootId: {
    type: Number,
    required: true
  },
  comments: {
    type: Object,
    required: false
  }
})
const privacy = computed(() => {
  return useConfigStoreHook().privacy
})
// const avatar: any = computed(() => {
//   return store.state.config.avatar;
// });
const url = computed(() => {
  let avatars = useConfigStoreHook().avatar
  // return store.state.config.avatar;
  if (comment.value.type == userType.loginUser) {
    return comment.value.infoAvatar ? comment.value.infoAvatar : avatars.User
  } else if (comment.value.type == userType.visitor) {
    return avatars.Visitor
  } else {
    return avatars.Anonymous
  }
})
const { userInfo, show, comment, rootId } = toRefs(props)
const comments = props.comments
// console.log("rootId", props.rootId);
// const show: any = ref(-1);
const parent_name = ref('')
const findParent = () => {
  if (!comments) {
    return
  }
  comments.forEach((e: any) => {
    if (e.id == comment.value.parentId) {
      // console.log("name:", e.nickname);
      parent_name.value =
        e.type == userType.loginUser
          ? e.infoName
          : e.type == userType.visitor
          ? e.nickname
          : `【${t('comment.section.anonymous')}】`
    }
  })
}

const getName = () => {
  if (comment.value.type == userType.loginUser) {
    return comment.value.infoName
  }
  if (comment.value.type == userType.visitor) {
    return comment.value.nickname
  }
  if (comment.value.type == 3) {
    return t('comment.section.anonymous')
  } else {
    return t('comment.section.unknown')
  }
}
const parentName = computed(() => {
  let value = comment.value
  switch (value.type) {
    case userType.loginUser:
      return value.infoName
    case userType.visitor:
      return value.nickname
    case userType.annoymous:
      return t('comment.section.anonymous')
    default:
      return t('comment.section.unknown')
  }
})
const showItem = (id: number) => {
  emits('show', id)
}
const addComment = (comment: any) => {
  emits('add', comment)
}
const toWebsite = () => {
  let website = comment.value.infoWebsite
  if (website) {
    let reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
    if (reg.test(website)) {
      window.open(website)
    } else {
      window.open(`http://${website}`)
    }
  }

  return false
}

onBeforeMount(() => {
  findParent()
})
</script>

<style lang="scss" scoped>
.conmment-item {
  background-color: rgba(227, 240, 239, 0.5);
  border: 1px solid rgb(149, 216, 227);
  border-radius: 1.5rem;
  .comment {
    padding: 1rem;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .comment-title {
        display: flex;
        // align-items: center;

        .info {
          padding: 0.5rem 1rem;
          display: flex;
          flex-direction: column;
          // justify-content: center;
          justify-content: space-between;
          .name {
            font-size: 1.3rem;
            letter-spacing: 0.05rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            // padding: 0.2rem 0;
            // .el-tag{
            //   background-color: black;
            // }
            .nickname {
              margin-right: 0.5rem;
            }
            .admin {
              background-color: rgb(235, 200, 125);
            }
            .test {
              background-color: rgb(130, 235, 177);
            }
            .user {
              background-color: rgb(139, 210, 231);
            }
            .visitor {
              background-color: rgb(147, 217, 221);
            }
            .anonymous {
              background-color: rgb(217, 193, 223);
            }
            .none {
              background-color: rgb(237, 185, 212);
            }
          }
          .parent_name {
            font-size: 1.2rem;
          }
        }
      }
      .reply-btn {
        span {
          font-size: 1.3rem;
        }
      }
    }

    .content {
      margin-top: 0.5rem;
      font-size: 1.5rem;
      line-height: 130%;
      letter-spacing: 0.05rem;
    }
    .bottom {
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .address {
        font-size: 1.2rem;
        // color: rgb(66, 73, 73);
      }
      .from {
        text-align: right;
      }
    }
  }
  .reply {
    margin-top: 1rem;
    .divided {
      border-top: 5px solid rgb(149, 216, 227);
    }
  }
}

@media screen and (max-width: 768px) {
  .conmment-item {
    .relate-comment {
      padding-left: 2rem;
    }
  }
}
@media screen and (min-width: 768px) {
  .conmment-item {
    .relate-comment {
      padding-left: 5rem;
    }
  }
}
.dark {
  .conmment-item {
    background-color: rgba(65, 70, 70, 0.5);
    border: 1px solid rgb(35, 83, 92);
  }
}
</style>
<style lang="scss">
.user-brief-pop {
  .website {
    text-align: center;
    margin-top: 0.8rem;
  }
}
.conmment-item {
  .reply {
    .text {
      border: 0;
      border-radius: 0;
    }
  }
}
</style>
