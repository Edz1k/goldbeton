<script setup lang="ts">
import { cn } from '@/lib/utils'

const { class: className, as = 'div' } = defineProps<{
  class?: string
  as?: string
}>()

const el = ref<HTMLElement | null>(null)

function onMove(e: PointerEvent) {
  const rect = el.value!.getBoundingClientRect()
  el.value!.style.setProperty('--x', `${e.clientX - rect.left}px`)
  el.value!.style.setProperty('--y', `${e.clientY - rect.top}px`)
}
</script>

<template>
  <component
    :is="as"
    ref="el"
    :class="cn(
      'group/spot relative isolate overflow-hidden rounded-2xl border bg-card/60 backdrop-blur-sm transition-colors duration-500 hover:border-gold-400/40',
      className,
    )"
    @pointermove="onMove"
  >
    <!-- Подсветка под курсором -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -inset-px -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      style="background: radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), oklch(0.78 0.13 80 / 0.14), transparent 45%)"
    />
    <slot />
  </component>
</template>
