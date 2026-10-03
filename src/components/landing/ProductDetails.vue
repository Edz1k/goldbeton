<script setup lang="ts">
import { Check, Lightbulb } from '@lucide/vue'

// Основной текст посадочной: описание, характеристики, применение, плюсы, советы
const { title, intro, specs = [], uses, usesTitle, advantages, advantagesTitle, tips = [] } = defineProps<{
  title: string
  intro: string[]
  specs?: { label: string, value: string }[]
  uses: string[]
  usesTitle: string
  advantages: string[]
  advantagesTitle: string
  tips?: string[]
}>()
</script>

<template>
  <section class="relative py-20 sm:py-28">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <h2 class="font-display text-[clamp(1.7rem,3.5vw,2.6rem)] font-bold leading-tight tracking-[-0.02em] text-white">
            {{ title }}
          </h2>
          <div class="mt-6 space-y-5 text-base leading-relaxed text-concrete-200 sm:text-lg">
            <p v-for="(p, i) in intro" :key="i">
              {{ p }}
            </p>
          </div>
        </Reveal>

        <Reveal v-if="specs.length" :delay="0.1">
          <aside class="sticky top-28 rounded-3xl border bg-card/60 p-6 backdrop-blur sm:p-8">
            <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              Характеристики
            </h2>
            <dl class="mt-5 divide-y divide-white/10">
              <div v-for="spec in specs" :key="spec.label" class="flex items-baseline justify-between gap-4 py-3.5">
                <dt class="text-sm text-concrete-400">
                  {{ spec.label }}
                </dt>
                <dd class="text-right font-semibold text-white">
                  {{ spec.value }}
                </dd>
              </div>
            </dl>
            <slot name="aside" />
          </aside>
        </Reveal>
      </div>

      <div class="mt-16 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <SpotlightCard class="h-full p-7 sm:p-9">
            <h2 class="font-display text-xl font-bold text-white sm:text-2xl">
              {{ usesTitle }}
            </h2>
            <ul class="mt-6 space-y-3">
              <li v-for="item in uses" :key="item" class="flex gap-3 text-concrete-200">
                <span class="mt-2 size-1.5 shrink-0 rotate-45 bg-gold-400" aria-hidden="true" />
                {{ item }}
              </li>
            </ul>
          </SpotlightCard>
        </Reveal>
        <Reveal :delay="0.1">
          <SpotlightCard class="h-full p-7 sm:p-9">
            <h2 class="font-display text-xl font-bold text-white sm:text-2xl">
              {{ advantagesTitle }}
            </h2>
            <ul class="mt-6 space-y-3">
              <li v-for="item in advantages" :key="item" class="flex gap-3 text-concrete-200">
                <Check class="mt-0.5 size-5 shrink-0 text-gold-400" aria-hidden="true" />
                {{ item }}
              </li>
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>

      <Reveal v-if="tips.length" class="mt-5">
        <div class="rounded-3xl border border-gold-400/20 bg-gradient-to-br from-gold-400/10 to-transparent p-7 sm:p-9">
          <h2 class="flex items-center gap-3 font-display text-xl font-bold text-white sm:text-2xl">
            <Lightbulb class="size-6 text-gold-400" aria-hidden="true" />
            Что учесть при заказе
          </h2>
          <ol class="mt-6 grid gap-4 sm:grid-cols-2">
            <li v-for="(tip, i) in tips" :key="tip" class="flex gap-4 text-concrete-200">
              <span class="font-display text-sm font-bold text-gold-400">0{{ i + 1 }}</span>
              {{ tip }}
            </li>
          </ol>
        </div>
      </Reveal>
    </div>
  </section>
</template>
