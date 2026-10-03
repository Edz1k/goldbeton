<script setup lang="ts">
import { Package, ShoppingBag, Truck } from '@lucide/vue'
import { BIG_BAG_VOLUME_M3, bigBagPrice, formatPrice, keramzitTypes } from '~/data/catalog'
import { keramzitFractions } from '~/data/seo/keramzit-fractions'

function fractionLink(typeId: string, fraction: string) {
  return keramzitFractions.find(f => f.typeId === typeId && f.fraction === fraction)?.slug
}

const swatch: Record<string, string> = {
  slate: 'from-[#7a7067] to-[#4f4944]',
  clay: 'from-[#b06a40] to-[#874c2f]',
}
</script>

<template>
  <section class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="Прайс"
        title="Керамзит в Алматы — цены"
        description="Россыпью, в мешках по 50 литров и в биг-бэгах по 1,2 м³."
      />

      <div class="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal v-for="(type, i) in keramzitTypes" :key="type.id" :delay="i * 0.1">
          <SpotlightCard class="flex h-full flex-col p-6 sm:p-9">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="font-display text-2xl font-bold text-white sm:text-3xl">
                  {{ type.name }}
                </h3>
                <p class="mt-2 text-sm text-muted-foreground">
                  {{ type.description }}
                </p>
              </div>
              <!-- «Гранулы» нужного цвета -->
              <div class="relative hidden size-16 shrink-0 sm:block" aria-hidden="true">
                <span class="absolute left-1 top-3 size-8 rounded-full bg-gradient-to-br shadow-lg" :class="swatch[type.id]" />
                <span class="absolute right-0 top-0 size-6 rounded-full bg-gradient-to-br shadow-lg" :class="swatch[type.id]" />
                <span class="absolute bottom-0 right-2 size-7 rounded-full bg-gradient-to-br shadow-lg" :class="swatch[type.id]" />
              </div>
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-2">
              <span class="text-xs uppercase tracking-wider text-concrete-400">Фракции:</span>
              <RouterLink
                v-for="f in type.fractions"
                :key="f"
                :to="`/keramzit/${fractionLink(type.id, f)}`"
                class="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-0.5 text-xs font-semibold text-gold-200 transition hover:border-gold-400 hover:bg-gold-400/20"
              >
                {{ f }} →
              </RouterLink>
            </div>

            <!-- Главная цена -->
            <div class="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div class="flex items-center gap-2 text-sm text-concrete-300">
                <Truck class="size-4 text-gold-400" />
                Россыпью
              </div>
              <div class="mt-1 flex items-baseline gap-2">
                <span class="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{{ formatPrice(type.bulk) }}</span>
                <span class="text-concrete-400">/ м³</span>
              </div>
            </div>

            <dl class="mt-3 grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <dt class="flex items-center gap-2 text-sm text-concrete-300">
                  <ShoppingBag class="size-4 text-gold-400" />
                  Мешок 50 л
                </dt>
                <dd class="mt-1 font-display text-2xl font-bold text-white">
                  {{ formatPrice(type.bag) }}
                </dd>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <dt class="flex items-center gap-2 text-sm text-concrete-300">
                  <Package class="size-4 text-gold-400" />
                  Биг-бэг
                </dt>
                <dd class="mt-1 font-display text-2xl font-bold text-white">
                  {{ formatPrice(type.bigBagPerM3) }} <span class="text-sm font-normal text-concrete-400">/ м³</span>
                </dd>
                <dd class="mt-1 text-xs text-concrete-400">
                  {{ String(BIG_BAG_VOLUME_M3).replace('.', ',') }} м³ — <span class="font-semibold text-gold-300">{{ formatPrice(bigBagPrice(type)) }}</span> за биг-бэг
                </dd>
              </div>
            </dl>

            <RequestButton class="mt-8 self-start" :subject="type.name">
              Заказать {{ type.short.toLowerCase() }}
            </RequestButton>
          </SpotlightCard>
        </Reveal>
      </div>

      <Reveal :delay="0.2" class="mt-5">
        <div class="flex items-center gap-4 rounded-2xl border border-dashed border-white/15 px-6 py-5 text-sm text-concrete-200">
          <span class="icon-[mdi--truck-fast] shrink-0 text-2xl text-gold-400" />
          <span><b class="text-white">Доставка платная</b>, стоимость договорная — зависит от объёма и адреса.</span>
        </div>
      </Reveal>
    </div>
  </section>
</template>
