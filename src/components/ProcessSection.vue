<script setup lang="ts">
import { Calculator, Factory, FileText, Truck } from '@lucide/vue'
import { motion, useScroll, useSpring } from 'motion-v'

const steps = [
  { icon: FileText, title: 'Заявка', text: 'Позвоните, напишите в WhatsApp или оставьте заявку на сайте.' },
  { icon: Calculator, title: 'Расчёт', text: 'Уточним марку, объём и условия на площадке, нужен ли автонасос.' },
  { icon: Factory, title: 'Замес', text: 'Готовим смесь нужной марки на проверенном производстве.' },
  { icon: Truck, title: 'Доставка и заливка', text: 'Привозим миксером к назначенному времени и подаём бетон.' },
]

const track = ref<HTMLElement | null>(null)
const { scrollYProgress } = useScroll({ target: track, offset: ['start 75%', 'end 55%'] })
const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
</script>

<template>
  <section class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="Как мы работаем"
        title="От звонка до залитого фундамента"
      />

      <div ref="track" class="relative mt-16">
        <!-- Линия: горизонтальная на десктопе, вертикальная на мобилке -->
        <div class="absolute left-7 top-0 h-full w-px bg-white/10 lg:left-0 lg:top-7 lg:h-px lg:w-full" aria-hidden="true">
          <motion.div
            class="hidden h-full origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 lg:block"
            :style="{ scaleX: progress }"
          />
          <motion.div
            class="h-full w-full origin-top bg-gradient-to-b from-gold-600 via-gold-400 to-gold-200 lg:hidden"
            :style="{ scaleY: progress }"
          />
        </div>

        <ol class="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
          <Reveal v-for="(step, i) in steps" :key="step.title" as="li" :delay="i * 0.1" class="relative pl-20 lg:pl-0">
            <div class="absolute left-0 top-0 grid size-14 place-items-center rounded-2xl border border-gold-400/30 bg-concrete-900 text-gold-400 shadow-lg shadow-black/40 lg:relative">
              <component :is="step.icon" class="size-6" />
            </div>
            <div class="lg:mt-8">
              <div class="font-display text-xs font-semibold tracking-[0.2em] text-concrete-500">
                ШАГ 0{{ i + 1 }}
              </div>
              <h3 class="mt-2 font-display text-xl font-semibold text-white">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ step.text }}
              </p>
            </div>
          </Reveal>
        </ol>
      </div>
    </div>
  </section>
</template>
