<template>
  <div id="signup">
    <el-dialog v-model="dialog.signup" :close-on-click-modal="false" :title="$t('signup.title')">
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
              <span class="email">{{ $t('signup.email') }}</span>
            </template>
            <el-input v-model="user.email" />
          </el-form-item>
          <el-form-item prop="verificationCode">
            <template #label>
              <span class="email">{{ $t('signup.code') }}</span>
            </template>
            <!-- <el-input v-model="user.username" /> -->
            <el-input v-model="user.verificationCode" placeholder="">
              <template #append>
                <el-button :disabled="time > 0" @click="sendVerificationCode"
                  ><span
                    ><span v-show="time <= 0">{{ $t('signup.send') }}</span>
                    <span v-show="time > 0">{{ time }}</span></span
                  ></el-button
                >
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="nickname">
            <template #label>
              <span class="nickname">{{ $t('signup.nickname') }}</span>
            </template>
            <el-input type="nickname" v-model="user.nickname" />
          </el-form-item>
          <el-form-item prop="password">
            <template #label>
              <span class="password">{{ $t('signup.password') }}</span>
            </template>
            <el-input type="password" v-model="user.password" />
          </el-form-item>
          <el-form-item prop="password2">
            <template #label>
              <span class="password">{{ $t('signup.password') }}</span>
            </template>
            <el-input type="password" v-model="user.rePassword" />
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button v-loading="disable" :disabled="disable" type="primary" @click="signup">
            <span>{{ $t('signup.signup') }}</span>
          </el-button>
        </div>
        <div class="other">
          <el-button link type="primary" @click="returnLogin">
            <span>{{ $t('signup.return') }}</span>
          </el-button>
          <!-- <el-button link type="primary" @click="dialogVisible = false">
            <span>{{ "忘记密码" }}</span>
          </el-button> -->
        </div>
        <!-- <template #footer>
        <span class="dialog-footer">
          <el-button >Cancel</el-button>

        </span>
      </template> -->
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage, FormRules } from 'element-plus'
import { t } from '@/plugins/i18s'
import { getVerificationCode, signup as signupUser } from '@/api/user'
// import { useI18n } from "vue-i18n";
import { useModuleStoreHook } from '@/store/modules/module'
defineOptions({
  name: 'Signup'
})
// import { ElMessage } from "element-plus";
const dialog = useModuleStoreHook()
const user = reactive({
  email: '',
  verificationCode: '',
  nickname: '',
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
          callback(new Error(t('signup.inputEmail')))
        }
        if (!reg.test(value)) {
          callback(new Error(t('signup.checkEmail')))
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
          callback(new Error(t('signup.inputCode')))
        } else {
          callback()
        }
      },
      required: false,
      trigger: 'blur'
    }
  ],
  nickname: [
    {
      validator: (rule: any, value: any, callback: any) => {
        // console.log("校验");
        if (value == '') {
          callback(new Error(t('signup.inputNickname')))
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
        if (user.password == '') {
          callback(new Error(t('signup.inputPassword')))
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
          callback(new Error(t('signup.inputPassword')))
        } else if (user.rePassword != user.password) {
          callback(new Error(t('signup.different')))
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
  const { rePassword, ...other } = user
  signupUser(other)
    .then(() => {
      ElMessage.success(t('form.signup'))
      userFormRef.value.resetFields()
      dialog.signup = false
      dialog.login = true
      disable.value = false
    })
    .catch(() => {
      disable.value = false
    })
}
let interval: any
const wait = ref(false)
const time = ref(0)
const returnLogin = () => {
  dialog.signup = false
  dialog.login = true
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
const sendVerificationCode = () => {
  userFormRef.value
    .validateField(['email'])
    .then(() => {
      if (!wait.value) {
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
        })
      }
    })
    .catch(() => {
      console.log('表单校验错误')
    })
}
</script>
<style lang="scss" scoped>
#signup {
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
#signup {
  .el-dialog,
  .el-input__wrapper {
    background-color: rgba(255, 255, 255, 0.9);
  }
  input {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 768px) {
  #signup {
    .el-dialog {
      --el-dialog-width: 90%;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  #signup {
    .el-dialog {
      --el-dialog-width: 55%;
    }
  }
}
@media screen and (min-width: 992px) {
  #signup {
    .el-dialog {
      --el-dialog-width: 30%;
    }
  }
}

.dark {
  #signup {
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
