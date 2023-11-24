<template>
  <canvas ref="m"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Particle {
  x: number | null
  y: number | null
  xa: number
  ya: number
  max: number
}

const n = (el: HTMLElement, attr: string, defaultValue: string) =>
  el.getAttribute(attr) || defaultValue

const e = (tagName: string) => document.getElementsByTagName(tagName)

const t = () => {
  const scripts = e('script')
  const length = scripts.length
  const lastScript = scripts[length - 1]
  return {
    l: length,
    z: n(lastScript, 'zIndex', '-1'),
    o: n(lastScript, 'opacity', '0.5'),
    c: n(lastScript, 'color', '0,0,0'),
    n: n(lastScript, 'count', '99')
  }
}

const o = () => {
  a = m.value.width =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  c = m.value.height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

const i = () => {
  r.clearRect(0, 0, a, c)
  let n, e, t, o, m, l
  s.forEach((particle, x) => {
    particle.x += particle.xa
    particle.y += particle.ya
    particle.xa *= particle.x > a || particle.x < 0 ? -1 : 1
    particle.ya *= particle.y > c || particle.y < 0 ? -1 : 1
    r.fillRect(particle.x - 0.5, particle.y - 0.5, 1, 1)

    for (e = x + 1; e < u.length; e++) {
      n = u[e]
      if (n.x !== null && n.y !== null) {
        o = particle.x - n.x
        m = particle.y - n.y
        l = o * o + m * m

        if (l < n.max) {
          if (n === y && l >= n.max / 2) {
            particle.x -= 0.03 * o
            particle.y -= 0.03 * m
          }

          t = (n.max - l) / n.max
          r.beginPath()
          r.lineWidth = t / 2
          r.strokeStyle = `rgba(${d.c},${t + 0.2})`
          r.moveTo(particle.x, particle.y)
          r.lineTo(n.x, n.y)
          r.stroke()
        }
      }
    }
  })

  x(i)
}

let a: number, c: number
const u: Particle[] = []
const m = ref()
let r: CanvasRenderingContext2D
const d = t()
const l = 'c_n' + d.l
const x =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (n: FrameRequestCallback) {
    window.setTimeout(n, 1000 / 45)
  }
const w = Math.random
const y: Particle = { x: null, y: null, max: 20000 }

const s: Particle[] = []
const handleMouseMove = (event: MouseEvent) => {
  y.x = event.clientX
  y.y = event.clientY
}

const handleMouseOut = () => {
  y.x = null
  y.y = null
}

onMounted(() => {
  r = m.value.getContext('2d')
  o()

  for (let f = 0; f < parseInt(d.n); f++) {
    const h = w() * a
    const g = w() * c
    const v = 2 * w() - 1
    const p = 2 * w() - 1
    s.push({ x: h, y: g, xa: v, ya: p, max: 6000 })
  }

  u.push(...s, y)
  // setTimeout(() => i(), 100)
  i()
  window.onresize = o
  // 添加事件监听
  window.onmousemove = handleMouseMove
  window.onmouseout = handleMouseOut
}) // 在组件销毁时，移除事件监听
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseout', handleMouseOut)
})
</script>

<style scoped>
/* Add your styles here */
</style>
