<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { throttleFunction } from '@/utils/tool'
/**
 * Particles
 */
class Particle {
  lifeSpan = 250 // ms
  initialStyles = {
    position: 'absolute',
    display: 'block',
    pointerEvents: 'none',
    zIndex: '10000000',
    width: '10px',
    height: '10px',
    background: '#e6f1f7',
    boxShadow: '-1px 0px #6badd3, 0px -1px #6badd3, 1px 0px #3a92c5, 0px 1px #3a92c5',
    borderRadius: '50%',
    willChange: 'transform'
  }

  velocity = {
    x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
    y: -0.4 + Math.random() * -1
  }
  position = { x: 0, y: 0 }
  element: HTMLElement | null = null

  init(x, y) {
    this.position = { x: x, y: y - 5 }

    this.element = document.createElement('span')

    this.element.style.left = this.position.x + 'px'
    this.element.style.top = this.position.y + 'px'
    applyProperties(this.element, this.initialStyles)
    this.update()
    // console.log('添加span', this.element)

    document.body.appendChild(this.element)
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // Update velocities
    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75
    this.velocity.y -= Math.random() / 600
    this.lifeSpan--
    // BUG 3D动画时，气泡位置和鼠标位置不一致，相差较多
    if (this.element) {
      this.element.style.transform = `translate3d(${this.position.x}px,${
        this.position.y
      }px,0) scale(${0.5 + (250 - this.lifeSpan) / 250})`
    }
  }

  die() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }
  }
}
let width: number = window.innerWidth
let height: number = window.innerHeight
const cursor = { x: width / 2, y: height / 2 }
const particles: Particle[] = []

function init() {
  bindEvents()
  loop()
}
const mouseMoveThrottle = throttleFunction(onMouseMove, 20)
const touchMoveThrottle = throttleFunction(onTouchMove, 20)
const resizeThrottle = throttleFunction(onWindowResize, 100)
// Bind events that are needed
function bindEvents() {
  document.addEventListener('mousemove', mouseMoveThrottle)
  document.addEventListener('touchmove', touchMoveThrottle)
  window.addEventListener('resize', resizeThrottle)
}

function onWindowResize(e) {
  width = window.innerWidth
  height = window.innerHeight
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    for (let i = 0; i < e.touches.length; i++) {
      addParticle(e.touches[i].clientX, e.touches[i].clientY)
    }
  }
}

function onMouseMove(e) {
  cursor.x = e.clientX
  cursor.y = e.clientY
  console.log(cursor)

  addParticle(cursor.x, cursor.y)
}

function addParticle(x, y) {
  const particle = new Particle()
  particle.init(x, y)
  particles.push(particle)
}

function updateParticles() {
  // Update
  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
  }

  // Remove dead particles
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].lifeSpan < 0) {
      particles[i].die()
      particles.splice(i, 1)
    }
  }
}

function loop() {
  requestAnimationFrame(loop)
  updateParticles()
}

/**
 * Utils
 */
// Applies css `properties` to an element.
function applyProperties(target, properties) {
  for (let key in properties) {
    target.style[key] = properties[key]
  }
}

onMounted(() => {
  init()
})
</script>
