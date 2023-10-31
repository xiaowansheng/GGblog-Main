<template>
  <el-dialog
    id="friendLinkForm-dialog"
    :model-value="visible"
    title="友链申请"
    @close="close"
    @close-auto-focus="close"
  >
    <div class="friend-link-form">
      <el-form
        label-position="left"
        label-width="100px"
        :model="friendForm"
        style="max-width: 460px"
        ref="friendLinkRef"
        status-icon
        :rules="rules"
      >
        <el-form-item :label="$t('blogroll.name')" prop="name">
          <el-input v-model="friendForm.name" />
        </el-form-item>
        <el-form-item :label="$t('blogroll.icon')" prop="icon">
          <el-input v-model="friendForm.icon" />
        </el-form-item>
        <el-form-item :label="$t('blogroll.link')" prop="address">
          <el-input v-model="friendForm.address" />
        </el-form-item>
        <el-form-item :label="$t('blogroll.author')" prop="author">
          <el-input v-model="friendForm.author" />
        </el-form-item>
        <el-form-item :label="$t('blogroll.introduction')" prop="introduction">
          <el-input v-model="friendForm.introduction" />
        </el-form-item>
        <div class="tip">
          {{ $t('blogroll.tip') }}
        </div>
        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm(friendLinkRef)"
            >Submit</el-button
          >
          <el-button @click="resetForm(friendLinkRef)">Reset</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">{{ '取消' }}</el-button>
        <el-button type="primary" @click="submitForm(friendLinkRef)">
          {{ '提交' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { addFriend } from '@/api/friend'
import { t } from '@/plugins/i18s'
defineOptions({
  name: 'FriendLinkForm'
})
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
const { visiable } = toRefs(props)
const emits = defineEmits(["close"])
const close = () => {
  emits('close')
}
const friendForm = reactive({
  name: '',
  icon: '',
  address: '',
  author: '',
  introduction: ''
})

const friendLinkRef: any = ref<FormInstance>()

const rules = reactive({
  name: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error())
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  icon: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error())
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  address: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error())
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  author: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error())
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  introduction: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error())
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const submitForm = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.validate((valid) => {
    if (valid) {
      //   console.log("submit!");
      submit()
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const submit = () => {
  addFriend(friendForm).then((data: any) => {
    ElMessage.success(t('form.post'))
    friendLinkRef?.value.resetFields() //重置表单
    close()
  })
}
</script>

<style lang="scss" scoped>
.friend-link-form {
  .tip {
    text-align: center;
    margin: 1rem 0;
    font-size: 1.3rem;
  }
}
</style>
<style lang="scss">
#friendLinkForm-dialog {
  border-radius: 1.5rem;
}
#friendLinkForm-dialog,
#friendLinkForm-dialog .el-input__wrapper {
  background-color: rgba(255, 255, 255, 0.9);
}
@media screen and (max-width: 768px) {
  #friendLinkForm-dialog {
    --el-dialog-width: 90%;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  #friendLinkForm-dialog {
    --el-dialog-width: 50%;
  }
}
@media screen and (min-width: 992px) {
  #friendLinkForm-dialog {
    --el-dialog-width: 30%;
  }
}
.dark {
  #friendLinkForm-dialog,
  #friendLinkForm-dialog .el-input__wrapper {
    background-color: rgba(0, 0, 0, 0.9);
  }
}
</style>
