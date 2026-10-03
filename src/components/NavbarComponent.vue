<script setup lang="ts">
import { Menu, Phone, X } from '@lucide/vue'
import { AnimatePresence, motion } from 'motion-v'
import { RouterLink } from 'vue-router'

import { productPages } from '~/data/catalog'

const isMobileMenuOpen = ref(false)

const navItems: { name: string, to?: string, href?: string }[] = [
  ...productPages.map(p => ({ name: p.name, to: p.to })),
  // Блок контактов есть на каждой странице — обычный якорь на текущей.
  // Не RouterLink: он считает активным пункт с любым hash на этом же пути.
  { name: 'Контакты', href: '#contacts' },
]

// Закрываем мобильное меню при любой навигации
const route = useRoute()
watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false
})

const isScrolled = ref(false)
const isHidden = ref(false)
let lastY = 0

function onScroll() {
  const y = window.scrollY
  isScrolled.value = y > 24
  // Прячем шапку при прокрутке вниз, показываем при прокрутке вверх
  isHidden.value = y > 400 && y > lastY && !isMobileMenuOpen.value
  lastY = y
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(isMobileMenuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <motion.header
    class="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
    :initial="{ y: -40, opacity: 0 }"
    :animate="{ y: isHidden ? -120 : 0, opacity: 1 }"
    :transition="{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }"
  >
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-2xl border px-4 transition-all duration-500 sm:px-5"
      :class="isScrolled || isMobileMenuOpen
        ? 'border-white/10 bg-concrete-950/75 shadow-2xl shadow-black/40 backdrop-blur-xl'
        : 'border-transparent bg-transparent'"
    >
      <RouterLink to="/" aria-label="Gold Beton — на главную" @click="isMobileMenuOpen = false">
        <BrandMark />
      </RouterLink>

      <nav class="hidden items-center gap-1 lg:flex">
        <component
          :is="item.to ? RouterLink : 'a'"
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          :href="item.href"
          exact-active-class="!text-gold-300 [&>span]:scale-x-100"
          class="group relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-concrete-200 transition-colors hover:text-white xl:px-4"
        >
          {{ item.name }}
          <span class="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-300 group-hover:scale-x-100 xl:inset-x-4" />
        </component>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <a
          href="tel:+77073990549"
          class="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white transition hover:text-gold-300 xl:flex"
        >
          <span class="relative grid size-8 place-items-center rounded-full bg-gold-400/15 text-gold-400">
            <span class="absolute inset-0 rounded-full bg-gold-400/25 animate-pulse-ring" />
            <Phone class="relative size-4" />
          </span>
          +7 (707) 399-05-49
        </a>
        <RequestButton size="sm" class="hidden sm:inline-flex">
          Заказать
        </RequestButton>
        <a
          href="tel:+77073990549"
          aria-label="Позвонить"
          class="grid size-10 place-items-center rounded-full bg-gold-400 text-concrete-950 xl:hidden"
        >
          <Phone class="size-4" />
        </a>
        <button
          type="button"
          class="grid size-10 place-items-center rounded-full border border-white/10 text-white transition hover:bg-white/10 lg:hidden"
          :aria-label="isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
          :aria-expanded="isMobileMenuOpen"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <X v-if="isMobileMenuOpen" class="size-5" />
          <Menu v-else class="size-5" />
        </button>
      </div>
    </div>

    <!-- Мобильное меню -->
    <AnimatePresence>
      <motion.nav
        v-if="isMobileMenuOpen"
        class="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-concrete-950/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
        :initial="{ opacity: 0, y: -12, scale: 0.98 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: -12, scale: 0.98 }"
        :transition="{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }"
      >
        <ul class="flex flex-col">
          <motion.li
            v-for="(item, i) in navItems"
            :key="item.name"
            :initial="{ opacity: 0, x: -16 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ delay: 0.05 + i * 0.05 }"
          >
            <component
              :is="item.to ? RouterLink : 'a'"
              :to="item.to"
              :href="item.href"
              exact-active-class="!text-gold-300"
              class="flex items-center justify-between rounded-xl px-4 py-4 font-display text-lg font-medium text-white transition hover:bg-white/5"
              @click="isMobileMenuOpen = false"
            >
              {{ item.name }}
              <span class="text-xs text-concrete-500">0{{ i + 1 }}</span>
            </component>
          </motion.li>
        </ul>
        <div class="mt-2 p-2" @click="isMobileMenuOpen = false">
          <RequestButton size="lg" class="w-full" />
        </div>
        <div class="flex flex-col items-center gap-1 px-2 pb-3 pt-1 text-sm">
          <a href="tel:+77073990549" class="font-semibold text-white">+7 (707) 399-05-49</a>
          <a href="tel:+77774917897" class="text-concrete-400">+7 (777) 491-78-97</a>
        </div>
      </motion.nav>
    </AnimatePresence>
  </motion.header>
</template>
