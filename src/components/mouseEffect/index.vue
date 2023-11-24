<script setup lang="ts">
import { ref } from 'vue'
import Firework from './firework/index.vue'
import Heat from './heat/index.vue'
import Star from './star/index.vue'
import Bubble from './bubble/index.vue'
defineOptions({
  name: 'MouseEffect'
})
const effect = ref(1)
</script>

<template>
  <div class="mouse-effect">
    <Firework v-if="effect == 1" />
    <Heat v-if="effect == 2" />
    <Star v-if="effect == 3" />
    <Bubble v-if="effect == 4" />
  </div>
</template>

<style lang="scss" scoped></style>
