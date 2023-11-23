<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { throttleFunction } from '@/utils/tool';
defineOptions({
  name: 'ReadProgress'
})
const readRef = ref()
const percent = ref<string>('0%')
let scrollHeight: number = 0
let clientHeight: number = 0
let scrollTop: number = 0
const computeScrollHeight = () => {
  // console.log('监听滚动')
  scrollHeight = document.documentElement.scrollHeight
  clientHeight = document.documentElement.clientHeight
  scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  readRef.value.style.width = +(scrollTop / (scrollHeight - clientHeight)).toFixed(2) * 100 + '%'
  percent.value = readRef.value.style.width
}
// 使用节流函数，避免触发过于频繁
const throttleFunctionImpl=throttleFunction(computeScrollHeight,50)
onMounted(() => {
  // 添加滚动监听器
  window.addEventListener('scroll', throttleFunctionImpl)
})
onUnmounted(() => {
  // 去除滚动监听器
  window.removeEventListener('scroll', throttleFunctionImpl)
})
</script>

<template>
  <div class="read_pro">
    <div class="percent">{{ percent }}</div>
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
  // border-radius:1.5rem;

  background-color: #75f1d2;
  z-index: 9;
}
.percent {
  line-height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  z-index: 10;
}
</style>
