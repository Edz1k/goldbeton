<script setup lang="ts">
import { computed, ref } from 'vue'

const a = ref<number | null>(null)
const b = ref<number | null>(null)
const c = ref<number | null>(null)
const d = ref<number | null>(null)

const volume = computed(() => {
  if (a.value && b.value && c.value && d.value) {
    const dMeters = d.value / 100
    const cMeters = c.value / 100
    const totalLength
      = 2 * a.value // внешние продольные
        + 3 * b.value // поперечные
        + (a.value - 2 * dMeters) // внутренняя продольная
    const result = totalLength * cMeters * dMeters
    return result.toFixed(2)
  }
  return '0'
})
</script>

<template>
  <div class="mx-auto px-4 py-10 max-w-7xl">
    <div class="flex flex-col-reverse gap-8 items-center md:flex-row">
      <!-- Левая колонка -->
      <div class="w-full space-y-5 md:w-1/2">
        <h2 class="text-xl text-gray-800 font-semibold">
          Введите размеры ленты
        </h2>
        <div class="gap-4 grid">
          <input
            v-model.number="a"
            placeholder="Длина ленты A (м)"
            class="focus:ring-main p-3 border rounded-md shadow-sm transition-all focus:outline-none focus:ring-2"
          >
          <input
            v-model.number="b"
            placeholder="Длина ленты B (м)"
            class="focus:ring-main p-3 border rounded-md shadow-sm transition-all focus:outline-none focus:ring-2"
          >
          <input
            v-model.number="c"
            placeholder="Высота ленты C (см)"
            class="focus:ring-main p-3 border rounded-md shadow-sm transition-all focus:outline-none focus:ring-2"
          >
          <input
            v-model.number="d"
            placeholder="Ширина ленты D (см)"
            class="focus:ring-main p-3 border rounded-md shadow-sm transition-all focus:outline-none focus:ring-2"
          >
        </div>
        <p class="text-lg text-gray-900 font-semibold">
          Итого: <span class="text-main">{{ volume }} м³</span>
        </p>
      </div>

      <!-- Правая колонка: Картинка -->
      <div class="rounded-xl bg-gray-50 flex w-full items-center justify-center md:w-1/2">
        <img
          src="https://optim.tildacdn.pro/tild3065-6337-4537-a532-646238616236/-/resize/720x/-/format/webp/3.jpg.webp"
          alt="Ленточный фундамент"
          class="h-full max-w-full object-cover"
        >
      </div>
    </div>
  </div>
</template>
