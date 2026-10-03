<script setup lang="ts">
import { Check } from '@lucide/vue'
import {
  BAG_VOLUME_M3,
  BIG_BAG_VOLUME_M3,
  bigBagPrice,
  formatPrice,
  keramzitTypes,
} from '~/data/catalog'

const typeIndex = ref(0)
const mode = ref<'volume' | 'area'>('area')
const volumeInput = ref<number | null>(null)
const area = ref<number | null>(null)
const thickness = ref<number | null>(null)

const type = computed(() => keramzitTypes[typeIndex.value])

const volume = computed(() => {
  if (mode.value === 'volume')
    return Math.max(0, volumeInput.value ?? 0)
  if (!area.value || !thickness.value)
    return 0
  return Math.max(0, Number((area.value * (thickness.value / 100)).toFixed(2)))
})

// Погрешность float: 0.15 / 0.05 не должно превращаться в 4 мешка
const units = (v: number, size: number) => Math.ceil(v / size - 1e-9)

const options = computed(() => {
  const v = volume.value
  const bags = units(v, BAG_VOLUME_M3)
  const bigBags = units(v, BIG_BAG_VOLUME_M3)
  return [
    { id: 'bulk', label: 'Россыпью', detail: `${v.toLocaleString('ru-RU')} м³`, total: Math.round(v * type.value.bulk) },
    { id: 'bag', label: 'Мешки 50 л', detail: `${bags} шт.`, total: bags * type.value.bag },
    { id: 'bigbag', label: 'Биг-бэги 1,2 м³', detail: `${bigBags} шт.`, total: bigBags * bigBagPrice(type.value) },
  ]
})

const cheapest = computed(() => options.value.reduce((a, b) => (b.total < a.total ? b : a)).id)
const selected = ref('bulk')

const subject = computed(() => {
  const opt = options.value.find(o => o.id === selected.value)!
  if (!volume.value)
    return type.value.name
  return `${type.value.name}, ${opt.label.toLowerCase()}: ${opt.detail} ≈ ${formatPrice(opt.total)}`
})
</script>

<template>
  <section class="relative overflow-hidden py-24 sm:py-32">
    <div class="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gold-400/[0.06] blur-3xl" aria-hidden="true" />

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        align="center"
        eyebrow="Калькулятор"
        title="Сколько керамзита нужно и сколько это стоит"
        description="Введите площадь и толщину слоя — посчитаем объём и сравним россыпь, мешки и биг-бэги."
      />

      <Reveal :delay="0.1" class="mt-12">
        <div class="grid overflow-hidden rounded-3xl border bg-card/50 backdrop-blur lg:grid-cols-[1fr_1.15fr]">
          <!-- Ввод -->
          <div class="p-6 sm:p-10">
            <div class="text-xs font-semibold uppercase tracking-[0.2em] text-concrete-400">
              Вид керамзита
            </div>
            <div class="mt-3 grid grid-cols-2 gap-2 rounded-2xl border bg-white/[0.02] p-1.5">
              <button
                v-for="(t, i) in keramzitTypes"
                :key="t.id"
                type="button"
                class="rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-300"
                :class="typeIndex === i ? 'bg-gold-400 text-concrete-950 shadow-lg shadow-gold-400/20' : 'text-concrete-300 hover:bg-white/5 hover:text-white'"
                @click="typeIndex = i"
              >
                {{ t.short }}
                <span class="block text-[11px] font-normal opacity-70">{{ t.fractions.join(', ') }}</span>
              </button>
            </div>

            <div class="mt-8 flex items-center gap-1 text-sm">
              <button
                v-for="m in [{ id: 'area', label: 'По площади' }, { id: 'volume', label: 'Знаю объём' }] as const"
                :key="m.id"
                type="button"
                class="rounded-full px-4 py-1.5 transition"
                :class="mode === m.id ? 'bg-white/10 text-white' : 'text-concrete-400 hover:text-white'"
                @click="mode = m.id"
              >
                {{ m.label }}
              </button>
            </div>

            <div class="mt-4 grid gap-3" :class="mode === 'area' && 'sm:grid-cols-2'">
              <template v-if="mode === 'area'">
                <label class="group relative block">
                  <span class="mb-1.5 block text-xs font-medium text-concrete-300">Площадь</span>
                  <input v-model.number="area" type="number" inputmode="decimal" min="0" step="any" placeholder="0" class="calc-input">
                  <span class="calc-unit">м²</span>
                </label>
                <label class="group relative block">
                  <span class="mb-1.5 block text-xs font-medium text-concrete-300">Толщина слоя</span>
                  <input v-model.number="thickness" type="number" inputmode="decimal" min="0" step="any" placeholder="0" class="calc-input">
                  <span class="calc-unit">см</span>
                </label>
              </template>
              <label v-else class="group relative block">
                <span class="mb-1.5 block text-xs font-medium text-concrete-300">Объём</span>
                <input v-model.number="volumeInput" type="number" inputmode="decimal" min="0" step="any" placeholder="0" class="calc-input">
                <span class="calc-unit">м³</span>
              </label>
            </div>

            <div class="mt-8 rounded-2xl border border-gold-400/20 bg-gradient-to-br from-gold-400/10 to-transparent p-6">
              <div class="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                Нужно керамзита
              </div>
              <div class="mt-1 font-display text-5xl font-bold tracking-tight text-white">
                <NumberTicker :value="volume" :decimals="2" :duration="0.6" />
                <span class="ml-1 text-2xl text-gold-400">м³</span>
              </div>
            </div>
          </div>

          <!-- Сравнение фасовки -->
          <div class="flex flex-col border-t bg-white/[0.015] p-6 sm:p-10 lg:border-l lg:border-t-0">
            <div class="text-xs font-semibold uppercase tracking-[0.2em] text-concrete-400">
              Стоимость по фасовке
            </div>
            <div class="mt-4 space-y-3">
              <button
                v-for="opt in options"
                :key="opt.id"
                type="button"
                class="relative flex w-full items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-all duration-300"
                :class="selected === opt.id ? 'border-gold-400/60 bg-gold-400/10' : 'hover:border-white/20 hover:bg-white/[0.03]'"
                @click="selected = opt.id"
              >
                <span class="flex items-center gap-4">
                  <span
                    class="grid size-6 shrink-0 place-items-center rounded-full border transition"
                    :class="selected === opt.id ? 'border-gold-400 bg-gold-400 text-concrete-950' : 'border-white/20'"
                  >
                    <Check v-if="selected === opt.id" class="size-3.5" />
                  </span>
                  <span>
                    <span class="block whitespace-nowrap font-semibold text-white">{{ opt.label }}</span>
                    <span class="block text-sm text-concrete-400">{{ volume ? opt.detail : '—' }}</span>
                  </span>
                </span>
                <span class="text-right">
                  <span class="block whitespace-nowrap font-display text-xl font-bold text-white sm:text-2xl">
                    <NumberTicker :value="opt.total" :duration="0.6" /> ₸
                  </span>
                  <span
                    v-if="volume && cheapest === opt.id"
                    class="mt-1 inline-block rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300"
                  >выгоднее всего</span>
                </span>
              </button>
            </div>

            <p class="mt-5 text-xs text-concrete-400">
              Без учёта доставки — она платная, стоимость договорная. Мешки и биг-бэги считаются целыми штуками.
            </p>

            <RequestButton size="lg" class="mt-6 w-full lg:mt-auto" :subject="subject">
              Заказать керамзит
            </RequestButton>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
@reference '../../styles/main.css';

.calc-input {
  @apply h-14 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-4 pr-12 font-display text-lg text-white transition-all placeholder:text-concrete-600 hover:border-white/20 focus:border-gold-400/70 focus:outline-none focus:ring-4 focus:ring-gold-400/15 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none;
}
.calc-unit {
  @apply pointer-events-none absolute bottom-0 right-4 flex h-14 items-center text-sm text-concrete-400 group-focus-within:text-gold-400;
}
</style>
