<script setup lang="ts">
const { eyebrow, title, description, align = 'left' } = defineProps<{
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <Reveal :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'">
    <div
      class="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400"
      :class="align === 'center' && 'justify-center'"
    >
      <span class="h-px w-8 bg-gold-400" />
      {{ eyebrow }}
    </div>
    <h2 class="mt-5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
      {{ description }}
    </p>
    <slot />
  </Reveal>
</template>
