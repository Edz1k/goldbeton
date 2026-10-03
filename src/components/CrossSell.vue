<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'

const { to, eyebrow, title, text } = defineProps<{
  to: string
  eyebrow: string
  title: string
  text: string
}>()
</script>

<template>
  <section class="px-5 py-8 sm:px-8">
    <Reveal class="mx-auto max-w-7xl">
      <RouterLink
        :to="to"
        class="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-r from-gold-400/15 via-concrete-900 to-concrete-900 p-7 transition-colors hover:border-gold-400/60 sm:flex-row sm:items-center sm:justify-between sm:p-10"
      >
        <div class="bg-grain pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
        <div class="relative">
          <div class="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
            {{ eyebrow }}
          </div>
          <div class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            {{ title }}
          </div>
          <p class="mt-2 max-w-xl text-muted-foreground">
            {{ text }}
          </p>
        </div>
        <span class="relative grid size-14 shrink-0 place-items-center rounded-full bg-gold-400 text-concrete-950 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
          <ArrowUpRight class="size-6" />
        </span>
      </RouterLink>
    </Reveal>
  </section>
</template>
