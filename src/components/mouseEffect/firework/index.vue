<script setup lang="ts">
import { onBeforeMount,onUnmounted, onMounted, ref } from 'vue'
interface Point {
  x: number
  y: number
}

class Ball {
  x: number
  y: number
  angle: number
  multiplier: number
  vx: number
  vy: number
  r: number
  color: string

  constructor(x = origin.x, y = origin.y) {
    this.x = x
    this.y = y
    this.angle = Math.PI * 2 * Math.random()
    if (longPressed.value) {
      this.multiplier = randBetween(14 + multiplier.value, 15 + multiplier.value)
    } else {
      this.multiplier = randBetween(6, 12)
    }
    this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle)
    this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle)
    this.r = randBetween(8, 12) + 3 * Math.random()
    this.color = colours[Math.floor(Math.random() * colours.length)]
  }

  update() {
    this.x += this.vx - normal.x
    this.y += this.vy - normal.y
    normal.x = (-2 / window.innerWidth) * Math.sin(this.angle)
    normal.y = (-2 / window.innerHeight) * Math.cos(this.angle)
    this.r -= 0.3
    this.vx *= 0.9
    this.vy *= 0.9
  }
}

defineOptions({
  name: 'Firework'
})
let balls: Ball[] = []
let longPressed = ref(false)
let longPress: ReturnType<typeof setTimeout> | null = null
let multiplier = ref(0)
let width = 0,
  height = 0
let origin: Point = { x: 0, y: 0 }
let normal: Point = { x: 0, y: 0 }
let ctx: CanvasRenderingContext2D | null = null
const colours = ['#F73859', '#14FFEC', '#00E0FF', '#FF99FE', '#FAF15D']
const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.setAttribute(
  'style',
  'width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;'
)
const pointer = document.createElement('span')
pointer.classList.add('pointer')
document.body.appendChild(pointer)

function updateSize() {
  if (!ctx) return
  canvas.width = window.innerWidth * 2
  canvas.height = window.innerHeight * 2
  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'
  ctx.scale(2, 2)
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  origin = {
    x: width / 2,
    y: height / 2
  }
  normal = {
    x: width / 2,
    y: height / 2
  }
}

function pushBalls(count = 1, x = origin.x, y = origin.y) {
  for (let i = 0; i < count; i++) {
    balls.push(new Ball(x, y))
  }
}

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * max) + min
}

function loop() {
  if (!ctx) return
  ctx.fillStyle = 'rgba(255, 255, 255, 0)'
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i]
    if (b.r < 0) continue
    ctx.fillStyle = b.color
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false)
    ctx.fill()
    b.update()
  }
  if (longPressed.value) {
    multiplier.value += 0.2
  } else if (!longPressed.value && multiplier.value >= 0) {
    multiplier.value -= 0.4
  }
  removeBall()
  requestAnimationFrame(loop)
}

function removeBall() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i]
    if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
      balls.splice(i, 1)
    }
  }
}
onMounted(() => {
  if (canvas.getContext && window.addEventListener) {
    ctx = canvas.getContext('2d')!
    updateSize()
    window.addEventListener('resize', updateSize, false)
    loop()
    window.addEventListener(
      'mousedown',
      function (e) {
        pushBalls(randBetween(10, 20), e.clientX, e.clientY)
        document.body.classList.add('is-pressed')
        longPress = setTimeout(function () {
          document.body.classList.add('is-longpress')
          longPressed.value = true
        }, 500)
      },
      false
    )
    window.addEventListener(
      'mouseup',
      function (e) {
        clearInterval(longPress!)
        if (longPressed.value) {
          document.body.classList.remove('is-longpress')
          pushBalls(
            randBetween(50 + Math.ceil(multiplier.value), 100 + Math.ceil(multiplier.value)),
            e.clientX,
            e.clientY
          )
          longPressed.value = false
        }
        document.body.classList.remove('is-pressed')
      },
      false
    )
    window.addEventListener(
      'mousemove',
      function (e) {
        let x = e.clientX
        let y = e.clientY
        pointer.style.top = y + 'px'
        pointer.style.left = x + 'px'
      },
      false
    )
  } else {
    console.log('canvas or addEventListener is unsupported!')
  }
})

onBeforeMount(() => {
  // Cleanup code if needed
})
onUnmounted(() => {})
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
