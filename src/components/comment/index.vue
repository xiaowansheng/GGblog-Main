<template>
  <div class="comment" v-if="modules.Comment">
    <div class="form">
      <CommentForm
        :topicType="topicType"
        :topicId="topicId"
        @addComment="addComment"
        :userInfo="userInfo"
        :parentId="0"
      />
    </div>
    <div class="comments">
      <CommentSection
        ref="commentSection"
        :topicType="topicType"
        :topicId="topicId"
        :userInfo="userInfo"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, toRefs, watch } from 'vue'
import CommentForm from './commentForm/index.vue'
import CommentSection from './commentSection/index.vue'
import { useConfigStoreHook } from '@/store/modules/config'
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
const { topicType, topicId } = toRefs(props)
const commentSection = ref()
const userInfo = reactive({
  type: 1,
  nickname: '',
  email: '',
  qq: ''
})
watch(store.state.user, (value: any) => {
  if (value.token) {
    userInfo.type = 1
  } else {
    userInfo.type = 2
  }
})
const addComment = (comment: any) => {
  commentSection.value?.addComment(comment)
}
</script>

<style lang="less" scoped>
.comment {
  .form {
    margin-top: 2.5rem;
    // border-radius: 1.5rem;
    // border: 2px rgb(154, 218, 244) solid;
    // overflow: hidden;
  }
}
</style>
