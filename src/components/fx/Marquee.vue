<script setup lang="ts">
const { duration = 40, reverse = false, gap = '3rem' } = defineProps<{
  duration?: number
  reverse?: boolean
  gap?: string
}>()
</script>

<template>
  <div
    class="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    :style="{ '--marquee-duration': `${duration}s`, '--marquee-gap': gap, 'gap': gap }"
  >
    <div
      v-for="i in 2"
      :key="i"
      class="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]"
      :class="{ '[animation-direction:reverse]': reverse }"
      :style="{ gap }"
      :aria-hidden="i === 2 ? 'true' : undefined"
    >
      <slot />
    </div>
  </div>
</template>
