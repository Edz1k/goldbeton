<script setup lang="ts">
import { motion } from 'motion-v'
import { concreteGrades } from '~/data/seo/concrete-grades'

// Данные марок — общие с посадочными страницами /beton/<марка>
const products = concreteGrades
</script>

<template>
  <section class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Ассортимент"
          title="Бетон любой марки — от подбетонки до спецобъектов"
          description="Готовим смесь под вашу задачу и доставляем до объекта по Алматы."
        />
        <Reveal :delay="0.15">
          <RequestButton variant="outline" subject="Подобрать марку бетона">
            Помочь с выбором марки
          </RequestButton>
        </Reveal>
      </div>

      <!-- На мобилке — свайп-карусель, дальше — сетка -->
      <div class="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        <Reveal
          v-for="(item, i) in products"
          :key="item.mark"
          :delay="(i % 4) * 0.07"
          class="w-[78%] shrink-0 snap-center sm:w-auto"
        >
          <SpotlightCard class="flex h-full flex-col">
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="item.image"
                :alt="`Бетон ${item.mark} (${item.cls})`"
                loading="lazy"
                class="size-full object-cover opacity-80 grayscale transition-all duration-700 group-hover/spot:scale-105 group-hover/spot:opacity-100"
              >
              <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
            </div>

            <div class="flex flex-1 flex-col p-5 pt-3">
              <div class="flex items-baseline justify-between">
                <h3 class="font-display text-2xl font-bold tracking-tight text-white">
                  <RouterLink :to="`/beton/${item.slug}`" class="transition hover:text-gold-200">
                    {{ item.mark }}
                  </RouterLink>
                </h3>
                <span class="text-sm font-medium text-gold-300">{{ item.cls }}</span>
              </div>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ item.use }}
              </p>

              <div class="mt-5">
                <div class="flex justify-between text-[11px] uppercase tracking-wider text-concrete-400">
                  <span>Прочность</span>
                  <span>{{ item.cls }}</span>
                </div>
                <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    class="h-full rounded-full bg-gradient-to-r from-concrete-400 via-gold-500 to-gold-300"
                    :initial="{ width: '0%' }"
                    :while-in-view="{ width: `${(item.strength / 35) * 100}%` }"
                    :in-view-options="{ once: true }"
                    :transition="{ duration: 1.4, delay: 0.2 + (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }"
                  />
                </div>
              </div>

              <RouterLink
                :to="`/beton/${item.slug}`"
                class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 transition hover:text-gold-200"
              >
                Подробнее о {{ item.mark }}
                <span aria-hidden="true">→</span>
              </RouterLink>
              <RequestButton
                variant="outline"
                size="sm"
                class="mt-4 w-full"
                :subject="`Бетон ${item.mark} (${item.cls})`"
              >
                Заказать {{ item.mark }}
              </RequestButton>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </div>
  </section>
</template>
