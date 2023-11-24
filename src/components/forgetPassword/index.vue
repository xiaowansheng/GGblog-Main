<template>
  <div id="forget-password">
    <el-dialog
      v-model="dialog.resetPassword"
      :lock-scroll="false"
      :close-on-click-modal="false"
      :title="$t('forget.title')"
      @open="handleScrollbars(true)"
      @close="handleScrollbars(false)"
    >
      <div class="form">
        <el-form
          label-position="left"
          label-width="95px"
          :model="user"
          style="max-width: 460px"
          :rules="rules"
          ref="userFormRef"
        >
          <el-form-item prop="email">
            <template #label>
              <span class="email">{{ $t('forget.email') }}</span>
            </template>
            <el-input v-model="user.email" />
          </el-form-item>
          <el-form-item prop="verificationCode">
            <template #label>
              <span class="email">{{ $t('forget.code') }}</span>
            </template>
            <!-- <el-input v-model="user.username" /> -->
            <el-input v-model="user.verificationCode" placeholder="">
              <template #append>
                <el-button :disabled="disable || time > 0" @click="sendVerificationCode"
                  ><span
                    ><span v-show="time <= 0">{{ $t('forget.send') }}</span>
                    <span v-show="time > 0">{{ time }}</span></span
                  ></el-button
                >
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <template #label>
              <span class="password">{{ $t('forget.newPassword') }}</span>
            </template>
            <el-input type="password" v-model="user.password" />
          </el-form-item>
          <el-form-item prop="password2">
            <template #label>
              <span class="password">{{ $t('forget.newPassword') }}</span>
            </template>
            <el-input type="password" v-model="user.rePassword" />
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button v-loading="disable" :disabled="loading" type="primary" @click="resetPassword">
            <span>{{ $t('forget.reset') }}</span>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'

import { useConfigStoreHook } from '@/store/modules/config'
import { useModuleStoreHook } from '@/store/modules/module'
import { t } from '@/plugins/i18s'
import { resetPassword as resetUserPassword, getVerificationCode } from '@/api/user'
import { handleScrollbars } from '@/utils/pageUtils'
defineOptions({
  name: 'Comment'
})
const dialog = useModuleStoreHook()
const user = reactive({
  email: '',
  verificationCode: '',
  password: '',
  rePassword: ''
})
const userFormRef = ref()
const rules = reactive<FormRules>({
  email: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value == 'admin' || value == 'test') {
          callback()
          return
        }
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (value == '') {
          callback(new Error(t('forget.inputEmail')))
        }
        if (!reg.test(value)) {
          callback(new Error(t('forget.checkEmail')))
        } else {
          callback()
        }
      },
      required: false,
      trigger: 'blur'
    }
  ],
  verificationCode: [
    {
      validator: (rule: any, value: any, callback: any) => {
        // console.log("校验");
        if (value == '') {
          callback(new Error(t('forget.inputCode')))
        } else {
          callback()
        }
      },
      required: false,
      trigger: 'blur'
    }
  ],

  password: [
    {
      validator: (rule: any, value: any, callback: any) => {
        // console.log("校验");
        if (value == '') {
          callback(new Error(t('forget.inputPassword')))
        } else {
          callback()
        }
      },
      required: false,
      trigger: 'blur'
    }
  ],
  password2: [
    {
      validator: (rule: any, value: any, callback: any) => {
        // console.log("校验");
        if (value == '') {
          callback(new Error(t('forget.reInput')))
        } else if (user.rePassword != user.password) {
          callback(new Error(t('forget.different')))
        } else {
          callback()
        }
      },
      required: false,
      trigger: 'blur'
    }
  ]
})
const disable = ref(false)
const loading = ref(false)
const submit = () => {
  loading.value = true
  const { rePassword, ...other } = user
  resetUserPassword(other)
    .then(() => {
      ElMessage.success(t('form.reset'))
      userFormRef.value.resetFields()
      dialog.resetPassword = false
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
let interval: any
const time = ref(0)
const resetPassword = () => {
  userFormRef.value
    .validate()
    .then(() => {
      submit()
    })
    .catch(() => {
      console.warn('表单验证失败')
    })
}
const sendVerificationCode = () => {
  disable.value = true
  userFormRef.value
    .validateField(['email'])
    .then(() => {
      getVerificationCode({
        email: user.email
      }).then(() => {
        ElMessage.success('验证码发送成功！')
        time.value = 60
        interval = setInterval(() => {
          if (time.value <= 0) {
            clearInterval(interval)
          }
          time.value = time.value - 1
        }, 1000)
        disable.value = false
      })
    })
    .catch(() => {
      console.warn('表单校验错误')
      disable.value = false
    })
}
</script>
<style lang="scss" scoped>
#forget-password {
  .form {
    padding: 0 1rem;
    .el-form-item {
      .email,
      .password {
        font-size: 1.4rem;
      }
    }
    .btn {
      margin-top: 3rem;
      text-align: center;
      button {
        width: 100%;
        font-size: 1.5rem;
      }
      span {
        letter-spacing: 0.5rem;
        padding: 0.5rem 1rem;
      }
    }
    .other {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
<style lang="scss">
#forget-password {
  .el-dialog,
  .el-input__wrapper {
    background-color: rgba(255, 255, 255, 0.9);
  }
  input {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 768px) {
  #forget-password {
    .el-dialog {
      --el-dialog-width: 90%;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  #forget-password {
    .el-dialog {
      --el-dialog-width: 55%;
    }
  }
}
@media screen and (min-width: 992px) {
  #forget-password {
    .el-dialog {
      --el-dialog-width: 30%;
    }
  }
}

.dark {
  #forget-password {
    .el-dialog,
    .el-input__wrapper {
      background-color: rgba(0, 0, 0, 0.85);
    }
    .github {
      color: white !important;
    }
    input {
      font-size: 1.5rem;
    }
  }
}
</style>
