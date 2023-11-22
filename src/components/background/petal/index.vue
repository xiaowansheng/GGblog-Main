<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { throttleFunction } from '@/utils/tool'
interface SakuraProps {
  x: number
  y: number
  width: number
  height: number
  opacity: number
  rotate: number
  xSpeed: number
  ySpeed: number
  rotateSpeed: number
}
/**
 * 定义花瓣类
 */
class Sakura implements SakuraProps {
  ctx: any
  windowWidth: number
  windowHeight: number
  speedX = 0
  speedY = 1.5
  x: number
  y: number
  width: number
  height: number
  opacity: number
  rotate: number
  xSpeed: number
  ySpeed: number
  rotateSpeed: number
  // 构造方法
  constructor(ctx: any, width: number, height: number) {
    this.ctx = ctx
    this.windowWidth = width
    this.windowHeight = height
    // 随机生成花瓣的x, y坐标
    this.x = Math.random() * width
    this.y = Math.random() * height * 2 - height
    // 随机生成花瓣的宽高
    this.width = Math.random() * 15 + 20
    this.height = Math.random() * 15 + 20
    // 随机透明度
    this.opacity = this.width / 50
    // 设置一个随机数，后面实现旋转角度效果时会用到
    this.rotate = Math.random()
    // 速度初始化
    this.xSpeed = randomPlusOrMinus(Math.random() + this.speedX)
    this.ySpeed = Math.random() + this.speedY
    this.rotateSpeed = Math.random() * 0.02
  }
  // 重置属性
  resetField() {
    // 随机顶部位置
    this.x = Math.random() * this.windowWidth // 从头来
    // 自然出现
    this.y = -this.height
    this.rotate = Math.random()
    this.rotateSpeed = Math.random() * 0.02
    this.xSpeed = randomPlusOrMinus(Math.random() + this.speedX)
    this.ySpeed = Math.random() + this.speedY
  }

  // 绘制
  draw() {
    // 当花瓣超过canvasRef.value画布边界后，重新设置花瓣的坐标、速度、和转速
    // 实现花瓣连续飘落的效果
    if (this.x > this.windowWidth || this.y > this.windowHeight) {
      this.resetField()
    }

    // ctx.globalAlpha 为 canvasRef.value 全局透明度设置基准值，实现绘制出来的花瓣具有透明度效果
    this.ctx.globalAlpha = this.opacity

    // 随机旋转花瓣旋转角度，cos和sin的范围均为[-1, 1]，加入调整系数，保证花瓣变形可控
    // const cos = Math.cos(this.rotate) * [0.2, 0.6][Math.floor(Math.random() * 2)]
    // const sin = Math.sin(this.rotate) * [0.2, 0.6][Math.floor(Math.random() * 2)]
    // 绘制花瓣，将canvasRef.value坐标系的原点设置在花瓣的左上角
    // this.ctx.setTransform(cos, sin, -sin, cos, this.x, this.y)

    // 不旋转花瓣
    //     ctx.setTransform(a, b, c, d, e, f) 的参数的含义如下：
    // a: 缩放和水平倾斜的参数。
    // b: 水平和垂直倾斜的参数。
    // c: 水平和垂直倾斜的参数。
    // d: 缩放和垂直倾斜的参数。
    // e: 水平平移的参数。
    // f: 垂直平移的参数。
    this.ctx.setTransform(1, 0, 0, 1, this.x, this.y)
    this.ctx.drawImage(
      sakuraImg,
      0,
      0,
      this.width,
      this.height
      // this.width * [ 0.8,1,1.2,1.4,1.6,1.8,2,2.2,2.4][Math.floor(Math.random() * 9)],
      // this.height * [0.8,1,1.2,1.4,1.6,1.8,2,2.2,2.4][Math.floor(Math.random() * 9)]
    )
    this.ctx.setTransform(1, 0, 0, 1, 0, 0) // 重置canvasRef.value坐标系为初始状态
  }
  // 花瓣动画
  animate() {
    // 修改花瓣的属性，使花瓣位置发生变化
    this.x += this.xSpeed + offsetX
    this.y += this.ySpeed
    this.rotate += this.rotateSpeed
    // 绘制花瓣
    this.draw()
  }
}
/**
 * 将一个数字随机转为正数或者负数
 * @param number
 */
function randomPlusOrMinus(number: number) {
  // 生成一个随机数，范围在0到1之间
  // 将数转换为正数或负数
  return Math.random() > 0.5 ? number : -number
}
/**
 * 随机一个数字
 * @param min
 * @param max
 */
function getRandomNumber(min, max) {
  // 计算范围的长度
  const range = max - min + 1

  // 生成随机数，并将其映射到指定范围
  const randomNumber = Math.floor(Math.random() * range) + min

  return randomNumber
}
defineOptions({
  name: ''
})
const canvasRef = ref()
let ctx: CanvasRenderingContext2D | null = null
let x = 0
let y = 0
// 定义花瓣的数量
const SAKURA_SUM = 80
// 花瓣数组
const sakuraArray: Sakura[] = []
// 设置Canvas的宽度和高度
const resizeCanvas = () => {
  x = canvasRef.value.width = window.innerWidth
  y = canvasRef.value.height = window.innerHeight
}
/**
 * 定义渲染方法
 */
const render = () => {
  // 使用clearRect方法清除画布内的内容，以便下一次绘制新的内容
  ctx!.clearRect(0, 0, x, y)
  // 遍历花瓣数组，进行花瓣动画绘制
  sakuraArray.forEach((sakura: Sakura) => sakura.animate())
  // 使用requestAnimationFrame方法进行高效的动画渲染，保证在浏览器的刷新频率下去更新动画
  window.requestAnimationFrame(render)
}

// 加载花瓣图片
const sakuraImg = new Image()
sakuraImg.src = '/images/petal.png'
// 设置缩放比例
// const scale = 2; // 放大2倍

// 定义鼠标、触屏事件监听回调函数
let prevMouseX = 0
let offsetX = 0
const touchHandler = (e) => {
  // 修改鼠标在窗口中的位置，使花瓣在飘动时受到鼠标位置的影响
  const currentMouseX = e.clientX || (e.touches && e.touches.length > 0 ? e.touches[0].clientX : 0) 
  // offsetX = getRandomNumber(0,1)

  if (currentMouseX > prevMouseX) {
    // 鼠标向右滑动（正方向）
    offsetX = currentMouseX / window.innerWidth
    // console.log('向右滑动')
    offsetX = offsetX
  } else if (currentMouseX < prevMouseX) {
    // 鼠标向左滑动（负方向）
    offsetX = (window.innerWidth - currentMouseX) / window.innerWidth
    // console.log('向左滑动')
    offsetX = -offsetX
  }
  // console.log(offsetX)

  prevMouseX = currentMouseX
}
const throttleFunctionImpl = throttleFunction(touchHandler, 100)
onMounted(() => {
  resizeCanvas()
  // 使用2d的绘图方式
  ctx = canvasRef.value.getContext('2d')
  // 等花瓣图片加载完毕，将数目为SAKURA_SUM的花瓣实例保存到数组中
  sakuraImg.addEventListener('load', () => {
    for (let i = 0; i < SAKURA_SUM; i++) {
      sakuraArray.push(new Sakura(ctx, x, y))
    }
    // 开始渲染花瓣动画
    render()
  })
  // 监听鼠标移动事件和触屏移动事件
  // 监听浏览器窗口大小变化，重新设置canvasRef.value的宽高
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', throttleFunctionImpl)
  window.addEventListener('touchmove', throttleFunctionImpl)
})
onUnmounted(() => {
  // 移除事件
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', throttleFunctionImpl)
  window.removeEventListener('touchmove', throttleFunctionImpl)
})
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>

<style lang="scss" scoped></style>
