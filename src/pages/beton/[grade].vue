<script setup lang="ts">
import { ORG_ID, SITE_URL, useJsonLd } from '~/composables/useJsonLd'
import { usePageSeo } from '~/composables/usePageSeo'
import { concreteGrades } from '~/data/seo/concrete-grades'

defineOptions({ name: 'ConcreteGradePage' })

const route = useRoute('/beton/[grade]')
const grade = computed(() => concreteGrades.find(g => g.slug === route.params.grade))

if (grade.value) {
  const g = grade.value
  const path = `/beton/${g.slug}`
  usePageSeo({ title: g.title, description: g.description, path, image: g.image })
  // Цены за куб пока нет — размечаем как услугу поставки, а не Product
  // (Product без offers.price Google считает ошибкой)
  useJsonLd('page', {
    '@type': 'Service',
    'name': `Бетон ${g.mark} (${g.cls}) с доставкой`,
    'serviceType': 'Поставка товарного бетона',
    'description': g.description,
    'url': `${SITE_URL}${path}`,
    'image': `${SITE_URL}${g.image}`,
    'provider': { '@id': ORG_ID },
    'areaServed': { '@type': 'City', 'name': 'Алматы' },
  })
}

const siblings = computed(() => concreteGrades
  .filter(g => g.slug !== grade.value?.slug)
  .map(g => ({ to: `/beton/${g.slug}`, name: g.mark, hint: `Класс ${g.cls}` })))
</script>

<template>
  <template v-if="grade">
    <ProductHero
      :crumbs="[{ name: 'Бетон', path: '/#assortiment' }, { name: `Бетон ${grade.mark}`, path: `/beton/${grade.slug}` }]"
      :h1="grade.h1"
      :lead="grade.lead"
      :subject="`Бетон ${grade.mark} (${grade.cls})`"
      :chips="[
        { label: 'Класс', value: grade.cls },
        { label: 'Доставка', value: 'в день заказа' },
        { label: 'Приём заказов', value: '24/7' },
      ]"
    >
      <template #visual>
        <SpotlightCard class="relative aspect-square overflow-hidden">
          <img
            :src="grade.image"
            :alt="`Бетон ${grade.mark} класс ${grade.cls}`"
            width="512"
            height="512"
            fetchpriority="high"
            class="size-full object-cover grayscale transition duration-700 group-hover/spot:scale-105"
          >
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-concrete-950/90 to-transparent p-6">
            <div class="text-xs uppercase tracking-[0.2em] text-concrete-300">
              Прочность
            </div>
            <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div class="h-full rounded-full bg-gradient-to-r from-concrete-400 via-gold-500 to-gold-300" :style="{ width: `${(grade.strength / 35) * 100}%` }" />
            </div>
          </div>
        </SpotlightCard>
      </template>
    </ProductHero>

    <ProductDetails
      :title="`Бетон ${grade.mark} — описание и особенности`"
      :intro="grade.intro"
      :specs="[
        { label: 'Марка', value: grade.mark },
        { label: 'Класс прочности', value: grade.cls },
        { label: 'Доставка', value: 'миксером по Алматы' },
        { label: 'Подача', value: 'автонасос 32–54 м' },
        { label: 'Оплата', value: 'нал. и безнал.' },
      ]"
      :uses="grade.uses"
      :uses-title="`Где применяется ${grade.mark}`"
      :advantages="grade.advantages"
      :advantages-title="`Почему ${grade.mark}`"
      :tips="grade.tips"
    />

    <div id="calc">
      <CalcTabs
        :product="`Бетон ${grade.mark}`"
        :title="`Сколько бетона ${grade.mark} нужно?`"
      />
    </div>

    <FaqSection :faq="grade.faq" :title="`Вопросы о бетоне ${grade.mark}`" />
    <SiblingLinks title="Другие марки бетона" :items="siblings" />
    <CtaSection />
    <div id="contacts">
      <Contacs />
    </div>
  </template>
  <NotFoundBlock v-else />
</template>
