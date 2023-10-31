<template>
  <div class="comment-form">
    <div class="text">
      <div class="head">
        <div class="title">
          <span class="text-title">{{ $t('comment.comment') }}</span>
          <!-- 暂时不开放登录 -->
          <div
            class="select-user"
            v-show="!user.username && userInfo.type != userType.loginUser"
            v-if="modules.Login || privacy.Visitor || privacy.Anonymous"
          >
            <el-select v-model="userInfo.type" :placeholder="$t('comment.select')">
              <el-option
                v-if="modules.Login"
                :label="$t('comment.user')"
                :value="userType.loginUser"
              />
              <el-option
                v-if="privacy.Visitor"
                :label="$t('comment.visitor')"
                :value="userType.visitor"
              />
              <el-option
                v-if="privacy.Anonymous"
                :label="$t('comment.anonymous')"
                :value="userType.annoymous"
              />
            </el-select>
          </div>
        </div>
      </div>
      <el-form
        class="commentForm"
        ref="commentFormRef"
        :rules="rules"
        label-position="right"
        label-width="5rem"
        :model="commentForm"
      >
        <div v-show="userInfo.type == 2" class="user-info">
          <el-form-item :label="$t('comment.nickname')" prop="nickname">
            <el-input name="nickname" v-model="userInfo.nickname" />
          </el-form-item>
          <el-form-item :label="$t('comment.email')" prop="email">
            <el-input name="email" v-model="userInfo.email" />
          </el-form-item>
          <el-form-item :label="$t('comment.QQ')" prop="qq">
            <el-input name="qq" placeholder="" v-model.number="userInfo.qq" />
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item label="评论内容" prop="content">
            <el-input
              name="content"
              v-model="commentForm.content"
              :rows="3"
              type="textarea"
              :placeholder="to ? `${$t('comment.reply')}：@` + to : $t('comment.commentContent')"
              class="comment-content"
            />
          </el-form-item>
        </div>
        <!-- <el-form-item prop="conetent"> -->
        <!-- <textarea
          name="content"
          v-model="commentForm.content"
          id="comment-content"
          prop="content"
          :placeholder="to ? '回复：@' + to : '请输入评论内容~'"
        ></textarea> -->
        <div class="func">
          <!-- TODO 待做 -->
          <div class="other">
            <!-- TODO 表情包 -->
            <!-- <el-popover
              placement="bottom-start"
              title="表情"
              :width="200"
              trigger="click"
              content="this is content, this is content, this is content"
            >
              <template #reference>
                <el-button type="info">{{$t('comment.emoji')}}</el-button>
              </template>
            </el-popover>
            <el-button type="info">{{$t('comment.picture')}}</el-button> -->
          </div>
          <div class="sent">
            <el-button
              :disabled="commentForm.content == ''"
              v-loading="loading"
              @click="submit"
              type="primary"
              >{{ $t('comment.send') }}</el-button
            >
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, toRefs, watch, defineProps,defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { userType } from '@/types/userType'
import { useConfigStoreHook } from '@/store/modules/config'
import { useUserStoreHook } from '@/store/modules/user'
import { useModuleStoreHook } from '@/store/modules/module'
import { t } from "@/plugins/i18s"
import {addComment} from "@/api/comment"
const emits=defineEmits(["add"])
const props = defineProps({
  topicType: {
    type: String,
    required: true
  },
  topicId: {
    type: Number,
    required: true
  },
  rootId: {
    type: Number,
    required: false
  },
  userInfo: {
    type: Object,
    required: true
  },
  to: {
    type: String,
    required: false
  },
  parentId: {
    type: Number,
    required: true
  }
})
const { topicType, topicId, userInfo, rootId, parentId } = toRefs(props)
const to = props.to
// const store = useStore();
const privacy: any = computed(() => {
  return useConfigStoreHook().privacy
})
const modules: any = computed(() => {
  return useConfigStoreHook().module
})
const user = useUserStoreHook()
const dialog=useModuleStoreHook()
// userInfo.value.type=computed(()=>{
//   if(modules.Login){
//     return 1
//   }else if(privacy.Visitor){
//     return 2
//   }else if(privacy.Anonymous){
//     return 3
//   }else{
//     return null
//   }
// })
// const userSelect = ref(2);
const commentFormRef = ref<FormInstance>()
const commentForm: any = reactive({
  userAuthId: null,
  topicType: null,
  topicId: null,
  rootId: null,
  parentId: null,
  content: '',
  type: userInfo.value.type,
  nickname: userInfo.value.nickname,
  email: userInfo.value.email,
  qq: userInfo.value.qq,
  url: window.location.href
})

watch(userInfo.value, (value, preValue) => {
  commentForm.type = value.type
  commentForm.nickname = value.nickname
  commentForm.email = value.email
  commentForm.qq = value.qq
})
// const type = {
//   loginUser: 1,
//   visitor: 2,
//   annoymous: 3,
// };
const rules = reactive<FormRules>({
  content: [
    {
      validator: (rule: any, value: any, callback: any) => {
        // console.log("111");
        if (value == '') {
          callback(new Error('请输入评论内容~'))
        } else {
          callback()
        }
      },
      required: true,
      trigger: 'blur'
    }
  ],
  nickname: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (commentForm.type != userType.visitor) {
          callback()
          return
        }
        // console.log("校验");
        if (value == '') {
          callback(new Error('Please input the nickname'))
        } else if (value.length > 10) {
          callback(new Error('昵称过长~'))
        } else {
          callback()
        }
      },
      required: true,
      trigger: 'blur'
    }
  ],
  email: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (commentForm.type != userType.visitor) {
          callback()
          return
        }
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (value == '') {
          callback(new Error('Please input the email'))
        }
        if (!reg.test(value)) {
          callback(new Error('邮箱不合法！'))
        } else {
          callback()
        }
      },
      required: true,
      trigger: 'blur'
    }
  ],
  qq: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value.length > 10 || (value.length < 5 && value.length > 0)) {
          callback(new Error('qq不合法'))
        } else {
          callback()
        }
      },
      required: false,
      trigger: 'blur'
    }
  ]
})
const loading = ref(false)
const submit = () => {
  if (!modules.value.Login && !privacy.value.Visitor && !privacy.value.Anonymous) {
    console.log(
      t('comment.close'),
      modules.value.Login,
      privacy.value.Visitor,
      privacy.value.Anonymous
    )
    ElMessage({
      message: t('comment.close'),
      type: 'warning'
    })
    return
  }
  if (!userInfo.value.type) {
    ElMessage({
      message: t("comment.selectUser"),
      type: 'warning'
    })
    return;
  }
  if (loading.value) {
    return
  }
  if (userInfo.value.type == userType.loginUser && !user.getToken()) {
    dialog.login = true
    return
  }
  loading.value = true
  commentFormRef.value
    ?.validate()
    .then(() => {
      // console.log("form:", commentForm);
      commentForm.topicType = topicType.value
      commentForm.topicId = topicId.value
      if (rootId?.value) {
        commentForm.rootId = rootId.value
      }
      commentForm.parentId = parentId.value
      // if (parentId.value) {
      // }
      // console.log("parentid",parentId,'rootId',rootId)
      // console.log("formRef：", commentFormRef);
      // console.log("topicId", topicId.value);
      // return;
      let form: any = commentForm
      const { email, nickname, qq, userAuthId, ...other } = commentForm
      if (commentForm.type == userType.loginUser) {
        //TODO
        commentForm.userAuthId = null
      } else if (commentForm.type == userType.annoymous) {
        // commentForm.nickname = "";
        // commentForm.email = "";
        // commentForm.qq = "";
        form = other
      }

      addComment(form)
        .then((data: any) => {
          commentForm.content = ''
          // console.log("commendto：",data)
          ElMessage({
            message: `${t('form.post')}${data.review == 1 ? t('form.visiable') : ''}`,
            type: 'success'
          })
          emits('add', data)
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    })
    .catch(() => {
      console.log('表单验证失败')
      // return false;
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
.comment-form {
  width: 100%;
  overflow: hidden;
  // margin-top: 2.5rem;
  .text {
    border-radius: 1.5rem;
    border: 2px rgb(154, 218, 244) solid;
    overflow: hidden;
    padding: 0rem 0 0rem 0;
    .head {
      // background-color: rgba(255, 255, 255, 0.8);
      .title {
        font-size: 1.8rem;
        padding: 0.2rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        // border-bottom: 2px rgb(154, 211, 244) solid;
        .text-title {
          // border-bottom: 3px rgb(154, 211, 244) solid;
          font-weight: bold;
        }
        .select-user {
          width: 8.5rem;
          text-align: center;
        }
      }
    }
    .user-info {
      // border-bottom: 2px rgb(154, 211, 244) solid;
    }

    .func {
      display: flex;
      padding: 0rem 1rem 0.5rem 1rem;
      justify-items: center;
      justify-content: space-between;
    }
  }
}
</style>
<style lang="scss">
// .select-user {
//   width: 0rem;
//   text-align: center;

//   .el-select {
//     .el-input {
//     }
//   }
// }
.user-info {
  padding: 0rem 1rem;
  // margin-bottom: 1.2rem;
  label {
    // text-align: center;
    font-size: 1.4rem;
    padding-right: 0.8rem;
    // margin: 0;
  }
  .el-form-item {
    // margin: 0;
    // padding: 0;
  }
  .el-form-item:not(:first-of-type) {
    // margin-top: 1.5rem;
  }
  .el-input {
    min-width: 12rem;
    input {
      font-size: 1.4rem;
    }
  }
}
@media screen and (max-width: 768px) {
  .user-info {
    .el-input {
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .user-info {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    .el-input {
      max-width: 25rem;
    }

    .el-form-item:not(:last-of-type) {
      margin-right: 1.5rem;
    }
  }
}
@media screen and (min-width: 992px) {
  .user-info {
    display: flex;
    justify-content: space-between;
    .el-input {
      max-width: 25rem;
    }
  }
}
.commentForm {
  .comment-content {
    // background-color: red;
    // border: 0;
    overflow: auto;
    // box-sizing: border-box;
    resize: none;
    // border: 1px red solid;
    background-color: rgba(255, 255, 255, 0);
    font-size: 1.4rem;
    width: 100%;
    // height: 8rem;
    // padding: 0rem 1rem;
    margin: 0;
    letter-spacing: 0.1rem;
    line-height: 130%;
    outline: none;
  }
  .content {
    label {
      display: none;
    }
  }
  // .el-textarea {
  //   border: 0;
  // }
  // #comment-content:active {
  //   border: 0;
  // }
  // #comment-content:focus {
  //   border: 0;
  // }
}
</style>
