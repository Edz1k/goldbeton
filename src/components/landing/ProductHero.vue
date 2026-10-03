<script setup lang="ts">
import { Phone } from '@lucide/vue'
import { motion } from 'motion-v'

// Компактный первый экран посадочной страницы товара/услуги
const { crumbs, h1, lead, chips = [], subject } = defineProps<{
  crumbs: { name: string, path: string }[]
  h1: string
  lead: string
  chips?: { label: string, value: string }[]
  subject: string
}>()

const ease = [0.22, 1, 0.36, 1] as const
</script>

<template>
  <section class="relative isolate overflow-hidden bg-concrete-950 pb-16 pt-28 sm:pb-24 sm:pt-36">
    <div class="bg-grid-fade absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
    <div class="pointer-events-none absolute -right-40 -top-40 -z-10 size-[600px] rounded-full bg-gold-400/10 blur-[120px]" aria-hidden="true" />

    <div class="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: 0.6 }">
          <Breadcrumbs :items="crumbs" />
        </motion.div>

        <motion.h1
          class="mt-6 hyphens-auto font-display text-[clamp(1.9rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
          :initial="{ opacity: 0, y: 20, filter: 'blur(8px)' }"
          :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 0.9, delay: 0.1, ease }"
        >
          {{ h1 }}
        </motion.h1>

        <motion.p
          class="mt-5 max-w-xl text-base leading-relaxed text-concrete-200 sm:text-lg"
          :initial="{ opacity: 0, y: 14 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.25, ease }"
        >
          {{ lead }}
        </motion.p>

        <motion.dl
          v-if="chips.length"
          class="mt-7 flex flex-wrap gap-2"
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.7, delay: 0.35, ease }"
        >
          <div
            v-for="chip in chips"
            :key="chip.label"
            class="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5"
          >
            <dt class="text-[11px] uppercase tracking-wider text-concrete-400">
              {{ chip.label }}
            </dt>
            <dd class="mt-0.5 font-display text-base font-semibold text-white">
              {{ chip.value }}
            </dd>
          </div>
        </motion.dl>

        <motion.div
          class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.7, delay: 0.45, ease }"
        >
          <RequestButton size="lg" :subject="subject">
            Заказать
          </RequestButton>
          <a
            href="tel:+77073990549"
            class="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 font-semibold text-white transition hover:border-gold-400/50 hover:bg-white/10"
          >
            <Phone class="size-5 text-gold-400" />
            +7 (707) 399-05-49
          </a>
        </motion.div>
      </div>

      <motion.div
        class="relative"
        :initial="{ opacity: 0, scale: 0.94, rotate: -2 }"
        :animate="{ opacity: 1, scale: 1, rotate: 0 }"
        :transition="{ duration: 1, delay: 0.2, ease }"
      >
        <slot name="visual" />
      </motion.div>
    </div>
  </section>
</template>
