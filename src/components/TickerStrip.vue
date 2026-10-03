<script setup lang="ts">
const marks = ['М100', 'М150', 'М200', 'М250', 'М300', 'М350', 'М400', 'М450']
const services = ['Доставка миксером', 'Автобетононасос 32–54 м', 'Работаем 24/7', 'Наличный и безналичный расчёт', 'Сертификаты ГОСТ']
</script>

<template>
  <section id="ticker" aria-label="Марки и услуги" class="relative z-10 overflow-hidden py-10">
    <div class="-rotate-2 scale-105 border-y border-gold-600/50 bg-gold-400 py-4 text-concrete-950 shadow-2xl shadow-gold-400/20">
      <Marquee :duration="35">
        <span
          v-for="mark in marks"
          :key="mark"
          class="flex items-center gap-12 whitespace-nowrap font-display text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {{ mark }}
          <span class="size-2.5 rotate-45 bg-concrete-950" aria-hidden="true" />
        </span>
      </Marquee>
    </div>
    <div class="relative -mt-3 rotate-[1.5deg] scale-105 border-y border-white/10 bg-concrete-900/95 py-3 backdrop-blur">
      <Marquee :duration="45" reverse>
        <span
          v-for="service in services"
          :key="service"
          class="flex items-center gap-12 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-concrete-200"
        >
          {{ service }}
          <span class="text-gold-400" aria-hidden="true">✦</span>
        </span>
      </Marquee>
    </div>
  </section>
</template>
