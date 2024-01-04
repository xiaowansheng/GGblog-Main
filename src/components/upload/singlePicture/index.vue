<script setup lang="ts">
// import { UploadFilled } from "@element-plus/icons-vue";
import { uploadFile as upload } from '@/api/upload'
import type { FileDto } from '@/api/upload'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadFiles, UploadInstance } from 'element-plus'
import { reactive, ref, toRefs, watch } from 'vue'

defineOptions({
  name: 'SinglePictureUpload'
})
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  disable: {
    type: Boolean,
    default: false
  },
  auto: {
    type: Boolean,
    default: true
  },
  dir: {
    type: String,
    default: 'default'
  },
  height: {
    type: String,
    default: '250px'
  },
  width: {
    type: String,
    default: '250px'
  }
})
const emits = defineEmits(['update:value'])

const { value, dir, disable, auto }: any = toRefs(props)
const url = ref<string>(value.value)
const uploaded = ref<boolean>(true)
const valueOneChange = watch(value, () => {
  // 解决照片回显问题
  console.log('image-value更新')
  if (value.value != url.value) {
    url.value = value!.value
    fileList.value.splice(0)
  }
  // valueOneChange()
})
const uploadFile = (): Promise<FileDto> => {
  return new Promise((resolve, reject) => {
    if (uploaded.value) {
      resolve({ link: url.value } as FileDto)
    } else {
      const formData = new FormData()
      formData.append('filePath', dir.value)
      const file: UploadFile = fileList.value[0]
      formData.append('file', file.raw!)
      upload(formData)
        .then((data: any) => {
          url.value = data.link
          emits('update:value', url.value)
          uploaded.value = true
          resolve(data)
        })
        .catch(() => {
          ElMessage.error('头像上传失败！')
          reject(false)
        })
    }
  })
}

const fileList: any = ref([])
watch(fileList, () => {
  // console.log("文件列表改变：");
  if (fileList.value.length) {
    uploaded.value = false
    if (auto.value) {
      uploadFile()
    } else {
      url.value = fileList.value[fileList.value.length - 1].url
      console.log('等待上传的文件：', fileList.value[fileList.value.length - 1])
    }
  }
})
const remove = () => {
  url.value = ''
  console.log('移除图片~~')
}
const uploadRef = ref<UploadInstance>()

defineExpose({
  uploadFile
})
</script>

<template>
  <el-upload
    ref="uploadRef"
    class="single-upload"
    name="file"
    method="post"
    v-model:file-list="fileList"
    :drag="true"
    :on-remove="remove"
    :multiple="false"
    :disabled="disable"
    :limit="1"
    :auto-upload="false"
    list-type="picture"
    :show-file-list="false"
  >
    <div v-if="!url" class="no-img" :style="`width: ${width}; height:${height}`">
      <!-- <el-icon class="el-icon--upload"><upload-filled /></el-icon> -->
      <svg
        t="1698636198365"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2298"
        :width="width"
        :height="height"
      >
        <path
          d="M426.666667 426.666667H85.546667A85.418667 85.418667 0 0 0 0 512c0 47.445333 38.314667 85.333333 85.546667 85.333333H426.666667v341.12c0 47.274667 38.186667 85.546667 85.333333 85.546667 47.445333 0 85.333333-38.314667 85.333333-85.546667V597.333333h341.12A85.418667 85.418667 0 0 0 1024 512c0-47.445333-38.314667-85.333333-85.546667-85.333333H597.333333V85.546667A85.418667 85.418667 0 0 0 512 0c-47.445333 0-85.333333 38.314667-85.333333 85.546667V426.666667z"
          fill="#bfbfbf"
          p-id="2299"
        ></path>
      </svg>
      <!-- <div class="el-upload__text">拖拽上传 或 <em>点击上传</em></div> -->
    </div>
    <div
      v-if="url"
      class="img"
      :style="`width: ${width}px; height:${height}px`"
      style="overflow: hidden"
    >
      <el-image style="width: 100%; height: 100%" :src="url" :fit="'cover'" />
    </div>
    <!-- <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template> -->
  </el-upload>
</template>
<style lang="scss">
.single-upload {
  .el-upload-dragger {
    padding: 10px;
    .no-img {
      padding-top: 10px;
    }
  }
}
</style>
