<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { throttleFunction } from '@/utils/tool'

class SakuraList {
  list: Sakura[] = []

  push(sakura: Sakura): void {
    this.list.push(sakura)
  }

  update(): void {
    for (let i = 0, len = this.list.length; i < len; i++) {
      this.list[i].update()
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (let i = 0, len = this.list.length; i < len; i++) {
      this.list[i].draw(ctx)
    }
  }

  get(i: number): Sakura {
    return this.list[i]
  }

  size(): number {
    return this.list.length
  }
}
class Sakura {
  constructor(
    public x: number,
    public y: number,
    public s: number,
    public r: number,
    public fn: any
  ) {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    const xc = (40 * this.s) / 4
    ctx.translate(this.x, this.y)
    ctx.rotate(this.r)
    ctx.drawImage(img, 0, 0, 40 * this.s, 40 * this.s)
    ctx.restore()
  }

  update(): void {
    this.x = this.fn.x(this.x, this.y)
    this.y = this.fn.y(this.y, this.y)
    this.r = this.fn.r(this.r)
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
      this.r = getRandom('fnr')
      if (Math.random() > 0.4) {
        this.x = getRandom('x')
        this.y = 0
        this.s = getRandom('s')
        this.r = getRandom('r')
      } else {
        this.x = window.innerWidth
        this.y = getRandom('y')
        this.s = getRandom('s')
        this.r = getRandom('r')
      }
    }
  }
}

defineOptions({
  name: 'Sakura'
}) // 获取Canvas元素
const canvasRef = ref()
let ctx: CanvasRenderingContext2D /* 定义x为窗口宽度，y为窗口高度 */
let x = 0,
  y = 0
const stop = ref<number | null>(null)
const staticx = ref(true)
const img = new Image()
img.src = '/images/sakura.png'

function getRandom(option: string): any {
  let ret, random
  switch (option) {
    case 'x':
      ret = Math.random() * window.innerWidth
      break
    case 'y':
      ret = Math.random() * window.innerHeight
      break
    case 's':
      ret = Math.random()
      break
    case 'r':
      ret = Math.random() * 6
      break
    case 'fnx':
      random = -0.5 + Math.random() * 1
      ret = function (x: number, y: number): number {
        return x + 0.5 * random - 1.7
      }
      break
    case 'fny':
      random = 1.5 + Math.random() * 0.7
      ret = function (x: number, y: number): number {
        return y + random
      }
      break
    case 'fnr':
      random = Math.random() * 0.03
      ret = function (r: number): number {
        return r + random
      }
      break
  }
  return ret
}

function startSakura(): void {
  // 获取CTX
  ctx = canvasRef.value.getContext('2d')
  let requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame

  staticx.value = true
  const sakuraList = new SakuraList()
  for (let i = 0; i < 50; i++) {
    const sakura = createSakura()
    sakura.draw(ctx)
    sakuraList.push(sakura)
  }
  const updateAnimation = function () {
    ctx.clearRect(0, 0, x, y)
    sakuraList.update()
    sakuraList.draw(ctx)
    stop.value = requestAnimationFrame(updateAnimation)
  }
  updateAnimation()
}

function createSakura(): Sakura {
  const randomX = getRandom('x')
  const randomY = getRandom('y')
  const randomR = getRandom('r')
  const randomS = getRandom('s')
  const randomFnx = getRandom('fnx')
  const randomFny = getRandom('fny')
  const randomFnR = getRandom('fnr')
  return new Sakura(randomX, randomY, randomS, randomR, {
    x: randomFnx,
    y: randomFny,
    r: randomFnR
  })
}
// 设置Canvas的宽度和高度
const resizeCanvas = () => {
  x = canvasRef.value.width = window.innerWidth
  y = canvasRef.value.height = window.innerHeight
}
const resizeThrottle = throttleFunction(resizeCanvas, 100)

function stopp(): void {
  if (staticx.value) {
    // const child = document.getElementById('canvas_sakura')
    // child?.parentNode?.removeChild(child)
    window.cancelAnimationFrame(stop.value as number)
    staticx.value = false
  }
}

onMounted(() => {
  resizeCanvas()
  img.onload = function () {
    startSakura()
  }
  window.addEventListener('resize', resizeThrottle)
})

onUnmounted(() => {
  // const child = document.getElementById('canvas_sakura')
  // child?.parentNode?.removeChild(child)
  stopp()
  window.removeEventListener('resize', resizeThrottle)
})
</script>

<style scoped>
/* Add your styles here */
</style>
