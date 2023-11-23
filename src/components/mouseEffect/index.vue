<script setup lang="ts">
import { ref } from 'vue'
import Firework from './firework/index.vue'
import Heat from './heat/index.vue'
import Star from './star/index.vue'
defineOptions({
  name: 'MouseEffect'
})
const effect = ref(3)
</script>

<template>
  <div>
    <Firework v-if="effect == 1" />
    <Heat v-if="effect == 2" />
    <Star v-if="effect == 3" />
  </div>
</template>

<style lang="scss" scoped></style>
