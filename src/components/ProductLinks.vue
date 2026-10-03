<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { productPages } from '~/data/catalog'

const route = useRoute()
const others = computed(() => productPages.filter(p => p.to !== route.path))
</script>

<template>
  <section class="relative py-24 sm:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading eyebrow="Продукция" title="Что ещё привезём на объект" />
      <div class="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal v-for="(page, i) in others" :key="page.to" :delay="i * 0.08">
          <RouterLink :to="page.to" class="block h-full">
            <SpotlightCard class="flex h-full flex-col p-7">
              <span class="text-4xl text-gold-400" :class="page.icon" />
              <h3 class="mt-6 font-display text-2xl font-bold text-white">
                {{ page.name }}
              </h3>
              <p class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {{ page.text }}
              </p>
              <span class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-300">
                Подробнее
                <ArrowRight class="size-4 transition-transform duration-300 group-hover/spot:translate-x-1" />
              </span>
            </SpotlightCard>
          </RouterLink>
        </Reveal>
      </div>
    </div>
  </section>
</template>
