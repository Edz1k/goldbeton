<script setup lang="ts">
const {
  product = 'Бетон',
  title = 'Сколько бетона нужно?',
  description = 'Выберите тип конструкции, введите размеры — и закажите рассчитанный объём со скидкой.',
} = defineProps<{
  product?: string
  title?: string
  description?: string
}>()

interface Field {
  key: string
  label: string
  unit: 'м' | 'см'
}

interface CalcVariant {
  label: string
  title: string
  image: string
  alt: string
  fields: Field[]
  /** Объём в м³; вызывается, только когда заполнены все поля */
  formula: (v: Record<string, number>) => number
}

const stripFields: Field[] = [
  { key: 'a', label: 'Длина ленты A', unit: 'м' },
  { key: 'b', label: 'Длина ленты B', unit: 'м' },
  { key: 'c', label: 'Высота ленты C', unit: 'см' },
  { key: 'd', label: 'Ширина ленты D', unit: 'см' },
]

const variants: CalcVariant[] = [
  {
    label: 'Лента',
    title: 'Ленточный фундамент',
    image: 'https://optim.tildacdn.pro/tild6133-6436-4432-a330-303439313930/-/resize/720x/-/format/webp/1.jpg.webp',
    alt: 'Схема ленточного фундамента',
    fields: stripFields,
    formula: ({ a, b, c, d }) => 2 * (a + b) * (c / 100) * (d / 100),
  },
  {
    label: 'Лента + перегородка',
    title: 'Лента с перегородкой',
    image: 'https://optim.tildacdn.pro/tild3336-6334-4832-b231-356363326632/-/resize/720x/-/format/webp/2.jpg.webp',
    alt: 'Схема ленточного фундамента с перегородкой',
    fields: stripFields,
    formula: ({ a, b, c, d }) => (2 * a + 3 * b) * (c / 100) * (d / 100),
  },
  {
    label: 'Лента + 2 оси',
    title: 'Лента с внутренней продольной стеной',
    image: 'https://optim.tildacdn.pro/tild3065-6337-4537-a532-646238616236/-/resize/720x/-/format/webp/3.jpg.webp',
    alt: 'Схема ленточного фундамента с внутренними стенами',
    fields: stripFields,
    formula: ({ a, b, c, d }) => {
      const dMeters = d / 100
      const totalLength = 2 * a + 3 * b + (a - 2 * dMeters)
      return totalLength * (c / 100) * dMeters
    },
  },
  {
    label: 'Сложная лента',
    title: 'Лента с дополнительным элементом',
    image: 'https://optim.tildacdn.pro/tild3033-6163-4134-b939-326262303834/-/resize/720x/-/format/webp/4.jpg.webp',
    alt: 'Схема ленточного фундамента с внутренним элементом',
    fields: [...stripFields, { key: 'e', label: 'Длина ленты E', unit: 'м' }],
    formula: ({ a, b, c, d, e }) => (2 * a + 3 * b + e) * (c / 100) * (d / 100),
  },
  {
    label: 'Плита / пол',
    title: 'Плита или напольное покрытие',
    image: 'https://optim.tildacdn.pro/tild6165-3638-4132-b134-366231393632/-/resize/720x/-/format/webp/_.jpg.webp',
    alt: 'Схема напольной плиты',
    fields: [
      { key: 'a', label: 'Длина плиты A', unit: 'м' },
      { key: 'b', label: 'Ширина плиты B', unit: 'м' },
      { key: 'c', label: 'Толщина плиты C', unit: 'см' },
    ],
    formula: ({ a, b, c }) => a * b * (c / 100),
  },
]

const active = ref(0)
// Значения храним по вкладкам, чтобы при переключении ничего не терялось
const values = reactive<Record<number, Record<string, number | null>>>(
  Object.fromEntries(variants.map((_, i) => [i, {}])),
)

const current = computed(() => variants[active.value])

const volume = computed(() => {
  const v = values[active.value]
  const filled = current.value.fields.every(f => v[f.key])
  if (!filled)
    return 0
  const result = current.value.formula(v as Record<string, number>)
  return Math.max(0, Number(result.toFixed(2)))
})
</script>

<template>
  <section class="relative overflow-hidden py-24 sm:py-32">
    <div class="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gold-400/[0.06] blur-3xl" aria-hidden="true" />

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        align="center"
        eyebrow="Калькулятор"
        :title="title"
        :description="description"
      />

      <Reveal :delay="0.1" class="mt-12 flex justify-center">
        <div role="tablist" class="flex max-w-full gap-1 overflow-x-auto rounded-full border bg-card/60 p-1.5 backdrop-blur [scrollbar-width:none]">
          <button
            v-for="(variant, i) in variants"
            :key="variant.label"
            role="tab"
            type="button"
            :aria-selected="active === i"
            class="relative shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 sm:px-5"
            :class="active === i ? 'text-concrete-950' : 'text-concrete-300 hover:text-white'"
            @click="active = i"
          >
            <span
              class="absolute inset-0 rounded-full bg-gold-400 transition-all duration-300"
              :class="active === i ? 'scale-100 opacity-100' : 'scale-90 opacity-0'"
            />
            <span class="relative">{{ variant.label }}</span>
          </button>
        </div>
      </Reveal>

      <Reveal :delay="0.15" class="mt-8">
        <div class="grid overflow-hidden rounded-3xl border bg-card/50 backdrop-blur lg:grid-cols-[1.1fr_1fr]">
          <!-- Поля -->
          <div class="p-6 sm:p-10">
            <h3 class="font-display text-xl font-semibold text-white sm:text-2xl">
              {{ current.title }}
            </h3>
            <p class="mt-2 text-sm text-muted-foreground">
              Размеры смотрите на схеме справа
            </p>

            <div class="mt-8 grid gap-3 sm:grid-cols-2">
              <label
                v-for="field in current.fields"
                :key="`${active}-${field.key}`"
                class="group relative block"
              >
                <span class="mb-1.5 block text-xs font-medium text-concrete-300">{{ field.label }}</span>
                <input
                  v-model.number="values[active][field.key]"
                  type="number"
                  inputmode="decimal"
                  min="0"
                  step="any"
                  placeholder="0"
                  class="h-14 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-4 pr-12 font-display text-lg text-white placeholder:text-concrete-600 transition-all [appearance:textfield] hover:border-white/20 focus:border-gold-400/70 focus:outline-none focus:ring-4 focus:ring-gold-400/15 [&::-webkit-inner-spin-button]:appearance-none"
                >
                <span class="pointer-events-none absolute bottom-0 right-4 flex h-14 items-center text-sm text-concrete-400 group-focus-within:text-gold-400">
                  {{ field.unit }}
                </span>
              </label>
            </div>

            <!-- Результат -->
            <div class="mt-8 flex flex-col gap-6 rounded-2xl border border-gold-400/20 bg-gradient-to-br from-gold-400/10 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div class="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                  Итого
                </div>
                <div class="mt-1 font-display text-5xl font-bold tracking-tight text-white">
                  <NumberTicker :value="volume" :decimals="2" :duration="0.6" />
                  <span class="ml-1 text-2xl text-gold-400">м³</span>
                </div>
              </div>
              <RequestButton
                size="lg"
                :subject="volume > 0 ? `${product}, ${current.title.toLowerCase()}: ${volume} м³` : `${product}, ${current.title.toLowerCase()}`"
              >
                {{ volume > 0 ? `Заказать ${volume} м³` : 'Заказать' }}
              </RequestButton>
            </div>
          </div>

          <!-- Схема -->
          <div class="relative flex items-center justify-center border-t bg-white p-6 lg:border-l lg:border-t-0">
            <Transition
              mode="out-in"
              enter-active-class="transition duration-400 ease-out"
              enter-from-class="opacity-0 scale-95 blur-sm"
              leave-active-class="transition duration-200 ease-in"
              leave-to-class="opacity-0 scale-95"
            >
              <img
                :key="current.image"
                :src="current.image"
                :alt="current.alt"
                loading="lazy"
                class="aspect-[4/3] max-h-[420px] w-full object-contain"
              >
            </Transition>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
</template>
