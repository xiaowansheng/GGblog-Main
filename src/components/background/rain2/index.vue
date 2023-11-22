<script setup lang="ts">
import { onMounted, ref } from 'vue'
class Drop {
  ctx: CanvasRenderingContext2D
  x: number = 0
  y: number = 0
  vy: number = 0
  l: number = 0
  r: number = 0
  vr: number = 0
  a: number = 0
  va: number = 0
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }
  init() {
    this.x = this.random(0, window.innerWidth)
    this.y = 0
    this.vy = this.random(4, 5)
    this.l = this.random(0.8 * window.innerHeight, 0.9 * window.innerHeight)
    this.r = 1
    this.vr = 1
    this.a = 1
    this.va = 0.96
  }

  draw() {
    if (this.y > this.l) {
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
      this.ctx.strokeStyle = `rgba(0, 255, 255, ${this.a})`
      this.ctx.stroke()
    } else {
      this.ctx.fillStyle = 'rgba(0, 255, 255,0.5)'
      this.ctx.fillRect(this.x, this.y, 2, 10)
    }

    this.update()
  }

  update() {
    if (this.y < this.l) {
      this.y += this.vy
    } else {
      if (this.a > 0.03) {
        this.r += this.vr
        if (this.r > 50) {
          this.a *= this.va
        }
      } else {
        this.init()
      }
    }
  }

  random(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }
}
// 只有观赏作用
defineOptions({
  name: 'Rain'
})
// 获取Canvas元素
const canvasRef = ref()
let ctx: CanvasRenderingContext2D
let x = 0,
  y = 0
const drops: Drop[] = []
const createDrops = () => {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const drop = new Drop(ctx)
      drop.init()
      drops.push(drop)
    }, i * 300)
  }
}

const move = () => {
  const drawBackground = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, x, y)
  }

  const drawDrops = () => {
    for (let k = 0; k < drops.length; k++) {
      drops[k].draw()
    }
  }

  const animationLoop = () => {
    drawBackground()
    drawDrops()
    requestAnimationFrame(animationLoop)
  }

  animationLoop()
}

// 设置Canvas的宽度和高度
const resizeCanvas = () => {
  x = canvasRef.value.width = window.innerWidth
  y = canvasRef.value.height = window.innerHeight
}
onMounted(() => {
  // 获取CTX
  ctx = canvasRef.value.getContext('2d')
  // 获取窗口宽高
  resizeCanvas()
  createDrops()
  move()
  window.addEventListener('resize', resizeCanvas)
})
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>

<style lang="scss" scoped>
canvas {
  z-index: 999999;
}</style>
