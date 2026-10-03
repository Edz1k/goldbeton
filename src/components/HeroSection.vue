<script setup lang="ts">
import { Calculator } from '@lucide/vue'
import { motion } from 'motion-v'

const ease = [0.22, 1, 0.36, 1] as const
const titleTop = ['Бетон', 'с', 'доставкой']
const titleBottom = ['по', 'Алматы']

const facts = [
  { value: '24/7', label: 'приём заказов' },
  { value: 'М100–М450', label: 'марки бетона' },
  { value: 'до 54 м', label: 'подача автонасосом' },
]
</script>

<template>
  <section id="hero" class="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-concrete-950">
    <!-- Фото заливки — приглушённое -->
    <motion.div
      class="absolute inset-0 -z-20"
      :initial="{ scale: 1.15, opacity: 0 }"
      :animate="{ scale: 1, opacity: 1 }"
      :transition="{ duration: 2.2, ease }"
    >
      <img
        src="/background.webp"
        srcset="/background-960.webp 960w, /background.webp 1920w"
        sizes="100vw"
        width="1920"
        height="815"
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        class="size-full object-cover object-[70%_center] opacity-30 grayscale-[60%]"
      >
    </motion.div>
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-concrete-950 via-concrete-950/85 to-concrete-950/30" aria-hidden="true" />
    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-concrete-950 via-transparent to-concrete-950/60" aria-hidden="true" />
    <div class="bg-grid-fade absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

    <!-- Льющийся бетон -->
    <ConcretePour class="-z-10" />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-concrete-950 to-transparent" aria-hidden="true" />

    <div class="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" aria-hidden="true" />

    <div class="mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 lg:pt-36">
      <div class="max-w-3xl">
        <motion.div
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-concrete-200 backdrop-blur"
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.2, ease }"
        >
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full rounded-full bg-emerald-400 animate-pulse-ring" />
            <span class="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Принимаем заказы сейчас · доставка в день заказа
        </motion.div>

        <h1 class="mt-7 font-display text-[clamp(2.4rem,7vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.035em] text-white">
          <span class="block">
            <motion.span
              v-for="(word, i) in titleTop"
              :key="word"
              class="mr-[0.22em] inline-block"
              :initial="{ opacity: 0, y: '0.6em', filter: 'blur(10px)' }"
              :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
              :transition="{ duration: 0.9, delay: 0.35 + i * 0.09, ease }"
            >{{ word }}</motion.span>
          </span>
          <span class="block">
            <motion.span
              v-for="(word, i) in titleBottom"
              :key="word"
              class="text-gold-gradient mr-[0.22em] inline-block animate-shine pb-[0.08em]"
              :initial="{ opacity: 0, y: '0.6em', filter: 'blur(10px)' }"
              :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
              :transition="{ duration: 0.9, delay: 0.65 + i * 0.09, ease }"
            >{{ word }}</motion.span>
          </span>
        </h1>

        <motion.p
          class="mt-7 max-w-xl text-base leading-relaxed text-concrete-200 sm:text-lg"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.95, ease }"
        >
          «Gold Beton» — производство и поставка бетона и строительных растворов.
          Собственный автопарк, автобетононасосы и честный объём в каждом кубе.
        </motion.p>

        <motion.div
          class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 1.1, ease }"
        >
          <RequestButton size="lg" subject="Заказ бетона (с первого экрана)">
            Заказать бетон
          </RequestButton>
          <a
            href="#calc"
            class="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur transition hover:border-gold-400/50 hover:bg-white/10"
          >
            <Calculator class="size-5 text-gold-400" />
            Рассчитать объём
          </a>
        </motion.div>

        <dl class="mt-14 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur">
          <motion.div
            v-for="(fact, i) in facts"
            :key="fact.label"
            class="bg-concrete-950/70 px-4 py-4 sm:px-6 sm:py-5"
            :initial="{ opacity: 0, y: 12 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 1.3 + i * 0.1, ease }"
          >
            <dt class="sr-only">
              {{ fact.label }}
            </dt>
            <dd class="whitespace-nowrap font-display text-sm font-semibold text-white sm:text-2xl">
              {{ fact.value }}
            </dd>
            <dd class="mt-1 text-[11px] text-concrete-300 sm:text-sm">
              {{ fact.label }}
            </dd>
          </motion.div>
        </dl>
      </div>
    </div>

    <!-- Индикатор прокрутки: капля стекает вниз -->
    <a
      href="#ticker"
      aria-label="Листать вниз"
      class="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-concrete-400 transition hover:text-white sm:flex"
    >
      Листайте
      <span class="relative h-12 w-px overflow-hidden bg-white/15">
        <span class="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent to-gold-400 animate-drip" />
      </span>
    </a>
  </section>
</template>
