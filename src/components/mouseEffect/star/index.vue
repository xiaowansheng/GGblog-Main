<script setup lang="ts">
import { ref, onMounted } from 'vue'

/**
 * Particle
 */
class Particle {
  character = '*'
  lifeSpan = 120 // ms
  initialStyles = {
    position: 'fixed',
    display: 'inline-block',
    top: '0px',
    left: '0px',
    pointerEvents: 'none',
    touchAction: 'none',
    zIndex: '10000000',
    fontSize: '25px',
    willChange: 'transform'
  }

  velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 1 }
  position = { x: 0, y: 0 }
  element: HTMLElement | null = null

  init(x: number, y: number, color: string) {
    this.position = { x: x + 10, y: y + 10 }
    this.initialStyles.color = color

    this.element = document.createElement('span')
    this.element.innerHTML = this.character
    this.applyProperties(this.element, this.initialStyles)
    this.update()

    document.querySelector('.js-cursor-container')?.appendChild(this.element)
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.lifeSpan--

    if (this.element) {
      this.element.style.transform = `translate3d(${this.position.x}px,${
        this.position.y
      }px, 0) scale(${this.lifeSpan / 120})`
    }
  }

  die() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }
  }

  applyProperties(target: HTMLElement, properties: Record<string, string>) {
    for (const key in properties) {
      target.style[key] = properties[key]
    }
  }
}
defineOptions({
  name: 'Star'
})

const possibleColors = ['#D61C59', '#E7D84B', '#1B8798']
let width = window.innerWidth
let height = window.innerHeight
const cursor = ref({ x: width / 2, y: width / 2 })
const particles: Particle[] = []

function addParticle(x: number, y: number, color: string) {
  const particle = new Particle()
  particle.init(x, y, color)
  particles.push(particle)
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update()
  }

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

function init() {
  bindEvents()
  loop()
}

function bindEvents() {
  document.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onWindowResize)
}

function onWindowResize(e: Event) {
  width = window.innerWidth
  height = window.innerHeight
}

function onMouseMove(e: MouseEvent) {
  cursor.value.x = e.clientX
  cursor.value.y = e.clientY

  addParticle(
    cursor.value.x,
    cursor.value.y,
    possibleColors[Math.floor(Math.random() * possibleColors.length)]
  )
}
onMounted(() => {
  init()
})
</script>

<template>
  <div><span class="js-cursor-container"></span></div>
</template>

<style lang="scss" scoped></style>
