<script setup lang="ts">
import { handleScrollbars } from '@/utils/pageUtils'
import { toRefs, watch } from 'vue'
defineOptions({
  name: 'ImgPreview'
})
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  list: {
    type: Array<string>,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  zIndex: {
    type: Number,
    default: 2015,
    required: false
  },
  teleported: {
    type: Boolean,
    default: false,
    required: false
  }
})
const { show, list, index, zIndex, teleported } = toRefs(props)
const emits = defineEmits(['close', 'switch', 'update:show'])

watch(
  () => props.show,
  () => {
    if (show.value) {
      handleScrollbars(true)
    } else {
      handleScrollbars(false)
    }
  }
)

const closePreview = () => {
  emits('close')
  emits('update:show', false)
}
const switchImg = (index: number) => {
  emits('switch', index)
}
</script>

<template>
  <el-image-viewer
    v-if="show"
    :z-index="zIndex"
    :url-list="list"
    :teleported="teleported"
    @close="closePreview"
    @switch="switchImg"
    :initial-index="index"
  />
</template>

<style lang="scss" scoped></style>
