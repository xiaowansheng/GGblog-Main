<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  name: 'ReadProgress'
})
const readRef = ref()
let scrollHeight = 0
let clientHeight = 0
let scrollTop = 0
const computeScrollHeight = () => {
  scrollHeight = document.documentElement.scrollHeight
  clientHeight = document.documentElement.clientHeight
  scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  readRef.value.style.width = +(scrollTop / (scrollHeight - clientHeight)).toFixed(2) * 100 + '%'
}
onMounted(() => {
  // 添加滚动监听器
  document.addEventListener('scroll', function (e) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    computeScrollHeight()
  })
})
onUnmounted(() => {
  // 去除滚动监听器
  document.removeEventListener("scroll",()=>{})
})
</script>

<template>
  <div class="read_pro">
    <div class="read_pro_inner" ref="readRef"></div>
  </div>
</template>

<style lang="scss" scoped>
.read_pro {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background-color: #dddddd;
}
.read_pro_inner {
  content: '';
  position: absolute;
  left: 0;
  height: 100%;
  background-color: #75f1d2;
}
</style>
