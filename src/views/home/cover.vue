<template>
  <div class="cover" :style="cover">
    <div class="content">
      <h1>{{ website.homeTitle }}</h1>
      <!-- <p class="welcome">欢迎来到汍笙的博客空间~</p> -->
      <div>
        <p class="sentence">{{ sentence.hitokoto }}</p>
        <p v-show="sentence.from != null" class="sentence-from">
          <span class="occupy-space">{{ sentence.hitokoto }}</span
          ><span class="from"> {{ '—' + sentence.from }}</span>
        </p>
      </div>
    </div>
    <div class="bottom">
      <!-- <a href='#home-articles'> -->

      <span @click="scrollDown" class="arrow">
        <!-- <span class="iconfont icon-jiantouxia"></span> -->
        <!-- <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 L40 40 L70 10" stroke="white" stroke-width="10" fill="none" />
        </svg> -->
        <svg t="1696993434182" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3990" width="80" height="80"><path d="M857.088 224.256q28.672-28.672 69.12-28.672t69.12 28.672q29.696 28.672 29.696 68.608t-29.696 68.608l-382.976 380.928q-12.288 14.336-30.72 19.968t-38.912 4.608-40.448-8.704-34.304-22.016l-376.832-374.784q-29.696-28.672-29.696-68.608t29.696-68.608q14.336-14.336 32.256-21.504t36.864-7.168 37.376 7.168 32.768 21.504l313.344 309.248z" p-id="3991" fill="#cdcdcd"></path></svg>
      </span>
      <!-- </a> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import axios from 'axios'
// import { useStore } from 'vuex'
import { useConfigStoreHook } from '@/store/modules/config'
defineOptions({
  name: 'Cover'
})
const cover = computed(() => {
  return `background-image: url('${useConfigStoreHook().covers.Home}')`
})
const website = computed(()=>{
  return useConfigStoreHook().website
})
const sentence = ref({
  hitokoto: '',
  from: ''
})
const getSentence = () => {
  axios.get('https://v1.hitokoto.cn').then(({ data }: any) => {
    // console.log(data);
    sentence.value = data
  })
}
const scrollDown = () => {
  // const container = document.querySelector("#iframe");
  // if (container) {
  //   container.scrollTo(0, 0);
  // }
  window.scrollTo({
    behavior: 'smooth',
    top: document.documentElement.clientHeight
  })
}
onBeforeMount(() => {
  getSentence()
})
</script>

<style lang="scss" scoped>
.bottom {
  .arrow {
    position: relative;
    -moz-animation: mymove 1.5s infinite; /* Firefox */
    -webkit-animation: mymove 1.5s infinite; /* Safari and Chrome */
    -o-animation: mymove 1.5s infinite; /* Opera */
  }
}
@keyframes mymove {
  0% {
    top: 0px;
    // color: white;
  }
  50% {
    top: 15px;
    // color: rgb(206, 204, 204);
  }
  100% {
    top: 0px;
    // color: white;
  }
}
.cover {
  position: relative;
  // top: -3.78rem;
  // left: 0;
  // right: 0;
  height: 100vh;
  // background-attachment: fixed;
  text-align: center;
  color: #fff !important;
  // animation: header-effect 1s;
  background-position-x: center;
  background-position-y: center;
  // background-image: url("https://wbxnl-blog.oss-cn-chengdu.aliyuncs.com/images/230841jwLrL.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  .content {
    position: absolute;
    text-align: center;
    // background-color: aquamarine;
    top: 30%;
    left: 0;
    right: 0;

    h1 {
      letter-spacing: 0.25rem;
      font-size: 3rem;
    }
    // .welcome {
    //   font-size: 2rem;
    // }
    .sentence {
    }
    .from {
      font-size: 1.5rem;
      line-height: 200%;
    }
    .sentence,
    .occupy-space {
      font-size: 2rem;
    }
    .occupy-space {
      color: rgba(255, 255, 255, 0);
    }
  }
  .bottom {
    position: absolute;

    // background-color: red;
    left: 0;
    right: 0;

    .arrow {
      font-size: 2rem;
      padding: 0.5rem 2rem;
      // background-color: aqua;
      .iconfont {
        font-weight: bold;
        font-size: 2.5rem;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .cover {
    .sentence,
    .sentence-from {
      padding: 0 3rem;
    }
    .sentence-from {
      text-align: right;
      .occupy-space {
        display: none;
      }
    }
    .bottom {
      bottom: 8%;
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .cover {
    .sentence {
      padding: 0 5rem;
    }
    .sentence-from {
      padding: 0 9rem;
    }
    .sentence-from {
      text-align: right;
      .occupy-space {
        display: none;
      }
    }
    .bottom {
      bottom: 10%;
    }
  }
}
@media screen and (min-width: 992px) {
  .cover {
    .sentence,
    .sentence-from {
      padding: 0 8rem;
    }
    .bottom {
      bottom: 2.5%;
    }
  }
}
</style>
<style lang="scss">
//   #home-cover{
//  width: 100%;
//  height: 100%;
// }
</style>
