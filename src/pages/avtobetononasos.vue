<script setup lang="ts">
import { ORG_ID, SITE_URL, useJsonLd } from '~/composables/useJsonLd'
import { usePageSeo } from '~/composables/usePageSeo'
import { pumpService as p } from '~/data/seo/pump-service'

defineOptions({ name: 'PumpServicePage' })

usePageSeo({ title: p.title, description: p.description, path: '/avtobetononasos', image: '/pumps/services-item1-bg.webp' })
useJsonLd('page', {
  '@type': 'Service',
  'name': 'Аренда автобетононасоса',
  'serviceType': 'Подача бетона автобетононасосом',
  'description': p.description,
  'url': `${SITE_URL}/avtobetononasos`,
  'provider': { '@id': ORG_ID },
  'areaServed': { '@type': 'City', 'name': 'Алматы' },
  'offers': {
    '@type': 'Offer',
    'price': 40000,
    'priceCurrency': 'KZT',
    'description': 'От 40 000 ₸ за 3 часа работы',
  },
})
</script>

<template>
  <ProductHero
    :crumbs="[{ name: 'Автобетононасос', path: '/avtobetononasos' }]"
    :h1="p.h1"
    :lead="p.lead"
    subject="Аренда автобетононасоса"
    :chips="[
      { label: 'Стрела', value: '32–54 м' },
      { label: 'Стоимость', value: 'от 40 000 ₸' },
      { label: 'Минимум', value: '3 часа' },
    ]"
  >
    <template #visual>
      <SpotlightCard class="relative aspect-[4/3] overflow-hidden">
        <img
          src="/pumps/services-item3-bg.webp"
          alt="Автобетононасос Gold Beton"
          fetchpriority="high"
          class="size-full object-cover transition duration-700 group-hover/spot:scale-105"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-concrete-950/80 via-transparent to-transparent" />
        <div class="absolute bottom-5 left-5 font-display text-4xl font-bold text-white">
          до 54 м
        </div>
      </SpotlightCard>
    </template>
  </ProductHero>

  <ProductDetails
    title="Как работает автобетононасос"
    :intro="p.intro"
    :specs="[
      { label: 'Стрела 32 м', value: 'площадка 8×10 м' },
      { label: 'Стрела 37 м', value: 'площадка 6×8 м' },
      { label: 'Стрела 42 м', value: 'площадка 9×12 м' },
      { label: 'Стрела 54 м', value: 'площадка 14×12 м' },
      { label: 'Стоимость', value: 'от 40 000 ₸ / 3 ч' },
    ]"
    :uses="p.whenNeeded"
    uses-title="Когда нужен насос"
    :advantages="p.prepare"
    advantages-title="Как подготовить площадку"
  />

  <div id="pumps">
    <Pumps />
  </div>

  <FaqSection :faq="p.faq" title="Вопросы об автобетононасосе" />
  <ProductLinks />
  <CtaSection />
  <div id="contacts">
    <Contacs />
  </div>
</template>
