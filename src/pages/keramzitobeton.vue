<script setup lang="ts">
import { PhoneCall } from '@lucide/vue'
import { usePageSeo } from '~/composables/usePageSeo'
import { keramzitInConcrete } from '~/data/granules'

defineOptions({ name: 'KeramzitobetonPage' })

usePageSeo({
  title: 'Керамзитобетон в Алматы с доставкой | Gold Beton',
  description: 'Керамзитобетон для стяжек, утепления перекрытий и стен. Лёгкий и тёплый бетон с доставкой по Алматы. Рассчитаем объём и стоимость: +7 707 399 05 49',
  path: '/keramzitobeton',
})

const benefits = [
  { icon: 'icon-[mdi--feather]', title: 'Лёгкий', text: 'Меньше нагрузка на фундамент и перекрытия, чем у обычного бетона.' },
  { icon: 'icon-[mdi--thermometer-low]', title: 'Тёплый', text: 'Пористые гранулы керамзита удерживают тепло в доме.' },
  { icon: 'icon-[mdi--volume-off]', title: 'Тихий', text: 'Гасит ударный шум — подходит для полов и межэтажных перекрытий.' },
  { icon: 'icon-[mdi--shield-check]', title: 'Надёжный', text: 'Не гниёт, не горит и не боится влаги.' },
]

const faq = [
  { question: 'Чем керамзитобетон отличается от обычного бетона?', answer: 'В керамзитобетоне крупный заполнитель — керамзит вместо щебня. Поэтому смесь легче, лучше удерживает тепло и гасит ударный шум. Для нагруженных несущих конструкций обычно выбирают тяжёлый бетон нужной марки.' },
  { question: 'Где лучше применять керамзитобетон?', answer: 'Чаще всего — для тёплых стяжек по грунту и перекрытиям, утепления чердачных и межэтажных перекрытий, уклонов плоской кровли, а также для стен и перегородок в малоэтажном строительстве.' },
  { question: 'Сколько стоит керамзитобетон?', answer: 'Цена зависит от марки, объёма и адреса доставки. Оставьте заявку или позвоните по номеру +7 (707) 399-05-49 — рассчитаем точную стоимость.' },
  { question: 'Как рассчитать нужный объём?', answer: 'Воспользуйтесь калькулятором на этой странице: выберите тип конструкции и введите размеры. Для стяжки объём — это площадь, умноженная на толщину слоя в метрах.' },
]

const uses = [
  { icon: 'icon-[mdi--home-floor-0]', title: 'Стяжка пола', text: 'Тёплая и лёгкая стяжка по грунту и по перекрытию.' },
  { icon: 'icon-[mdi--layers]', title: 'Перекрытия', text: 'Утепление и выравнивание межэтажных и чердачных перекрытий.' },
  { icon: 'icon-[mdi--wall]', title: 'Стены', text: 'Монолитные стены и перегородки в малоэтажном строительстве.' },
  { icon: 'icon-[mdi--home-roof]', title: 'Кровля', text: 'Утеплённые уклоны плоских кровель.' },
]
</script>

<template>
  <PageHero
    eyebrow="Керамзитобетон в Алматы"
    title="Керамзитобетон"
    accent="лёгкий и тёплый"
    description="Бетон, в котором вместо щебня — керамзит. Легче обычного, лучше держит тепло и гасит шум. Готовим под вашу задачу и привозим на объект."
    subject="Керамзитобетон"
    :facts="[
      { value: 'Лёгкий', label: 'меньше нагрузка' },
      { value: 'Тёплый', label: 'теплоизоляция' },
      { value: 'Тихий', label: 'гасит шум' },
    ]"
  >
    <template #visual>
      <ConcretePour />
      <GranulesFall
        :kinds="keramzitInConcrete"
        :pile="false"
        :floor="0.26"
        :rate="22"
        :delay="1.8"
        :spread="0.03"
        :stream-x="0.775"
        :stream-x-mobile="0.88"
      />
    </template>
    <template #secondary>
      <a
        href="#calc"
        class="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur transition hover:border-gold-400/50 hover:bg-white/10"
      >
        <span class="icon-[mdi--calculator-variant-outline] text-gold-400" />
        Рассчитать объём
      </a>
    </template>
  </PageHero>

  <UsesGrid
    eyebrow="Преимущества"
    title="Почему керамзитобетон"
    description="Когда важны вес конструкции, тепло и тишина — обычный бетон проигрывает."
    :items="benefits"
  />

  <!-- Цена: марки и прайс керамзитобетона ещё не заданы — пока «по заявке» -->
  <section id="price" class="px-5 py-8 sm:px-8">
    <Reveal class="mx-auto grid max-w-7xl items-center gap-8 rounded-3xl border bg-card/50 p-7 backdrop-blur sm:p-12 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <div class="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
          Стоимость
        </div>
        <h2 class="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
          Рассчитаем цену под ваш объект
        </h2>
        <p class="mt-4 max-w-xl text-muted-foreground">
          Цена керамзитобетона зависит от марки, объёма и адреса доставки. Оставьте заявку или позвоните — назовём точную стоимость.
        </p>
      </div>
      <div class="flex flex-col gap-3">
        <RequestButton size="lg" subject="Керамзитобетон: расчёт стоимости">
          Узнать цену
        </RequestButton>
        <a
          href="tel:+77073990549"
          class="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 px-7 font-semibold text-white transition hover:border-gold-400/50"
        >
          <PhoneCall class="size-5 text-gold-400" />
          +7 (707) 399-05-49
        </a>
      </div>
    </Reveal>
  </section>

  <div id="calc">
    <CalcTabs
      product="Керамзитобетон"
      title="Сколько керамзитобетона нужно?"
      description="Выберите тип конструкции и введите размеры — посчитаем объём для заказа."
    />
  </div>

  <UsesGrid
    eyebrow="Применение"
    title="Где используют керамзитобетон"
    :items="uses"
  />

  <FaqSection :faq="faq" title="Вопросы о керамзитобетоне" />

  <CrossSell
    to="/keramzit"
    eyebrow="Керамзит"
    title="Нужен просто керамзит?"
    text="Сланцевый и глиняный — россыпью, в мешках и биг-бэгах. Цены от 28 000 ₸ за м³."
  />

  <ProductLinks />
  <CtaSection />

  <div id="contacts">
    <Contacs />
  </div>
</template>
