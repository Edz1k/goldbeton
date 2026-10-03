<script setup lang="ts">
import { motion } from 'motion-v'
</script>

<template>
  <motion.a
    href="tel:+77073990549"
    aria-label="Позвонить"
    class="fixed bottom-5 left-5 z-40 grid size-14 place-items-center rounded-full bg-gold-400 text-concrete-950 shadow-xl shadow-gold-400/30 md:hidden"
    :initial="{ scale: 0, opacity: 0 }"
    :animate="{ scale: 1, opacity: 1 }"
    :transition="{ delay: 1.8, type: 'spring', stiffness: 260, damping: 18 }"
  >
    <span class="absolute inset-0 rounded-full bg-gold-400 animate-pulse-ring" />
    <span class="icon-[mdi--phone] relative text-2xl" />
  </motion.a>

  <motion.a
    href="https://wa.me/77073990549"
    target="_blank"
    rel="noopener"
    aria-label="Открыть чат в WhatsApp"
    class="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-emerald-500 pl-4 pr-4 text-white shadow-xl shadow-emerald-500/30 transition-all hover:pr-5"
    :initial="{ scale: 0, opacity: 0 }"
    :animate="{ scale: 1, opacity: 1 }"
    :transition="{ delay: 2, type: 'spring', stiffness: 260, damping: 18 }"
  >
    <span class="absolute inset-0 rounded-full bg-emerald-500 animate-pulse-ring" />
    <span class="icon-[mdi--whatsapp] relative text-2xl" />
    <span class="relative hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 group-hover:max-w-40 sm:inline">
      Написать
    </span>
  </motion.a>
</template>
