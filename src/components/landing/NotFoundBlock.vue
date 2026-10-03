<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Страница не найдена | Gold Beton', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <section class="flex min-h-[80svh] items-center justify-center px-5 pt-24 text-center">
    <div>
      <div class="font-display text-7xl font-bold text-gold-400">
        404
      </div>
      <h1 class="mt-4 font-display text-2xl font-bold text-white">
        Такой страницы нет
      </h1>
      <RouterLink to="/" class="mt-8 inline-flex rounded-full bg-gold-400 px-6 py-3 font-semibold text-concrete-950">
        На главную
      </RouterLink>
    </div>
  </section>
</template>
