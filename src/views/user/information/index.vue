<template>
  <div class="information">
    <Header :cover="covers.Information">
      <template #title>
        {{ $t('menu.information') }}
      </template>
    </Header>
    <div class="content">
      <div class="information">
        <el-form
          label-position="left"
          label-width="80px"
          :model="form"
          style="max-width: 460px"
          :rules="rules"
          ref="infoFormRef"
        >
          <el-form-item :label="$t('information.account')">
            <el-input disabled v-model="user.username" />
          </el-form-item>
          <el-form-item :label="$t('information.avatar')" class="avatar" prop="avatar">
            <div :class="disable ? 'disabled' : ''"></div>
            <!-- <el-input v-model="form.avatar" /> -->
            <AvatarUpload :dir="'avatar'" width="150" height="150" :disable="disable" v-model:value="form.avatar" />
          </el-form-item>
          <el-form-item :label="$t('information.nickname')" prop="name">
            <el-input :disabled="disable" v-model="form.nickname" />
          </el-form-item>
          <el-form-item :label="$t('information.email')" prop="email">
            <el-input :disabled="disable" v-model="form.email" />
          </el-form-item>
          <el-form-item :label="$t('information.qq')" prop="qq">
            <el-input minlength="5" maxlength="10" :disabled="disable" v-model.number="form.qq" />
          </el-form-item>
          <el-form-item :label="$t('information.signature')" prop="signature">
            <el-input  :disabled="disable" v-model="form.signature" />
          </el-form-item>
          <el-form-item :label="t('information.website')" prop="website">
            <el-input :disabled="disable" v-model="form.website" />
          </el-form-item>
          <el-form-item :label="$t('information.profile')" prop="introduction">
            <el-input :disabled="disable" v-model="form.introduction" type="textarea" />
          </el-form-item>
          <div class="btn" v-if="user.getToken()">
            <el-button v-show="!disable" type="primary" @click="submit">{{
              $t('information.submit')
            }}</el-button>
            <el-button v-show="!disable" type="info" @click="cancel">{{
              $t('information.cancel')
            }}</el-button>
            <el-button v-show="disable" type="warning" @click="disable = false">{{
              $t('information.open')
            }}</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/header/index.vue'
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'
import AvatarUpload from "@/components/upload/singlePicture/index.vue";
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { useConfigStoreHook } from '@/store/modules/config'
import { useUserStoreHook } from '@/store/modules/user'
import { useModuleStoreHook } from '@/store/modules/module'
import { getInformation, updateInformation } from '@/api/user'
import { t } from '@/plugins/i18s'
defineOptions({
  name: 'UserInformation'
})
const covers = computed(() => {
  return useConfigStoreHook().covers
})
const dialog = useModuleStoreHook()
const user = useUserStoreHook()
const disable = ref(true)
const infoFormRef = ref()

const form = reactive({
  id:"",
  avatar: '',
  email: '',
  qq: '',
  signature: '',
  nickname: '',
  introduction: '',
  website: ''
})

const rules = reactive<FormRules>({
  avatar: [
    {
      validator: (rule: any, value: any, callback: any) => {
        // console.log("111");
        if (value == '') {
          callback(new Error(t('information.inputAvatar')))
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
        if (value == '') {
          callback(new Error(t('information.inputName')))
        } else if (value.length > 10) {
          callback(new Error(t('information.longName')))
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
        if (value == '') {
          callback()
        }
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (!reg.test(value)) {
          callback(new Error(t('information.inputEmail')))
        } else {
          callback()
        }
      },
      required: false,
      trigger: 'blur'
    }
  ],
  qq: [
    {
      validator: (rule: any, value: any, callback: any) => {
        // if (value == "") {
        //   callback(new Error(t('information.inputQQ')));
        // } else {
        callback()
        // }
      },
      required: false,
      trigger: 'blur'
    }
  ],
  signature: [
    {
      validator: (rule: any, value: any, callback: any) => {
        // if (value == "") {
        //   callback(new Error(t('information.inputSignature')));
        // } else {
        callback()
        // }
      },
      required: false,
      trigger: 'blur'
    }
  ],
  website: [
    {
      validator: (rule: any, value: any, callback: any) => {
        let reg =
          /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
        if (value && !reg.test(value)) {
          callback(new Error(t('information.inputWebsite')))
        } else {
          callback()
        }
      },
      required: false,
      trigger: 'blur'
    }
  ],
  introduction: [
    {
      validator: (rule: any, value: any, callback: any) => {
        // if (value == "") {
        //   callback(new Error(t('information.inputProfile')));
        // } else {
        callback()
        // }
      },
      required: false,
      trigger: 'blur'
    }
  ]
})
watch(user, () => {
  // 用作登录失效时，重新登录后
  getInfo()
})
const submit = () => {
  infoFormRef.value
    .validate()
    .then(() => {
      updateInformation(form).then(() => {
        user.setNickname(form.nickname)
        user.setAvatar(form.avatar)
        user.storageInfo()
        disable.value = true
      })
    })
    .catch((error: any) => {
      console.log('表单校验失败~')
    })
}
const getInfo = () => {
  getInformation().then((data: any) => {
      form.id = data.id
      form.nickname = data.nickname
      form.avatar = data.avatar
      form.email = data.email
      form.qq = data.qq
      form.signature = data.signature
      form.nickname = data.nickname
      form.website = data.website
      form.introduction = data.introduction
    })
}
const cancel = () => {
  disable.value = true
  getInfo()
}
onBeforeMount(() => {
  if (!user.getToken()) {
    console.log('登录失效~')
    ElMessage.warning(t("login.loginInvalid"))
    user.loginAgain()
    dialog.login = true
  } else {
    getInfo()
  }
})
</script>

<style lang="scss" scoped>
.information {
  .content {
    border-radius: 1.5rem;
    box-sizing: border-box;
    padding: 1rem 2rem;
    background-color: rgba(2555, 255, 255, 0.8);
    margin: 0 auto;
    .avatar {
      position: relative;
      .disabled {
        cursor: not-allowed;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        // background-color: red;
      }
    }
    .btn {
      text-align: center;
    }
    .el-form {
      margin: 0 auto;
    }
  }
}
@media screen and (max-width: 768px) {
  .information {
    .content {
      width: 95%;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .information {
    .content {
      width: 80%;
    }
  }
}

@media screen and (min-width: 992px) {
  .information {
    .content {
      width: 60%;
    }
  }
}
.dark {
  .content {
    background-color: rgb(13, 28, 30) !important;
  }
}
</style>
