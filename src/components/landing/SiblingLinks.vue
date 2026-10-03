<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'

// Перелинковка: соседние марки / фракции
const { title, items } = defineProps<{
  title: string
  items: { to: string, name: string, hint: string }[]
}>()
</script>

<template>
  <section class="relative py-20 sm:py-24">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal>
        <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">
          {{ title }}
        </h2>
      </Reveal>
      <div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <Reveal v-for="(item, i) in items" :key="item.to" :delay="(i % 4) * 0.05">
          <RouterLink
            :to="item.to"
            class="group flex h-full items-start justify-between gap-3 rounded-2xl border bg-card/40 p-5 transition hover:border-gold-400/50 hover:bg-card/80"
          >
            <span>
              <span class="block font-display text-xl font-bold text-white transition group-hover:text-gold-200">{{ item.name }}</span>
              <span class="mt-1 block text-xs text-concrete-400">{{ item.hint }}</span>
            </span>
            <ArrowUpRight class="size-5 shrink-0 text-concrete-500 transition group-hover:rotate-45 group-hover:text-gold-400" />
          </RouterLink>
        </Reveal>
      </div>
    </div>
  </section>
</template>
