<template>
  <div class="about">
    <Header :cover="covers.About">
      <template #title>
        {{ $t('menu.about') }}
      </template>
    </Header>
    <div class="content">
      <div class="information">
        <div class="contact">
          <div class="avatar">
            <el-avatar :size="150" :src="author.avatar" />
          </div>
          <div class="name">
            {{ author.nickname }}
          </div>
          <div class="contact-details">
            <a
              class="qq"
              target="_blank"
              v-if="contact.QQ && contact.QQ.show"
              :href="`tencent://message/?uin=${contact.QQ.value}&Site=qq&Menu=yes`"
            >
              <svg-icon name="qq" iconStyle="width:50px;height:50px"></svg-icon>
            </a>
            <a
              class="wechat"
              target="_blank"
              v-if="contact.Wechat && contact.Wechat.show"
              :href="`weixin://${contact.Wechat.value}`"
            >
              <svg-icon name="wechat" iconStyle="width:50px;height:50px"></svg-icon>
            </a>
            <a
              class="weibo"
              target="_blank"
              v-if="contact.Weibo && contact.Weibo.show"
              :href="`https://weibo.com/${contact.Weibo.value}`"
            >
              <svg-icon name="weibo" iconStyle="width:50px;height:50px"></svg-icon>
            </a>
            <a
              class="email"
              target="_blank"
              v-if="contact.Email && contact.Email.show"
              :href="`mailto:${contact.Email.value}`"
            >
              <svg-icon name="mail" iconStyle="width:50px;height:50px"></svg-icon>
            </a>

            <a
              class="facebook"
              target="_blank"
              v-if="contact.Facebook && contact.Facebook.show"
              :href="`http://facebook.com/${contact.Facebook.value}`"
            >
              <svg-icon name="facebook" iconStyle="width:50px;height:50px"></svg-icon>
            </a>
            <a
              class="twitter"
              target="_blank"
              v-if="contact.Twitter && contact.Twitter.show"
              :href="`https://twitter.com/${contact.Twitter.value}`"
            >
              <svg-icon name="twitter" iconStyle="width:50px;height:50px"></svg-icon
            ></a>
            <a
              class="telegram"
              target="_blank"
              v-if="contact.Telegram && contact.Telegram.show"
              :href="`https://t.me/${contact.Telegram.value}`"
            >
              <svg-icon name="telegram" iconStyle="width:50px;height:50px"></svg-icon
            ></a>
            <a
              class="instagram"
              target="_blank"
              v-if="contact.Instagram && contact.Instagram.show"
              :href="`https:/instagram.com/${contact.Instagram.value}`"
            >
              <svg-icon name="instagram" iconStyle="width:50px;height:50px"></svg-icon>
            </a>
            <a
              class="github"
              target="_blank"
              v-if="contact.Github && contact.Github.show"
              :href="`https://github.com/${contact.Github.value}`"
            >
              <svg-icon name="github" iconStyle="width:50px;height:50px"></svg-icon>
            </a>
            <a
              class="gitee"
              target="_blank"
              v-if="contact.Gitee && contact.Gitee.value"
              :href="`https://gitee.com/${contact.Gitee.value}`"
            >
              <svg-icon name="gitee" iconStyle="width:50px;height:50px"></svg-icon>
            </a>
          </div>
        </div>

        <div
          ref="mdDivRef"
          id="profile"
          class="profile markdown-body md cherry-markdown"
          v-html="aboutMd"
        ></div>
        <div class="comment">
          <Comment :topicType="TopicType.about" :topicId="0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layout/header/index.vue'

import Comment from '@/components/comment/index.vue'
import { TopicType } from '@/enums/topic'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { getAbout } from '@/api/config'
import { useConfigStoreHook } from '@/store/modules/config'
import { mdConvertToHtml } from '@/utils/markdown'

import { useModuleStoreHook } from '@/store/modules/module'
// import Vditor from 'vditor'
defineOptions({
  name: 'About'
})
const covers = computed(() => {
  return useConfigStoreHook().covers
})
const author = computed(() => {
  return useConfigStoreHook().author
})
const contact = computed((): any => {
  return useConfigStoreHook().contact
})
const dialog = useModuleStoreHook()
const idName = 'markdown-about'
const mdDivRef = ref<HTMLDivElement>()
const aboutMd = ref('')
const getData = () => {
  dialog.loading++
  getAbout()
    .then((data: any) => {
      aboutMd.value = data
      // convetToMarkdown()
      // mdShow(idName,data)
      aboutMd.value = mdConvertToHtml(data)
      // if (data) {
      // let profileDiv = document.getElementById('profile')

      // }
      dialog.loading--
    })
    .catch(() => {
      dialog.loading--
    })
}
const convetToMarkdown = () => {
  // Vditor.preview(mdDivRef.value, aboutMd.value, {
  //   mode: 'light',
  //   anchor: 1,
  //   hljs: {
  //     enable: true,
  //     lineNumber: true,
  //     style: 'vs'
  //   },
  //   math: {
  //     engine: 'KaTeX'
  //   },
  //   markdown: {
  //     autoSpace: true,
  //     fixTermTypo: true,
  //     listStyle: true,
  //     mark: true
  //   },
  //   // theme:{
  //   //   current:'Dark'
  //   // },
  //   speech: {
  //     enable: true
  //   },
  //   renderers: {
  //     renderHeading: (node: any, entering: any) => {
  //       const id = Lute.GetHeadingID(node)
  //       if (entering) {
  //         return [
  //           `<h${node.__internal_object__.HeadingLevel} id="${id}" class="vditor__heading"><span class="prefix"></span><span>`,
  //           Lute.WalkContinue
  //         ]
  //       } else {
  //         return [
  //           `</span><a id="vditorAnchor-${id}" class="vditor-anchor" href="#${id}"><svg viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a></h${node.__internal_object__.HeadingLevel}>`,
  //           Lute.WalkContinue
  //         ]
  //       }
  //     }
  //   }
  // })
}
onBeforeMount(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.comment {
  margin-top: 2rem;
}
.about {
  .content {
    margin: 0 auto;
    border-radius: 1.5rem;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 1rem 0 1.5rem 0;
    .information > div {
      margin: 0.3rem 0;
      padding: 0.6rem;
    }
    .information {
      .avatar {
        text-align: center;
      }
      .name {
        text-align: center;
        font-size: 2.3rem;
        font-weight: bold;
        margin: 1.5rem;
      }
      .contact-details {
        display: flex;
        // background-color: red;
        flex-wrap: wrap;
        justify-content: center;
        // text-align: center;
        a {
          padding: 0.3rem;
        }
      }
      .profile {
        margin-top: 3rem;
        margin: 0 auto;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .about {
    .content {
      width: 95%;
      .information {
        .contact {
          .contact-details {
          }
        }
        .profile {
          padding: 0 1.2rem;
        }
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .about {
    .content {
      width: 88%;
      .information {
        .profile {
          padding: 0 2rem;
        }
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .about {
    .content {
      width: 78%;
      .information {
        .profile {
          padding: 0 3.5rem;
        }
      }
    }
  }
}
.dark {
  .content {
    background-color: rgb(13, 28, 30) !important;
    .github {
      color: rgb(217, 214, 214) !important;
    }
  }
}
</style>
