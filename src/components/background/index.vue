<script setup lang="ts">
import Snowflake from './snowflake/index.vue'
defineOptions({
  name: 'BackgroundEffect'
})
const backgroundEffect= import.meta.env.VITE_BG_EFFECT
</script>

<template>
  <div class="background-effect">
    <Snowflake v-if="backgroundEffect==4"/>
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
