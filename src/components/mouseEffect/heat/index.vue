<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
interface Heart {
  el: HTMLDivElement
  x: number
  y: number
  scale: number
  alpha: number
  color: string
}
defineOptions({
  name: 'Heat'
})
const hearts: Heart[] = []

function heartAnimation() {
  for (let i = 0; i < hearts.length; i++) {
    if (hearts[i].alpha <= 0) {
      document.body.removeChild(hearts[i].el)
      hearts.splice(i, 1)
    } else {
      hearts[i].y--
      hearts[i].scale += 0.004
      hearts[i].alpha -= 0.013
      hearts[i].el.style.cssText =
        'left:' +
        hearts[i].x +
        'px;top:' +
        hearts[i].y +
        'px;opacity:' +
        hearts[i].alpha +
        ';transform:scale(' +
        hearts[i].scale +
        ',' +
        hearts[i].scale +
        ') rotate(45deg);background:' +
        hearts[i].color +
        ';z-index:99999'
    }
  }
  requestAnimationFrame(heartAnimation)
}

function handleClick() {
  const originalClickHandler:any = typeof window.onclick === 'function' && window.onclick
  window.onclick = function (event) {
    originalClickHandler && originalClickHandler(event)
    createHeart(event)
  }
}

function createHeart(event) {
  const heartElement = document.createElement('div')
  heartElement.className = 'heart'
  hearts.push({
    el: heartElement,
    x: event.clientX - 5,
    y: event.clientY - 5,
    scale: 1,
    alpha: 1,
    color: getRandomColor()
  })
  document.body.appendChild(heartElement)
}

function injectStyles(styleString: string) {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  try {
    styleElement.appendChild(document.createTextNode(styleString))
  } catch (error) {
    styleElement.styleSheet.cssText = styleString
  }
  document.getElementsByTagName('head')[0].appendChild(styleElement)
}

function getRandomColor() {
  return (
    'rgb(' +
    ~~(255 * Math.random()) +
    ',' +
    ~~(255 * Math.random()) +
    ',' +
    ~~(255 * Math.random()) +
    ')'
  )
}

// Inject styles
onMounted(() => {
  injectStyles(
    ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
  )
  // Set up click handler and start animation
  handleClick()
  heartAnimation()
})

onMounted(() => {})

onBeforeMount(() => {
  // Clean up if needed
})
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
