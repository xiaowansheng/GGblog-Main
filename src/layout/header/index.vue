<template>
  <div class="header">
    <div class="main" :style="url">
      <div class="show">
        <h2 class="title">
          <slot name="title"></slot>
        </h2>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref, toRef } from 'vue'
defineOptions({
  name: 'Header'
})
const props = defineProps({
  cover: {
    required: false
  }
})
const url = computed(() => {
  return "background-image: url('" + props.cover + "');"
})
</script>

<style lang="scss" scoped>
.main::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.header {
  position: relative;
  .main {
    color: white;
    text-align: center;
    width: 100%;
    margin-bottom: 3rem;
    // background-color: cadetblue;

    background-size: cover;
    background-position: center;
    position: relative;
    .show {
      position: absolute;
      z-index: 1;
      top: 52%;
      bottom: 0;
      left: 0;
      right: 0;
      .title {
        padding: 0 1rem;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /*显示行数*/
      }
    }
    //     display: flex;
    // // text-align: center;
    // align-items: center;
    // justify-content: center;
  }
}
@media screen and (max-width: 768px) {
  .header {
    .main {
      height: 25rem;
      .show {
        .title {
          font-size: 2rem;
        }
        .content {
          font-size: 1.1rem;
        }
      }
    }
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .header {
    .main {
      height: 30rem;
      .show {
        .title {
          font-size: 2.5rem;
        }
        .content {
          font-size: 1.2rem;
        }
      }
    }
  }
}
@media screen and (min-width: 992px) {
  .header {
    .main {
      height: 36rem;
      .show {
        .title {
          font-size: 3rem;
        }
        .content {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
