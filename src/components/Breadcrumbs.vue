<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { breadcrumbLd, useJsonLd } from '~/composables/useJsonLd'

// Видимые хлебные крошки + BreadcrumbList для поисковиков.
// Последний пункт — текущая страница.
const { items } = defineProps<{ items: { name: string, path: string }[] }>()

const all = computed(() => [{ name: 'Главная', path: '/' }, ...items])
useJsonLd('breadcrumbs', () => breadcrumbLd(all.value))
</script>

<template>
  <nav aria-label="Хлебные крошки" class="text-xs text-concrete-400 sm:text-sm">
    <ol class="flex flex-wrap items-center gap-1.5">
      <li v-for="(item, i) in all" :key="item.path" class="flex items-center gap-1.5">
        <ChevronRight v-if="i > 0" class="size-3.5 text-concrete-600" aria-hidden="true" />
        <RouterLink
          v-if="i < all.length - 1"
          :to="item.path"
          class="transition hover:text-gold-300"
        >
          {{ item.name }}
        </RouterLink>
        <span v-else aria-current="page" class="text-concrete-200">{{ item.name }}</span>
      </li>
    </ol>
  </nav>
</template>
