<script setup lang="ts">
import { ref } from 'vue'
import Firework from './firework/index.vue'
import Heat from './heat/index.vue'
defineOptions({
  name: 'MouseEffect'
})
const effect = ref(2)
</script>

<template>
  <div>
    <Firework v-if="effect == 1" />
    <Heat v-if="effect == 2" />
  </div>
</template>

<style lang="scss" scoped></style>
