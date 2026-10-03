<script setup lang="ts">
const { value, decimals = 0, duration = 1.6, locale = 'ru-RU' } = defineProps<{
  value: number
  decimals?: number
  duration?: number
  locale?: string
}>()

const el = ref<HTMLElement | null>(null)
// Стартуем один раз, когда счётчик впервые попал в экран
const inView = ref(false)
const { stop } = useIntersectionObserver(el, ([entry]) => {
  if (entry?.isIntersecting) {
    inView.value = true
    stop()
  }
}, { rootMargin: '0px 0px -10% 0px' })
const display = ref(0)
let raf = 0

function tweenTo(target: number) {
  cancelAnimationFrame(raf)
  const from = display.value
  const start = performance.now()
  const ms = duration * 1000
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / ms)
    const eased = 1 - (1 - p) ** 4
    display.value = from + (target - from) * eased
    if (p < 1)
      raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

watch([inView, () => value], ([visible]) => {
  if (visible)
    tweenTo(value)
})

onBeforeUnmount(() => cancelAnimationFrame(raf))

const formatted = computed(() => display.value.toLocaleString(locale, {
  minimumFractionDigits: decimals,
  maximumFractionDigits: decimals,
}))
</script>

<template>
  <span ref="el" class="tabular-nums">{{ formatted }}</span>
</template>
