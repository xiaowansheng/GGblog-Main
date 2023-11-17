<template>
  <div class="blogroll">
    <Header :cover="covers.Friend">
      <template #title>
        {{ $t("menu.blogroll") }}
      </template>
    </Header>
    <div class="content">
      <div class="links">
        <div class="title">
          <h2>{{ "LINKS" }}</h2>
        </div>
        <div class="friends">
          <FriendLink
            v-for="friend in friends"
            :key="friend.id"
            :friend="friend"
          />
        </div>
        <div
          class="more"
          v-show="total != 0 && total > friends.length"
        >
          <el-button link @click="getData"
            ><span>{{ $t("blogroll.more") }}</span></el-button
          >
        </div>
      </div>
      <div class="none" v-if="friends.length == 0">
        <p>{{ $t("blogroll.empty") }}</p>
      </div>
      <div class="apply">
        <div class="title">
          {{ $t("blogroll.addBlogroll") }}
        </div>
        <div class="exemple">
          <table>
            <tr>
              <th>{{ $t("blogroll.icon") }}：</th>
              <td>
                <el-avatar
                  shape="square"
                  :size="60"
                  fit="fit"
                  :src="website.icon"
                />
              </td>
            </tr>
            <tr>
              <th>{{ $t("blogroll.name") }}：</th>
              <td>{{ website.title }}</td>
            </tr>
            <tr>
              <th>{{ $t("blogroll.link") }}：</th>
              <td>{{website.website }}</td>
            </tr>
            <tr>
              <th>{{ $t("blogroll.author") }}：</th>
              <td>{{ author.nickname}}</td>
            </tr>
            <tr>
              <th>{{ $t("blogroll.introduction") }}：</th>
              <td>{{ website.introduction }}</td>
            </tr>
          </table>
        </div>
        <div class="form">
          <div class="title">
            <el-button type="primary" @click="dialogVisible = true">{{$t('blogroll.exchange')}}</el-button>
          </div>

          <FriendLinkForm
            :visible="dialogVisible"
            @close="dialogVisible = false"
          />
        </div>
      </div>
      <div class="comment">
        <Comment :topicType="TopicType.blogroll" :topicId="0" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/layout/header/index.vue";
import FriendLink from "./friendLink.vue";

import Comment from "@/components/comment/index.vue";
import { TopicType } from "@/enums/topic";
import FriendLinkForm from "./friendLinkForm.vue";
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue"
import { useConfigStoreHook } from "@/store/modules/config"
import { getFriendPage } from "@/api/friend"
defineOptions({
  name: 'Friend'
})
const covers = computed(() => {
  return useConfigStoreHook().covers
});
const website = computed(() => {
  return useConfigStoreHook().website
});
const author = computed(() => {
  return useConfigStoreHook().author
});
const imglogo="@/assets/favicon.jpg"
const params = reactive({
  page: 1,
  limit: 12,
});
const total=ref(0)
const friends: any = reactive([]);
const loading = ref(false);
const getData = () => {
  if (loading.value) {
    return;
  }
  loading.value = true;
  getFriendPage(params)
    .then((data: any) => {
      total.value = data.total;
      data.list.forEach((e: any) => {
        friends.push(e);
      });
      params.page++;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};
const dialogVisible = ref(false);
onBeforeMount(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.blogroll {
  .more {
    padding: 1.5rem 0;
    span {
      padding: 0.5rem 1rem;
      font-size: 1.6rem;
    }
    text-align: center;
  }
  .content {
    box-sizing: border-box;
    border-radius: 15px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0.5rem;
    .title {
      font-size: 1.8rem;
      font-weight: bold;
      margin: 1.5rem 0 1rem 0;
    }
    .links {
      padding: 0 1rem;
      // background-color: rgb(255, 255, 255);
      h2 {
        font-size: 1.8rem;
        // margin: 0;
        // padding: 0;
      }
      .friends > div {
        // margin: 1.5rem;
      }
      .friends {
        display: grid;
      }
    }
    .none {
      p {
        padding: 2rem 1rem;
        font-size: 1.8rem;
        text-align: center;
      }
    }
    .apply {
      // background-color: red;
      margin: 4rem 1.5rem 0 1.5rem;
      .exemple {
        font-size: 1.4rem;
        padding: 1rem 2rem;
        border-radius: 15px;
        background-color: rgb(233, 242, 247);

        th,
        td {
          padding: 0.3rem 0;
        }
      }
      .form {
        .title {
          text-align: center;
          color: rgb(64, 173, 166);
          .el-button {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .blogroll {
    .content {
      width: 95%;
      .links {
        .friends {
          // grid-column-gap: 1rem;
          grid-row-gap: 0.8rem;
        }
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .blogroll {
    .content {
      width: 85%;
      .links {
        .friends {
          grid-template-columns: repeat(2, 1fr);

          grid-column-gap: 1.5rem;
          grid-row-gap: 1rem;
        }
      }
    }
  }
}
@media screen and (min-width: 992px) {
  .blogroll {
    .content {
      width: 70%;
      .links {
        .friends {
          grid-template-columns: repeat(3, 1fr);

          grid-column-gap: 1rem;
          grid-row-gap: 1rem;
        }
      }
    }
  }
}

.dark {
  .blogroll {
    // background-color: black;
    .content {
      background-color: rgb(13, 28, 30) !important;
      .exemple {
        background-color: rgb(23, 44, 47) !important;
      }
    }
  }
}
</style>
