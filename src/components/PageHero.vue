<script setup lang="ts">
import { motion } from 'motion-v'

const { eyebrow, title, accent, description, facts = [], subject } = defineProps<{
  eyebrow: string
  title: string
  /** Вторая строка заголовка — золотым */
  accent: string
  description: string
  facts?: { value: string, label: string }[]
  subject?: string
}>()

const ease = [0.22, 1, 0.36, 1] as const
</script>

<template>
  <section class="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-concrete-950">
    <div class="bg-grid-fade absolute inset-0 -z-20 opacity-60" aria-hidden="true" />
    <!-- Визуальный эффект страницы -->
    <div class="absolute inset-0 -z-10">
      <slot name="visual" />
    </div>
    <div class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-concrete-950 via-concrete-950/80 to-transparent" aria-hidden="true" />
    <div class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-concrete-950 to-transparent" aria-hidden="true" />
    <div class="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" aria-hidden="true" />

    <div class="mx-auto w-full max-w-7xl px-5 pb-20 pt-32 sm:px-8 lg:pt-36">
      <div class="max-w-3xl">
        <motion.div
          class="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400"
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.15, ease }"
        >
          <span class="h-px w-8 bg-gold-400" />
          {{ eyebrow }}
        </motion.div>

        <h1 class="mt-6 hyphens-auto font-display text-[clamp(1.75rem,7.4vw,5rem)] font-bold leading-[1] tracking-[-0.035em] text-white">
          <motion.span
            class="block"
            :initial="{ opacity: 0, y: '0.5em', filter: 'blur(10px)' }"
            :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
            :transition="{ duration: 0.9, delay: 0.3, ease }"
          >
            {{ title }}
          </motion.span>
          <motion.span
            class="text-gold-gradient block animate-shine pb-[0.08em]"
            :initial="{ opacity: 0, y: '0.5em', filter: 'blur(10px)' }"
            :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
            :transition="{ duration: 0.9, delay: 0.45, ease }"
          >
            {{ accent }}
          </motion.span>
        </h1>

        <motion.p
          class="mt-7 max-w-xl text-base leading-relaxed text-concrete-200 sm:text-lg"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.7, ease }"
        >
          {{ description }}
        </motion.p>

        <motion.div
          class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.85, ease }"
        >
          <RequestButton size="lg" :subject="subject">
            Оставить заявку
          </RequestButton>
          <slot name="secondary" />
        </motion.div>

        <dl
          v-if="facts.length"
          class="mt-14 grid max-w-2xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur"
          :style="{ gridTemplateColumns: `repeat(${facts.length}, minmax(0, 1fr))` }"
        >
          <motion.div
            v-for="(fact, i) in facts"
            :key="fact.label"
            class="bg-concrete-950/70 px-4 py-4 sm:px-6 sm:py-5"
            :initial="{ opacity: 0, y: 12 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 1 + i * 0.1, ease }"
          >
            <dt class="sr-only">
              {{ fact.label }}
            </dt>
            <dd class="font-display text-sm font-semibold leading-tight text-white sm:whitespace-nowrap sm:text-2xl">
              {{ fact.value }}
            </dd>
            <dd class="mt-1 text-[11px] text-concrete-300 sm:text-sm">
              {{ fact.label }}
            </dd>
          </motion.div>
        </dl>
      </div>
    </div>
  </section>
</template>
