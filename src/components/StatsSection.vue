<script setup lang="ts">
const stats = [
  { value: 10, suffix: '+', label: 'лет на рынке', hint: 'десятки реализованных объектов' },
  { value: 8, suffix: '', label: 'марок бетона', hint: 'от М100 до М450' },
  { value: 24, suffix: '/7', label: 'работаем', hint: 'без выходных' },
  { value: 54, suffix: ' м', label: 'подача насосом', hint: 'по высоте и дальности' },
]
</script>

<template>
  <section class="relative py-24 sm:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-border lg:grid-cols-4">
        <Reveal
          v-for="(stat, i) in stats"
          :key="stat.label"
          :delay="i * 0.08"
          class="group relative bg-background p-6 sm:p-10"
        >
          <div class="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
          <div class="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <NumberTicker :value="stat.value" :duration="1.8" /><span class="text-gold-400">{{ stat.suffix }}</span>
          </div>
          <div class="mt-3 text-sm font-semibold text-concrete-100 sm:text-base">
            {{ stat.label }}
          </div>
          <div class="mt-1 text-xs text-muted-foreground sm:text-sm">
            {{ stat.hint }}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
