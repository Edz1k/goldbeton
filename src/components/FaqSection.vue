<script setup lang="ts">
import { Plus } from '@lucide/vue'
import { faqLd, useJsonLd } from '~/composables/useJsonLd'

// Аккордеон вопросов + FAQPage. На странице должен быть один такой блок.
const { faq, title = 'Частые вопросы' } = defineProps<{
  faq: { question: string, answer: string }[]
  title?: string
}>()

useJsonLd('faq', () => faqLd(faq))
const open = ref<number | null>(0)
</script>

<template>
  <section class="relative py-24 sm:py-28">
    <div class="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
      <SectionHeading eyebrow="Вопросы и ответы" :title="title" />
      <div class="divide-y divide-white/10 border-y border-white/10">
        <Reveal v-for="(item, i) in faq" :key="item.question" :delay="i * 0.05">
          <h3>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-6 py-6 text-left text-base font-semibold text-white transition hover:text-gold-200 sm:text-lg"
              :aria-expanded="open === i"
              @click="open = open === i ? null : i"
            >
              {{ item.question }}
              <Plus
                class="size-5 shrink-0 text-gold-400 transition-transform duration-300"
                :class="open === i && 'rotate-45'"
              />
            </button>
          </h3>
          <!-- Ответ всегда в DOM (для поисковиков), сворачиваем через grid-rows -->
          <div
            class="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            :class="open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="overflow-hidden">
              <p class="pb-6 pr-10 leading-relaxed text-muted-foreground">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
