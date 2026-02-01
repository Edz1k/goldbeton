<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface NavItem {
  name: string
  href: string
}

const navItems = ref<NavItem[]>([
  { name: 'Бетон', href: '#assortiment' },
  { name: 'О нас', href: '#about' },
  { name: 'Услуги', href: '#pumps' },
  { name: 'Контакты', href: '#contacts' },
])

const isMobileMenuOpen = ref(false)
const isReady = ref(false)
const isScrolled = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  setTimeout(() => {
    isReady.value = true
  }, 100)

  window.addEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="bg-white w-full transition-all duration-500 top-0 sticky z-50"
    :class="[
      isReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
      isScrolled ? 'shadow-lg' : 'shadow-md',
    ]"
  >
    <div class="mx-auto px-4 py-1 flex items-center justify-between container">
      <a href="/" class="flex items-center">
        <div class="p-2 rounded bg-white overflow-hidden">
          <img src="/monolit3-r.png" alt="Logo" class="h-20 w-20 scale-150 transform object-cover">
        </div>
      </a>

      <!-- Десктоп-навигация -->
      <nav class="hidden space-x-8 md:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="text-gray-700 transition hover:text-red-600"
        >
          {{ item.name }}
        </a>
      </nav>

      <!-- Десктоп-кнопка -->
      <!-- Десктоп-кнопка -->
      <div class="flex-row-reverse hidden md:flex">
        <RequestModal />
        <div class="text-gray-700 mt-2 flex items-center">
          <div class="i-mdi-phone text-xl text-green-500 mr-2" />
          <div class="mr-10 flex flex-col">
            <a href="tel:+77072000985" class="text-sm hover:text-red-600">+7 (702) 666-04-00

            </a>
          </div>
        </div>
      </div>

      <!-- Мобильный блок -->
      <!-- Мобильный блок -->
      <div class="flex items-center space-x-4 md:hidden">
        <div class="text-gray-700 flex items-center">
          <div class="i-mdi-whatsapp text-xl text-green-500 mr-2" />
          <div class="flex flex-col space-y-1">
            <a href="tel:+77072000985" class="text-sm hover:text-red-600">+7 (702) 666-04-00</a>
          </div>
        </div>
        <!-- Бургер -->
        <div
          class="text-3xl text-gray-700 flex h-8 w-8 cursor-pointer transition-all duration-300 items-center justify-center"
          @click="toggleMobileMenu"
        >
          <div :class="isMobileMenuOpen ? 'i-mdi-close' : 'i-mdi-menu'" />
        </div>
      </div>
    </div>

    <!-- Мобильное меню -->
    <transition name="fade-scale">
      <nav
        v-if="isMobileMenuOpen"
        class="bg-white shadow-lg md:hidden"
      >
        <ul class="py-6 flex flex-col items-center space-y-6">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              class="text-lg text-gray-700 transition hover:text-red-600"
              @click="toggleMobileMenu"
            >
              {{ item.name }}
            </a>
          </li>
          <li>
            <RequestModal />
          </li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
/* Плавная анимация fade + scale для мобильного меню */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Плавная анимация появления хедера */
</style>
