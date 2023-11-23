<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
// 只能作为单独页面观赏
// TODO 树叶左右飘动失效
defineOptions({
  name: 'Leaf'
})
// 获取Canvas元素
const canvasRef = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null

/* 定义x为窗口宽度，y为窗口高度 */
let x = 0,
  y = 0
/* 创建image元素 */
let img = new Image()
/* 设置雪花的地址，只有雪花是用图片表示 */
img.src = '/images/leaf.png'
let width: number = 0
let height: number = 0
let centerX: number = 0
let centerY: number = 0
const leafs: any[] = []
const count = 100
function setupCanvas(): void {
  // 获取CTX
  ctx = canvasRef.value!.getContext('2d')
  width = canvasRef.value!.width = window.innerWidth
  height = canvasRef.value!.height = window.innerHeight
  centerX = width / 2
  centerY = height / 2
}

function createLeafs(): void {
  for (let i = 0; i < count; i++) {
    const angle = 15 + Math.random() * 45
    const dir = [-1, 1][Math.floor(Math.random() * 2)]

    leafs.push({
      x: Math.random() * width,
      y: Math.random() * height,
      w: 40,
      h: 40 * (img.height / img.width),
      v: 20 / angle,
      a: angle,
      d: dir,
      anim: true
    })
  }
}

function update(dt: number): void {
  for (let i = 0; i < leafs.length; i++) {
    if (leafs[i].anim) {
      leafs[i].y += leafs[i].v

      if (leafs[i].y > height) {
        // console.log(`${leafs[i].y} > ${height}：`, leafs[i].y > height)
        // console.log('height', height)
        // console.log('恢复：', leafs[i].y)

        leafs[i].y = 0
        leafs[i].x = Math.random() * width
      }
    }
  }
}

function draw(dt: number = 0): void {
  requestAnimationFrame(() => draw(dt))
  update(dt)
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  for (let i = 0; i < leafs.length; i++) {
    ctx.save()

    if (leafs[i].anim) {
      ctx.translate(leafs[i].x, leafs[i].y)

      ctx.rotate((leafs[i].d * Math.sin(dt * 0.002 * i * 0.01) * leafs[i].a * Math.PI) / 180)
    }

    ctx.globalAlpha = Math.max(0, leafs[i].y * 0.1)
    ctx.drawImage(img,  -leafs[i].w / 2, 0, leafs[i].w, leafs[i].h)

    ctx.restore()
  }
}

// /* 创建image元素 */
// let img = new Image()
// /* 设置雪花的地址，只有雪花是用图片表示 */
// img.src = '/images/drip.png'

onMounted(() => {
  // 获取窗口宽高
  setupCanvas()
  createLeafs()
  draw(1000)

  /* 绑定窗口大小发生改变事件，让canvas随时铺满浏览器可视区 */
  window.addEventListener('resize', setupCanvas)
})
onUnmounted(() => {
  window.removeEventListener('resize', setupCanvas)
})
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>

<style lang="scss" scoped>
// canvas {
//   z-index: 999999;
// }
</style>
