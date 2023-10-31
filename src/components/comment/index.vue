<template>
  <div class="comment" v-if="modules.Comment">
    <div class="form">
      <CommentForm
        :topicType="topicType"
        :topicId="topicId"
        @add="addComment"
        :userInfo="userInfo"
        :parentId="0"
      />
    </div>
    <div class="comments">
      <CommentSection
        ref="commentSectionRef"
        :topicType="topicType"
        :topicId="topicId"
        :userInfo="userInfo"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, toRefs, watch,onBeforeMount } from 'vue'
import CommentForm from './commentForm/index.vue'
import CommentSection from './commentSection/index.vue'
import { useConfigStoreHook } from '@/store/modules/config'
import { useUserStoreHook } from '@/store/modules/user'
import { userType } from "@/types/userType"
defineOptions({
  name: 'Comment'
})
const props = defineProps({
  topicType: {
    type: String,
    required: true
  },
  topicId: {
    type: Number,
    required: true
  }
})
const modules = computed(() => {
  return useConfigStoreHook().module
})
const user = useUserStoreHook()
const { topicType, topicId } = toRefs(props)
const commentSectionRef = ref()
const userInfo = reactive({
  type: "",
  nickname: '',
  email: '',
  qq: ''
})
const setUserType = () => {
    if (user.getToken()) {
    userInfo.type = userType.loginUser
  } else {
    userInfo.type = userType.visitor
  }
}
watch(user, () => {
  setUserType()
})
const addComment = (comment: any) => {
  commentSectionRef.value.addComment(comment)
}
onBeforeMount(() => {
  setUserType()
})
</script>

<style lang="scss" scoped>
.comment {
  .form {
    margin-top: 2.5rem;
    // border-radius: 1.5rem;
    // border: 2px rgb(154, 218, 244) solid;
    // overflow: hidden;
  }
}
</style>
