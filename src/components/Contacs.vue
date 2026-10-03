<script setup lang="ts">
import { MapPin, MessageCircle, Phone } from '@lucide/vue'
import { keramzitTypes, productPages } from '~/data/catalog'
import { concreteGrades } from '~/data/seo/concrete-grades'
import { keramzitFractions } from '~/data/seo/keramzit-fractions'

const year = new Date().getFullYear()

const contacts = [
  { icon: Phone, label: 'Основной телефон · WhatsApp', value: '+7 (707) 399-05-49', href: 'tel:+77073990549' },
  { icon: Phone, label: 'Дополнительный телефон', value: '+7 (777) 491-78-97', href: 'tel:+77774917897' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Написать в WhatsApp', href: 'https://wa.me/77073990549', external: true },
  { icon: MapPin, label: 'Адрес', value: 'м-н Алгабас, 7 ул. 126/2, Алматы' },
]

// Футер — карта сайта: ссылки на все посадочные страницы для перелинковки
const columns = [
  {
    title: 'Бетон',
    links: concreteGrades.map(g => ({ name: `Бетон ${g.mark}`, to: `/beton/${g.slug}` })),
  },
  {
    title: 'Продукция и услуги',
    links: [
      ...productPages.map(p => ({ name: p.name, to: p.to })),
      { name: 'Автобетононасос', to: '/avtobetononasos' },
    ],
  },
  {
    title: 'Керамзит',
    links: keramzitFractions.map((f) => {
      const t = keramzitTypes.find(x => x.id === f.typeId)!
      return { name: `${t.short} ${f.fraction}`, to: `/keramzit/${f.slug}` }
    }),
  },
]
</script>

<template>
  <section class="relative pt-24 sm:pt-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading eyebrow="Контакты" title="Приезжайте или звоните" />

      <div class="mt-14 grid gap-4 lg:grid-cols-[1fr_1.6fr]">
        <div class="flex flex-col gap-4">
          <Reveal v-for="(item, i) in contacts" :key="item.label" :delay="i * 0.07">
            <component
              :is="item.href ? 'a' : 'div'"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener' : undefined"
              class="group flex items-center gap-5 rounded-2xl border bg-card/50 p-5 transition hover:border-gold-400/40"
            >
              <span class="grid size-12 shrink-0 place-items-center rounded-xl bg-gold-400/10 text-gold-400 transition group-hover:bg-gold-400 group-hover:text-concrete-950">
                <component :is="item.icon" class="size-5" />
              </span>
              <span>
                <span class="block text-xs uppercase tracking-[0.2em] text-concrete-400">{{ item.label }}</span>
                <span class="mt-1 block text-lg font-semibold text-white">{{ item.value }}</span>
              </span>
            </component>
          </Reveal>
        </div>

        <Reveal :delay="0.1" class="overflow-hidden rounded-3xl border">
          <iframe
            title="Gold Beton на карте"
            loading="lazy"
            class="block h-full min-h-[380px] w-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)_brightness(0.95)]"
            src="https://yandex.kz/map-widget/v1/?ll=76.795518%2C43.288364&z=16&whatshere%5Bpoint%5D=76.795518%2C43.288364&whatshere%5Bzoom%5D=17"
            allowfullscreen
          />
        </Reveal>
      </div>
    </div>

    <footer class="mt-24 border-t">
      <div class="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div>
          <BrandMark />
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Бетон, керамзитобетон, керамзит, песок и щебень с доставкой по Алматы. Автобетононасосы до 54 м.
          </p>
          <div class="mt-5 flex flex-col gap-1">
            <a href="tel:+77073990549" class="font-display text-lg font-semibold text-white transition hover:text-gold-300">+7 (707) 399-05-49</a>
            <a href="tel:+77774917897" class="text-sm text-concrete-300 transition hover:text-gold-300">+7 (777) 491-78-97</a>
          </div>
        </div>
        <nav v-for="col in columns" :key="col.title" :aria-label="col.title">
          <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {{ col.title }}
          </h2>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li v-for="link in col.links" :key="link.to">
              <RouterLink :to="link.to" class="text-concrete-300 transition hover:text-gold-300">
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="mx-auto max-w-7xl border-t px-5 py-6 text-sm text-muted-foreground sm:px-8">
        © {{ year }} «Gold Beton». Все права защищены.
      </div>
      <!-- Гигантский вордмарк -->
      <div class="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div class="translate-y-[18%] whitespace-nowrap text-center font-display text-[14vw] font-bold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_oklch(1_0_0/0.08)]">
          GOLD BETON
        </div>
      </div>
    </footer>
  </section>
</template>
