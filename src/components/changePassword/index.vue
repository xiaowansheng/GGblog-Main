<template>
  <div id="change-password">
    <el-dialog
      v-model="dialog.changePassword"
      :close-on-click-modal="false"
      :title="$t('change.title')"
      :lock-scroll="false"
      @open="handleScrollbars(true)"
      @close="handleScrollbars(false)"
    >
      <div class="form">
        <el-form
          label-position="left"
          label-width="100px"
          :model="user"
          style="max-width: 460px"
          :rules="rules"
          ref="userFormRef"
        >
          <el-form-item prop="oldPassword">
            <template #label>
              <span class="email">{{ $t('change.oldPassword') }}</span>
            </template>
            <el-input type="password" v-model="user.oldPassword" />
          </el-form-item>
          <el-form-item prop="password">
            <template #label>
              <span class="password">{{ $t('change.newPassword') }}</span>
            </template>
            <el-input type="password" v-model="user.newPassword" />
          </el-form-item>
          <el-form-item prop="password2">
            <template #label>
              <span class="password">{{ $t('change.newPassword') }}</span>
            </template>
            <el-input type="password" v-model="user.password2" />
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button v-loading="disable" :disabled="disable" type="primary" @click="signup">
            <span>{{ $t('change.change') }}</span>
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
import { t } from '@/plugins/i18s'
import { useConfigStoreHook } from '@/store/modules/config'
import { useModuleStoreHook } from '@/store/modules/module'
import { changePassword } from '@/api/user'
import { handleScrollbars } from '@/utils/pageUtils'
// import { ElMessage } from "element-plus";
defineOptions({
  name: 'ChangePassword'
})
const dialog = useModuleStoreHook()
const user = reactive({
  oldPassword: '',
  // verificationCode: "",
  newPassword: '',
  password2: ''
})
const userFormRef = ref()
const rules = reactive<FormRules>({
  oldPassword: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value == '') {
          callback(new Error(t('change.inputOld')))
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
        if (user.newPassword == '') {
          callback(new Error(t('change.inputNew')))
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
          callback(new Error(t('change.reInput')))
        } else if (user.password2 != user.newPassword) {
          callback(new Error(t('change.different')))
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
const submit = () => {
  disable.value = true
  const { password2, ...other } = user
  changePassword(other)
    .then(() => {
      // ElMessage.success(t('form.put'))
      userFormRef.value.resetFields()
      dialog.changePassword = false
      disable.value = false
    })
    .catch(() => {
      disable.value = false
    })
}
const signup = () => {
  userFormRef.value
    .validate()
    .then(() => {
      submit()
    })
    .catch(() => {
      console.log('表单验证失败')
    })
}
</script>
<style lang="scss" scoped>
#change-password {
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
#change-password {
  .el-dialog,
  .el-input__wrapper {
    background-color: rgba(255, 255, 255, 0.9);
  }
  input {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 768px) {
  #change-password {
    .el-dialog {
      --el-dialog-width: 90%;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  #change-password {
    .el-dialog {
      --el-dialog-width: 55%;
    }
  }
}
@media screen and (min-width: 992px) {
  #change-password {
    .el-dialog {
      --el-dialog-width: 30%;
    }
  }
}

.dark {
  #change-password {
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
