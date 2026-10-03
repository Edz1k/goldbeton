<script setup lang="ts">
import { usePageSeo } from '~/composables/usePageSeo'
import { keramzitGranules } from '~/data/granules'

defineOptions({ name: 'KeramzitPage' })

usePageSeo({
  title: 'Керамзит в Алматы — цена за м³, мешок 50 л, биг-бэг | Gold Beton',
  description: 'Сланцевый керамзит от 28 000 ₸/м³, глиняный от 35 000 ₸/м³. Россыпью, в мешках 50 л и биг-бэгах 1,2 м³. Доставка по Алматы. +7 707 399 05 49',
  path: '/keramzit',
})

const faq = [
  { question: 'Сколько стоит куб керамзита?', answer: 'Сланцевый керамзит россыпью — 28 000 ₸ за м³, глиняный — 35 000 ₸ за м³. В биг-бэгах — 33 000 и 40 000 ₸ за м³ соответственно, один биг-бэг объёмом 1,2 м³ стоит 39 600 и 48 000 ₸.' },
  { question: 'Сколько мешков в одном кубе?', answer: 'В кубометре 20 мешков по 50 литров. Мешок сланцевого керамзита стоит 2 000 ₸, глиняного — 2 500 ₸. Мешки удобны для небольших объёмов и мест, куда сложно подвезти россыпь.' },
  { question: 'Что выгоднее — россыпь, мешки или биг-бэг?', answer: 'Дешевле всего за кубометр выходит россыпь, дороже — мешки. Биг-бэг — середина: аккуратная фасовка по 1,2 м³. Калькулятор на этой странице сравнит все три варианта для вашего объёма.' },
  { question: 'Есть ли доставка керамзита?', answer: 'Да, доставляем по Алматы. Доставка платная, стоимость договорная — зависит от объёма и адреса. Назовите их по телефону или в заявке, и мы рассчитаем итоговую сумму.' },
]

const uses = [
  { icon: 'icon-[mdi--home-floor-0]', title: 'Утепление пола', text: 'Засыпка по грунту и под стяжку — тёплый и лёгкий слой.' },
  { icon: 'icon-[mdi--layers]', title: 'Перекрытия и чердаки', text: 'Тепло- и звукоизоляция перекрытий, чердаков и кровли.' },
  { icon: 'icon-[mdi--water-pump]', title: 'Дренаж', text: 'Отвод воды вокруг фундамента и на участке.' },
  { icon: 'icon-[mdi--sprout]', title: 'Ландшафт', text: 'Клумбы, газоны, мульчирование и декоративные засыпки.' },
]
</script>

<template>
  <PageHero
    eyebrow="Керамзит в Алматы"
    title="Керамзит"
    accent="россыпью и в биг-бэгах"
    description="Сланцевый и глиняный керамзит фракций 5–20, 10–20 и 20–40 мм. Продаём россыпью, в мешках по 50 литров и в биг-бэгах по 1,2 м³."
    subject="Керамзит"
    :facts="[
      { value: 'от 28 000 ₸', label: 'за м³ россыпью' },
      { value: '2 000 ₸', label: 'мешок 50 л' },
      { value: '1,2 м³', label: 'объём биг-бэга' },
    ]"
  >
    <template #visual>
      <GranulesFall :kinds="keramzitGranules" :rate="110" />
    </template>
    <template #secondary>
      <a
        href="#price"
        class="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur transition hover:border-gold-400/50 hover:bg-white/10"
      >
        <span class="icon-[mdi--tag-outline] text-gold-400" />
        Смотреть цены
      </a>
    </template>
  </PageHero>

  <div id="price">
    <KeramzitPrices />
  </div>

  <div id="calc">
    <KeramzitCalculator />
  </div>

  <UsesGrid
    eyebrow="Применение"
    title="Где пригодится керамзит"
    :items="uses"
  />

  <FaqSection :faq="faq" title="Вопросы о керамзите" />

  <CrossSell
    to="/keramzitobeton"
    eyebrow="Керамзитобетон"
    title="Нужен готовый лёгкий бетон?"
    text="Привезём керамзитобетон для стяжек, перекрытий и стен — без самостоятельного замеса."
  />

  <ProductLinks />
  <CtaSection />

  <div id="contacts">
    <Contacs />
  </div>
</template>
