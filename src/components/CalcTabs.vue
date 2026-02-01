<script setup lang="ts">
import type { Component } from 'vue'
import { ref } from 'vue'

import Floor from './TabsVariants/Floor.vue'
import Variant1 from './TabsVariants/Variant1.vue'
import Variant2 from './TabsVariants/Variant2.vue'
import Variant3 from './TabsVariants/Variant3.vue'
import Variant4 from './TabsVariants/Variant4.vue'

const tabs = ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4', 'Напольное покрытие'] as const
type TabKey = typeof tabs[number]
const activeTab = ref<TabKey>('Вариант 1')

const components: Record<TabKey, Component> = {
  'Вариант 1': Variant1,
  'Вариант 2': Variant2,
  'Вариант 3': Variant3,
  'Вариант 4': Variant4,
  'Напольное покрытие': Floor,
}
</script>

<template>
  <div class="mx-auto py-15 container">
    <div class="py-10">
      <h1 class="text-5xl text-gray-900 font-bold text-center">
        Калькулятор для расчета бетона
      </h1>
      <p class="text-base text-gray-600 mt-2 text-center">
        Рассчитайте необходимое количество бетона и закажите у нас со скидкой
      </p>
    </div>

    <div class="flex flex-col gap-6 justify-center md:flex-row">
      <!-- Левая колонка: Табы + Компонент -->
      <div class="mx-auto w-[80%] space-y-10">
        <!-- Табы -->
        <div class="flex flex-col gap-2 items-center justify-center md:flex-row">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="px-4 py-2 rounded transition-all duration-300"
            :class="[
              activeTab === tab
                ? 'bg-violet-600 text-white shadow font-medium'
                : 'text-gray-600 bg-transparent hover:bg-red-600/10',
            ]"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Компонент -->
        <keep-alive>
          <component :is="components[activeTab]" />
        </keep-alive>
        <RequestModal />
      </div>
    </div>
  </div>
</template>
