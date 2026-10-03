<script setup lang="ts">
// Простой расчёт объёма засыпки: площадь × толщина слоя
const { materials, product } = defineProps<{
  materials: string[]
  product?: string
}>()

const active = ref(0)
const area = ref<number | null>(null)
const thickness = ref<number | null>(null)

const volume = computed(() => {
  if (!area.value || !thickness.value)
    return 0
  return Math.max(0, Number((area.value * (thickness.value / 100)).toFixed(2)))
})

const name = computed(() => materials[active.value] ?? product ?? '')
</script>

<template>
  <section class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        align="center"
        eyebrow="Калькулятор"
        title="Сколько материала нужно"
        description="Площадь подсыпки и толщина слоя — получите объём для заказа."
      />
      <Reveal :delay="0.1" class="mx-auto mt-12 max-w-3xl">
        <div class="rounded-3xl border bg-card/50 p-6 backdrop-blur sm:p-10">
          <div v-if="materials.length > 1" class="grid grid-cols-2 gap-2 rounded-2xl border bg-white/[0.02] p-1.5">
            <button
              v-for="(m, i) in materials"
              :key="m"
              type="button"
              class="rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-300"
              :class="active === i ? 'bg-gold-400 text-concrete-950' : 'text-concrete-300 hover:bg-white/5 hover:text-white'"
              @click="active = i"
            >
              {{ m }}
            </button>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <label class="group relative block">
              <span class="mb-1.5 block text-xs font-medium text-concrete-300">Площадь</span>
              <input v-model.number="area" type="number" inputmode="decimal" min="0" step="any" placeholder="0" class="h-14 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-4 pr-12 font-display text-lg text-white transition-all [appearance:textfield] placeholder:text-concrete-600 hover:border-white/20 focus:border-gold-400/70 focus:outline-none focus:ring-4 focus:ring-gold-400/15 [&::-webkit-inner-spin-button]:appearance-none">
              <span class="pointer-events-none absolute bottom-0 right-4 flex h-14 items-center text-sm text-concrete-400 group-focus-within:text-gold-400">м²</span>
            </label>
            <label class="group relative block">
              <span class="mb-1.5 block text-xs font-medium text-concrete-300">Толщина слоя</span>
              <input v-model.number="thickness" type="number" inputmode="decimal" min="0" step="any" placeholder="0" class="h-14 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-4 pr-12 font-display text-lg text-white transition-all [appearance:textfield] placeholder:text-concrete-600 hover:border-white/20 focus:border-gold-400/70 focus:outline-none focus:ring-4 focus:ring-gold-400/15 [&::-webkit-inner-spin-button]:appearance-none">
              <span class="pointer-events-none absolute bottom-0 right-4 flex h-14 items-center text-sm text-concrete-400 group-focus-within:text-gold-400">см</span>
            </label>
          </div>

          <div class="mt-6 flex flex-col gap-6 rounded-2xl border border-gold-400/20 bg-gradient-to-br from-gold-400/10 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div class="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                Объём
              </div>
              <div class="mt-1 font-display text-5xl font-bold tracking-tight text-white">
                <NumberTicker :value="volume" :decimals="2" :duration="0.6" />
                <span class="ml-1 text-2xl text-gold-400">м³</span>
              </div>
            </div>
            <RequestButton size="lg" :subject="volume ? `${name}: ${volume} м³` : name">
              Заказать
            </RequestButton>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>
