<script setup lang="ts">
import { motion } from 'motion-v'

const { delay = 0, y = 28, as = 'div' } = defineProps<{
  delay?: number
  y?: number
  as?: string
}>()
</script>

<template>
  <motion.div
    :as="as"
    :initial="{ opacity: 0, y, filter: 'blur(8px)' }"
    :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
    :in-view-options="{ once: true, margin: '0px 0px -12% 0px' }"
    :transition="{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }"
  >
    <slot />
  </motion.div>
</template>
