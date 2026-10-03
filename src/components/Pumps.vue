<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'

// Фото для 4-го насоса (services-item4-bg.webp) в /public/pumps нет — пока используем первое
const pumps = [
  { image: '/pumps/services-item1-bg.webp', size: '8×10 м', height: 32, distance: 32 },
  { image: '/pumps/services-item2-bg.webp', size: '6×8 м', height: 37, distance: 37 },
  { image: '/pumps/services-item3-bg.webp', size: '9×12 м', height: 42, distance: 42 },
  { image: '/pumps/services-item1-bg.webp', size: '14×12 м', height: 54, distance: 54 },
]
const maxHeight = 54

const active = ref(0)
const userPicked = ref(false)
const current = computed(() => pumps[active.value])

// Автоматически перебираем насосы, пока пользователь сам не выбрал
const { pause } = useIntervalFn(() => {
  active.value = (active.value + 1) % pumps.length
}, 4500)

function pick(i: number) {
  active.value = i
  userPicked.value = true
  pause()
}
</script>

<template>
  <section class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Автобетононасосы"
            title="Подадим бетон на высоту до 54 метров"
            description="Когда миксер не может подъехать к месту заливки — работает автобетононасос. Подберём технику под площадку и этажность."
          />

          <Reveal :delay="0.1" class="mt-8 flex items-baseline gap-3">
            <span class="text-sm text-muted-foreground">Стоимость</span>
            <span class="font-display text-3xl font-bold text-white">от 40 000 ₸</span>
            <span class="text-sm text-muted-foreground">за 3 часа</span>
          </Reveal>

          <div class="mt-8 space-y-2" role="tablist" aria-label="Длина стрелы">
            <Reveal v-for="(pump, i) in pumps" :key="pump.height" :delay="0.15 + i * 0.06">
              <button
                type="button"
                role="tab"
                :aria-selected="active === i"
                class="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300"
                :class="active === i ? 'border-gold-400/50 bg-gold-400/10' : 'bg-card/40 hover:border-white/20 hover:bg-card/80'"
                @click="pick(i)"
              >
                <!-- Прогресс автопрокрутки -->
                <span
                  v-if="active === i && !userPicked"
                  :key="`p-${active}`"
                  class="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gold-400 [animation:pump-progress_4.5s_linear]"
                />
                <span class="flex items-center gap-4">
                  <span
                    class="font-display text-2xl font-bold transition-colors"
                    :class="active === i ? 'text-gold-300' : 'text-white'"
                  >{{ pump.height }} м</span>
                  <span class="text-sm text-muted-foreground">стрела</span>
                </span>
                <span class="text-sm text-concrete-300">площадка {{ pump.size }}</span>
              </button>
            </Reveal>
          </div>

          <Reveal :delay="0.4" class="mt-8">
            <div class="flex flex-wrap items-center gap-4">
              <RequestButton :subject="`Автобетононасос ${current.height} м`">
                Заказать насос {{ current.height }} м
              </RequestButton>
              <RouterLink v-if="$route.path !== '/avtobetononasos'" to="/avtobetononasos" class="text-sm font-semibold text-gold-300 transition hover:text-gold-200">
                Подробнее об услуге →
              </RouterLink>
            </div>
          </Reveal>
        </div>

        <Reveal :delay="0.1" class="relative">
          <div class="relative aspect-square overflow-hidden sm:aspect-[4/3.4] rounded-3xl border bg-card lg:aspect-auto lg:h-full">
            <AnimatePresence>
              <motion.img
                :key="active"
                :src="current.image"
                alt="Автобетононасос"
                loading="lazy"
                class="absolute inset-0 size-full object-cover"
                :initial="{ opacity: 0, scale: 1.08 }"
                :animate="{ opacity: 1, scale: 1 }"
                :exit="{ opacity: 0 }"
                :transition="{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }"
              />
            </AnimatePresence>
            <div class="absolute inset-0 bg-gradient-to-t from-concrete-950 via-concrete-950/30 to-transparent" />

            <!-- Шкала высоты подачи -->
            <div class="absolute bottom-6 right-6 top-6 flex w-12 flex-col items-center">
              <div class="relative w-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  class="absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-gold-600 to-gold-300"
                  :animate="{ height: `${(current.height / maxHeight) * 100}%` }"
                  :transition="{ duration: 1, ease: [0.22, 1, 0.36, 1] }"
                />
              </div>
              <span class="mt-2 text-[10px] uppercase tracking-widest text-concrete-300">0 м</span>
            </div>

            <div class="absolute inset-x-4 bottom-4 mr-12 grid grid-cols-3 gap-2 sm:inset-x-6 sm:bottom-6 sm:mr-14 sm:gap-3">
              <div
                v-for="spec in [
                  { label: 'Высота', value: `${current.height} м` },
                  { label: 'Дальность', value: `${current.distance} м` },
                  { label: 'Площадка', value: current.size },
                ]"
                :key="spec.label"
                class="rounded-xl border border-white/10 bg-concrete-950/70 p-2.5 backdrop-blur-md sm:rounded-2xl sm:p-4"
              >
                <div class="text-[10px] uppercase tracking-wider text-concrete-400 sm:text-xs">
                  {{ spec.label }}
                </div>
                <div class="mt-1 whitespace-nowrap font-display text-sm font-semibold text-white sm:text-xl">
                  {{ spec.value }}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes pump-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
