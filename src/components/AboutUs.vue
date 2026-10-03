<script setup lang="ts">
import { BadgeCheck, Clock3, Handshake, HardHat, Timer, Truck, Wallet } from '@lucide/vue'

const certificates = [
  { src: '/certs/cert.webp', alt: 'Сертификат на бетон' },
  { src: '/certs/jh.webp', alt: 'Сертификат на добавки' },
  { src: '/certs/sheben.webp', alt: 'Сертификат на щебень' },
]

const small = [
  { icon: Timer, title: 'Доставка в день заказа', text: 'Оперативно поставим бетон прямо на ваш объект.' },
  { icon: Clock3, title: 'Круглосуточно', text: 'Принимаем и выполняем заказы 24/7, без выходных.' },
  { icon: Wallet, title: 'Юр. и физ. лица', text: 'Любая форма оплаты — наличный и безналичный расчёт.' },
  { icon: HardHat, title: 'Более 10 лет опыта', text: 'Десятки реализованных проектов в строительстве.' },
  { icon: Handshake, title: 'Надёжные партнёры', text: 'Работаем напрямую с бетонными и щебёночными заводами.' },
]
</script>

<template>
  <section class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="О компании"
        title="Почему строители выбирают Gold Beton"
      />

      <div class="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Большая карточка -->
        <Reveal class="sm:col-span-2 lg:row-span-2">
          <SpotlightCard class="relative h-full min-h-[360px]">
            <img
              src="/pumps/services-item2-bg.webp"
              alt="Техника Gold Beton"
              loading="lazy"
              class="absolute inset-0 size-full object-cover opacity-40 grayscale transition-all duration-1000 group-hover/spot:scale-105 group-hover/spot:opacity-55 group-hover/spot:grayscale-0"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-card/10" />
            <div class="relative flex h-full flex-col justify-end p-7 sm:p-9">
              <div class="grid size-14 place-items-center rounded-2xl bg-gold-400 text-concrete-950">
                <Truck class="size-7" />
              </div>
              <h3 class="mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
                Собственный автопарк
              </h3>
              <p class="mt-3 max-w-md text-muted-foreground">
                Гарантируем своевременную доставку без посредников.
              </p>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal
          v-for="(item, i) in small"
          :key="item.title"
          :delay="0.06 * (i + 1)"
          :class="i === small.length - 1 && 'lg:col-span-2'"
        >
          <SpotlightCard class="h-full p-6">
            <component :is="item.icon" class="size-7 text-gold-400 transition-transform duration-500 group-hover/spot:-translate-y-1 group-hover/spot:scale-110" />
            <h3 class="mt-5 font-display text-lg font-semibold text-white">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ item.text }}
            </p>
          </SpotlightCard>
        </Reveal>

        <Reveal :delay="0.4" class="sm:col-span-2">
          <SpotlightCard class="h-full border-gold-400/25 bg-gradient-to-br from-gold-400/15 to-transparent p-6">
            <BadgeCheck class="size-7 text-gold-400" />
            <h3 class="mt-5 font-display text-lg font-semibold text-white">
              Сертификаты качества
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              Продукция сертифицирована по ГОСТ и ТР РК.
            </p>
          </SpotlightCard>
        </Reveal>
      </div>

      <!-- Сертификаты: веер, раскрывается при наведении -->
      <div class="mt-24 grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeading
          eyebrow="Документы"
          title="Наши сертификаты"
          description="На бетон, добавки и щебень. Нажмите, чтобы открыть в полном размере."
        />
        <Reveal :delay="0.1">
          <div class="group/fan relative mx-auto flex h-[340px] max-w-xl items-center justify-center sm:h-[440px]">
            <a
              v-for="(cert, i) in certificates"
              :key="cert.src"
              :href="cert.src"
              target="_blank"
              rel="noopener"
              class="absolute w-[46%] max-w-[230px] origin-bottom overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl shadow-black/60 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:!z-20 hover:!scale-105"
              :class="[
                i === 0 && '-translate-x-[28%] -rotate-[8deg] sm:group-hover/fan:-translate-x-[105%] sm:group-hover/fan:-rotate-[4deg]',
                i === 1 && 'z-10 -translate-y-2 sm:group-hover/fan:-translate-y-4',
                i === 2 && 'translate-x-[28%] rotate-[8deg] sm:group-hover/fan:translate-x-[105%] sm:group-hover/fan:rotate-[4deg]',
              ]"
            >
              <img :src="cert.src" :alt="cert.alt" loading="lazy" class="aspect-[1/1.414] w-full object-cover">
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>
