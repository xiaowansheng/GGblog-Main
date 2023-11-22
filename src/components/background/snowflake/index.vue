<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  name: 'Snowflake'
})
// 获取Canvas元素
const canvasRef = ref()
let ctx: CanvasRenderingContext2D

/* 定义x为窗口宽度，y为窗口高度 */
let x = 0,
  y = 0
/* 定义数组，是为了存储每一片雪的信息 */
let arr: any[] = []
/* 假设有600片雪 */
let num = 600
/* 创建image元素 */
let img = new Image()
/* 设置雪花的地址，只有雪花是用图片表示 */
img.src = '/images/snowflake.png'
const draw = () => {
  /* 遍历数组 */
  for (let i = 0; i < num; i++) {
    let yuan = arr[i]
    /* 创建路径 */
    ctx.beginPath()
    /* 给雪设置颜色 */
    ctx.fillStyle = yuan.color
    /* 绘制雪 */
    ctx.arc(yuan.x, yuan.y, yuan.r, 0, 2 * 3.14, false)
    /* 如果i%30==0才绘制雪花，雪花不用太多 */
    if (i % 30 == 0) {
      /* 绘制雪花图片 */
      ctx.drawImage(img, yuan.x, yuan.y, yuan.r * 10, yuan.r * 10)
    }
    /* 填充路径 */
    ctx.fill()
  }
}

const updated = () => {
  for (let i = 0; i < num; i++) {
    let yuan = arr[i]
    /* x轴位置+0.1，变化小点 */
    yuan.x = yuan.x + 0.1
    /* y轴位置+自身半径一半，这样越大的雪走越快 */
    yuan.y = yuan.y + yuan.r / 2
    /* 如果学已经走出窗口 */
    if (yuan.y > y) {
      /* 重新给雪数组赋值 */
      arr[i] = {
        x: x * Math.random(),
        y: -10,
        r: Math.random() * 5,
        color: `rgba(255,255,255,${Math.random()})`
      }
    }
  }
}
// 设置Canvas的宽度和高度
const resizeCanvas = () => {
  x = canvasRef.value.width = window.innerWidth
  y = canvasRef.value.height = window.innerHeight
}
const render = () => {
  /* 清屏 */
  ctx.clearRect(0, 0, x, y)
  /* 绘制 */
  draw()
  /* 更新 */
  updated()

  // 使用requestAnimationFrame方法进行高效的动画渲染，保证在浏览器的刷新频率下去更新动画
  window.requestAnimationFrame(render)
}
onMounted(() => {
  // 获取窗口宽高
  resizeCanvas()
  // 获取CTX
  ctx = canvasRef.value.getContext('2d')
  // 始化数组，给每片雪花定义随机位置坐标（x，y）与半径（r）与一个颜色（color）
  for (let i = 0; i < num; i++) {
    arr.push({
      x: x * Math.random(),
      y: y * Math.random(),
      r: Math.random() * 5,
      color: `rgba(255,255,255,${Math.random()})`
    })
  }
  render()
  // setInterval(function () {
  //   /* 清屏 */
  //   ctx.clearRect(0, 0, x, y)
  //   /* 绘制 */
  //   draw()
  //   /* 更新 */
  //   updated()
  // }, 15)
  /* 绑定窗口大小发生改变事件，让canvas随时铺满浏览器可视区 */
  window.addEventListener('resize', resizeCanvas)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>

<style lang="scss" scoped></style>
