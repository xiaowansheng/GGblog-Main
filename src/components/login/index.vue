<template>
  <div id="login">
    <el-dialog v-model="modules.login" :close-on-click-modal="false" :title="$t('login.title')">
      <div class="form">
        <el-form
          label-position="left"
          label-width="45px"
          :model="user"
          style="max-width: 460px"
          :rules="rules"
          ref="loginFormRef"
        >
          <el-form-item prop="username">
            <template #label>
              <!-- <span class="email">{{ t("login.email") }}</span> -->
              <span class="iconfont icon-youxiang email"></span>
            </template>
            <el-input ref="account" v-model="user.username" />
          </el-form-item>
          <el-form-item prop="password">
            <template #label>
              <span class="iconfont icon-ziyuanxhdpi password"></span>
              <!-- <span class="password">{{ t("login.password") }}</span> -->
            </template>
            <el-input @keyup.enter="login" type="password" v-model="user.password" />
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button v-loading="disable" :disabled="disable" type="primary" @click="login">
            <span>{{ $t('login.login') }}</span>
          </el-button>
        </div>
        <div class="third-part-login">
          <el-tooltip
            class="box-item"
            effect="light"
            content="QQ"
            placement="top-start"
            v-if="loginWays.QQ"
          >
            <a href="" alt="a"><span class="iconfont icon-QQ qq"></span></a>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="light"
            content="微博"
            placement="top-start"
            v-if="loginWays.Weibo"
          >
            <a href=""><span class="iconfont icon-weibo weibo"></span></a>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="light"
            content="Google"
            placement="top-start"
            v-if="loginWays.Google"
          >
            <a href=""><span class="iconfont icon-guge google"></span></a>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="light"
            content="Github"
            placement="top-start"
            v-if="loginWays.Github"
          >
            <a href=""><span class="iconfont icon-github-fill github"></span></a>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="light"
            content="Gitee"
            placement="top-start"
            v-if="loginWays.Gitee"
          >
            <a href=""><span class="iconfont icon-gitee gitee"></span></a>
          </el-tooltip>
        </div>

        <div class="other">
          <el-button link type="primary" @click="toSignup">
            <span>{{ $t('login.signup') }}</span>
          </el-button>
          <el-button link type="primary" @click="toResetPassword">
            <span>{{ $t('login.forget') }}</span>
          </el-button>
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
import type { FormRules } from 'element-plus'
// import { ElMessage } from "element-plus";
import { t } from '@/plugins/i18s'
import { useConfigStoreHook } from '@/store/modules/config'
import { useModuleStoreHook } from '@/store/modules/module'
import { useUserStoreHook } from '@/store/modules/user'
import { ElMessage } from "element-plus";
defineOptions({
  name: 'Login'
})
const modules = useModuleStoreHook()
const loginWays = computed(() => {
  return useConfigStoreHook().login
})
const userStore = useUserStoreHook()
const user = reactive({
  username: '',
  password: ''
})
const loginFormRef = ref()
const rules = reactive<FormRules>({
  username: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value == 'admin' || value == 'test') {
          callback()
          return
        }
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (value == '') {
          callback(new Error(t('login.inputEmail')))
        }
        if (!reg.test(value)) {
          callback(new Error(t('login.checkEmail')))
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
          callback(new Error(t('login.inputPassword')))
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
  userStore
    .loginByUsername(user)
    .then(() => {
      // loginFormRef.value.resetFields();
      console.log(111)

      ElMessage.success(t('form.login'))
      modules.login = false
      disable.value = false
    })
    .catch(() => {
      disable.value = false
    })
}
const account = ref()
const login = () => {
  loginFormRef.value
    .validate()
    .then(() => {
      submit()
    })
    .catch(() => {
      console.log('表单验证失败')
    })
}


const toSignup = () => {
  modules.login = false
  modules.signup = true
}

const toResetPassword = () => {
  modules.login = false
  modules.resetPassword = true
}
</script>
<style lang="scss" scoped>
#login {
  .form {
    padding: 0 1rem;
    .el-form-item {
      .email,
      .password {
        font-size: 2rem;
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
    .third-part-login {
      margin-top: 1.5rem;
      display: flex;
      justify-content: center;
      a {
        margin: 1rem 1.5rem;
        .iconfont {
          font-size: 2.8rem;
        }
        .qq {
          color: rgb(79, 79, 209);
        }
        .weibo {
          color: rgb(226, 74, 74);
        }
        .google {
          color: rgb(89, 182, 199);
        }
        .github {
          color: black;
        }
        .gitee {
          color: rgb(213, 8, 8);
        }
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
#login {
  .el-dialog,
  .el-input__wrapper {
    background-color: rgba(255, 255, 255, 0.9);
  }
  input {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 768px) {
  #login {
    .el-dialog {
      --el-dialog-width: 90%;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  #login {
    .el-dialog {
      --el-dialog-width: 55%;
    }
  }
}
@media screen and (min-width: 992px) {
  #login {
    .el-dialog {
      --el-dialog-width: 30%;
    }
  }
}

.dark {
  #login {
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
