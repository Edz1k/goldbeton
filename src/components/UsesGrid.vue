<script setup lang="ts">
const { eyebrow, title, description, items } = defineProps<{
  eyebrow: string
  title: string
  description?: string
  items: { icon: string, title: string, text: string }[]
}>()
</script>

<template>
  <section class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading :eyebrow="eyebrow" :title="title" :description="description" />
      <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal v-for="(item, i) in items" :key="item.title" :delay="i * 0.07">
          <SpotlightCard class="h-full p-6">
            <span class="text-3xl text-gold-400 transition-transform duration-500 group-hover/spot:-translate-y-1" :class="item.icon" />
            <h3 class="mt-5 font-display text-lg font-semibold text-white">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ item.text }}
            </p>
          </SpotlightCard>
        </Reveal>
      </div>
    </div>
  </section>
</template>
