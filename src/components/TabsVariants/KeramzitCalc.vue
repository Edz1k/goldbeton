<script setup lang="ts">
import { ref } from 'vue'

const a = ref<number | null>(null) // длина
const b = ref<number | null>(null) // ширина
const c = ref<number | null>(null) // толщина в см

const volume = computed(() => {
  if (a.value && b.value && c.value) {
    const result = a.value * b.value * (c.value / 100)
    return result.toFixed(2)
  }
  return '0'
})
</script>

<template>
  <div class="mx-auto py-15 container">
    <div class="py-10">
      <h1 class="text-5xl text-gray-900 font-bold text-center">
        Калькулятор для расчета Керамзита
      </h1>
      <p class="text-base text-gray-600 mt-2 text-center">
        Рассчитайте необходимое количество керамзита и закажите у нас со скидкой
      </p>
    </div>

    <div class="flex flex-col gap-6 justify-center md:flex-row">
      <!-- Левая колонка: Табы + Компонент -->
      <div class="mx-auto w-[80%] space-y-10">
        <!-- Компонент -->
        <div class="mx-auto px-4 py-10 max-w-7xl">
          <div class="flex flex-col-reverse gap-8 items-center md:flex-row">
            <!-- Левая колонка -->
            <div class="w-full space-y-5 md:w-1/2">
              <h2 class="text-xl text-gray-800 font-semibold">
                Введите размеры плиты
              </h2>
              <div class="gap-4 grid">
                <input
                  v-model.number="a"
                  placeholder="Длина плиты A (м)"
                  class="focus:ring-main p-3 border rounded-md shadow-sm transition-all focus:outline-none focus:ring-2"
                >
                <input
                  v-model.number="b"
                  placeholder="Ширина плиты B (м)"
                  class="focus:ring-main p-3 border rounded-md shadow-sm transition-all focus:outline-none focus:ring-2"
                >
                <input
                  v-model.number="c"
                  placeholder="Толщина плиты C (см)"
                  class="focus:ring-main p-3 border rounded-md shadow-sm transition-all focus:outline-none focus:ring-2"
                >
              </div>
              <p class="text-lg text-gray-900 font-semibold">
                Итого: <span class="text-main">{{ volume }} м³</span>
              </p>
            </div>

            <!-- Правая колонка -->
            <div class="rounded-xl bg-gray-50 flex w-full items-center justify-center md:w-1/2">
              <img
                src="https://optim.tildacdn.pro/tild6165-3638-4132-b134-366231393632/-/resize/720x/-/format/webp/_.jpg.webp"
                alt="Напольная плита"
                class="h-full max-w-full object-cover"
              >
            </div>
          </div>
        </div>

        <RequestModal />
      </div>
    </div>
  </div>
</template>
