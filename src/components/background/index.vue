<script setup lang="ts">
import Snowflake from './snowflake/index.vue'
import Petal from './petal/index.vue'
import Rain from './rain/index.vue'
import Rain2 from './rain2/index.vue'
import Leaf from './leaf/index.vue'
import Sakura from './sakura/index.vue'
import SpiderWeb from './spiderWeb/index.vue'
defineOptions({
  name: 'BackgroundEffect'
})
const backgroundEffect= import.meta.env.VITE_BG_EFFECT
</script>

<template>
  <div class="background-effect">
    <Petal v-if="backgroundEffect==1"/>
    <Rain v-if="backgroundEffect==2"/>
    <Rain2 v-if="backgroundEffect==2.1"/>
    <Leaf v-if="backgroundEffect==3"/>
    <Sakura v-if="backgroundEffect==3.1"/>
    <Snowflake v-if="backgroundEffect==4"/>
    <SpiderWeb v-if="backgroundEffect==5"/>
  </div>
</template>

<style lang="scss">
.background-effect {
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none; /* 防止Canvas遮挡内容的操作 */
    z-index: 1; /* 将Canvas放置在内容下方 */
  }
}
</style>

<style lang="scss" scoped></style>
