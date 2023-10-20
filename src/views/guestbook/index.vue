<template>
  <div class="guestbook" :style="`background-image: url('${covers.Guestbook}');`">
    <div class="title">
      <h2>{{ '留言板' }}</h2>
    </div>
    <div class="leave-word">
      <vue-danmaku
        v-model:danmus="leaveWords"
        useSlot
        :loop="true"
        :speeds="150"
        :top="5"
        :debounce="200"
        :isSuspend="true"
        randomChannel
        @list-end="getData()"
        style="height: 100%; width: 100%"
      >
        <template v-slot:dm="{ index, danmu }">
          <span class="danmu-item"
            ><el-avatar
              :src="
                danmu.type == 'user'
                  ? danmu.userAvatar ?? avatar.User
                  : danmu.type == 'visitor'
                  ? avatar.Visitor
                  : avatar.Anonymous
              "
            />
            <span v-if="danmu.userNickname">{{ danmu.userNickname }}：</span>
            {{ danmu.content }}</span
          >
        </template>
      </vue-danmaku>
    </div>
    <div class="form">
      <div class="menu">
        <el-button @click="leaveWordListVisible = true" type="info">{{ '查看留言' }}</el-button>
        <el-dialog v-model="leaveWordListVisible" :title="'留言列表'" id="leave-word-list">
          <div class="list">
            <div class="item" v-for="item in leaveWords" :key="item.id">
              <div class="avatar">
                <el-avatar
                  :size="65"
                  :src="
                    item.type == 'user'
                      ? item.userAvatar ?? avatar.User
                      : item.type == 'visitor'
                      ? avatar.Visitor
                      : avatar.Anonymous
                  "
                />
              </div>
              <div class="info">
                <div class="nickname">
                  {{ item.userNickname }}
                </div>
                <div class="words">
                  {{ item.content }}
                </div>
                <div class="date">
                  {{ item.createTime }}
                </div>
              </div>
            </div>
            <!-- <div class="more">
              <el-button v-show="leaveWords.length < total" link @click="getData">{{
                '查看更多'
              }}</el-button>
            </div> -->
          </div>
          <!-- <template #footer>
            <span class="dialog-footer">
              <el-button @click="leaveWordListVisible = false">{{
                "关闭"
              }}</el-button>
            </span>
          </template> -->
        </el-dialog>
      </div>
      <el-input
        v-model="leaveWordForm.content"
        @keyup.enter="submit"
        placeholder="Please input"
        clearable
      />
      <el-button @click="submit" type="primary">{{ '发送' }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import vueDanmaku from 'vue3-danmaku'

import { useConfigStoreHook } from '@/store/modules/config'
import { getLeaveWordPage, addLeaveWord } from '@/api/guestbook'
const covers = computed(() => {
  return useConfigStoreHook().covers
})
const avatar = computed(() => {
  return useConfigStoreHook().avatar
})
const leaveWordForm = reactive({
  type: 'anonymous', //匿名留言
  content: ''
})
const params = reactive({
  page: 1,
  limit: 30
})
const total = ref(0)
const leaveWords: any = reactive<Array<Object>>([])
const danmus = ref<any>([])

const leaveWordListVisible = ref(false)
const getData = () => {
  if (total.value != 0 && leaveWords.length >= total.value) {
    clearTimer()
    return
  }
  getLeaveWordPage(params).then((data: any) => {
    total.value = data.total
    data.list.forEach((e: any) => {
      if (e.type == 'user') {
        if (!e.userAvatar) {
          e.userAvatar = avatar.User
        }
      } else if (e.type == 'visitor') {
        e.userAvatar = avatar.User
        e.userNickname = e.nickname
      } else if (e.type == 'anonymous') {
        e.userAvatar = avatar.Anonymous
        e.userNickname = ''
      }
      leaveWords.push(e)
    })
    // refreshDanmus()
    params.page++
    // 定时获取留言
    startTimer()
  })
}
// const refreshDanmus = () => {
//   const arr:string[]=[]
//     leaveWords.forEach((e: any) => {
//       arr.push(e.content);
//     });
//     danmus.value=arr
// }
const submit = () => {
  if (!leaveWordForm.content) {
    return
  }
  addLeaveWord(leaveWordForm).then((data: any) => {
    leaveWordForm.content = ''
    leaveWords.push(data)
    total.value++
    // refreshDanmus()
  })
}
let timer = null
const startTimer = () => {
  timer = setTimeout(() => {
    getData()
  }, 2000)
}
const clearTimer = () => {
  if (timer) {
    // clearInterval(timer)
    window.clearTimeout(timer)
  }
}
onMounted(() => {
  // startTimer()
  getData()
})
onUnmounted(() => {
  clearTimer()
})
</script>
<style lang="scss" scoped>
.guestbook {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  // background-image: url(http://pic1.win4000.com/wallpaper/2019-02-21/5c6e158e8c80b.jpg);
  // background-image: url('http://pic1.win4000.com/wallpaper/2020-03-18/5e71c5ef1fba0.png');

  // background-image: url("assets/imgs/guestbook01.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  .title {
    position: absolute;
    left: 0;

    right: 0;
    margin: 0 auto;
    margin-top: 9rem;
    text-align: center;
    h2 {
      letter-spacing: 0.6rem;
      margin: 0;
    }
  }
  .leave-word {
    // position: absolute;
    // background-color: rgba(207, 40, 40, 0.4);
    margin: 0 auto;

    height: 100%;
    // margin-top: 5rem;
    // left: 0;
    // right: 0;
    // width: 80%;
    .danmu-item {
      display: flex;
      align-content: center;
      justify-content: center;
      align-items: center;
    }
  }
  .form {
    display: flex;

    .el-input {
      // padding: 0.5rem 0;
      font-size: 1.5rem;
    }
    position: absolute;
    bottom: 5rem;
    left: 0;
    right: 0;
    margin: 0 auto;

    .menu {
      text-align: center;
      font-size: 1.2rem;
    }
  }
}

@media screen and (min-width: 768px) {
  .guestbook {
    .title {
      font-size: 1.8rem;

      h2 {
        padding: 0.5rem;
      }
    }
    .leave-word {
      padding: 8rem 0;
    }
    .content {
    }
    .form {
      max-width: 450px;
      min-width: 350px;
      .menu {
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .guestbook {
    .title {
      font-size: 1.5rem;
      h2 {
        padding: 0.2rem;
      }
    }
    .leave-word {
      padding: 6rem 0;
    }
    .form {
      max-width: 300px;
      min-width: 250px;
      .menu {
      }
    }
  }
}
</style>
<style lang="scss">
#leave-word-list {
  border-radius: 15px;
  .list {
    max-height: 450px;
    overflow-y: auto;
    overflow-x: hidden;
    // TODO 元素内样式没调整好
    .item {
      background-color: rgb(204, 219, 219);
      max-width: 35rem;
      display: flex;

      margin: 0rem auto;
      border-radius: 12px;
      .info {
        margin-left: 1rem;
        text-align: left;
        padding: 0.5rem;
        .nickname {
          font-weight: bold;
          // margin-top: 1rem;
        }
        .words {
          font-size: 1.3rem;
          margin-top: 0.5rem;
          letter-spacing: 0.05rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; /*显示行数*/
        }
        .date {
          text-align: right;
          font-size: 1.2rem;
        }
      }
    }
    .item:not(:first-of-type) {
      margin-top: 1rem;
    }
    // .more {
    //   button {
    //     margin-top: 0.5rem;
    //     font-size: 1.5rem;
    //     span {
    //       padding: 0.5rem;
    //     }
    //   }
    // }
  }
}
@media screen and (min-width: 1100px) {
  #leave-word-list {
    --el-dialog-width: 35%;
  }
}
@media screen and (min-width: 768px) and (max-width: 1100px) {
  #leave-word-list {
    --el-dialog-width: 55%;
  }
}
@media screen and (max-width: 768px) {
  #leave-word-list {
    --el-dialog-width: 85%;
  }
}
</style>
