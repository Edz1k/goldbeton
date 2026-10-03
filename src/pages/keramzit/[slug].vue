<script setup lang="ts">
import { ORG_ID, SITE_URL, useJsonLd } from '~/composables/useJsonLd'
import { usePageSeo } from '~/composables/usePageSeo'
import { BIG_BAG_VOLUME_M3, bigBagPrice, formatPrice, keramzitTypes } from '~/data/catalog'
import { keramzitGranules } from '~/data/granules'
import { keramzitFractions } from '~/data/seo/keramzit-fractions'

defineOptions({ name: 'KeramzitFractionPage' })

const route = useRoute('/keramzit/[slug]')
const item = computed(() => keramzitFractions.find(f => f.slug === route.params.slug))
const type = computed(() => keramzitTypes.find(t => t.id === item.value?.typeId))

// Гранулы только нужного вида: сланцевые серые, глиняные терракотовые
const granules = computed(() => [keramzitGranules[item.value?.typeId === 'clay' ? 0 : 1]].map(k => ({ ...k, weight: 1 })))

if (item.value && type.value) {
  const f = item.value
  const t = type.value
  const path = `/keramzit/${f.slug}`
  usePageSeo({ title: f.title, description: f.description, path })
  const offer = (name: string, price: number, unit?: string) => ({
    '@type': 'Offer',
    name,
    price,
    'priceCurrency': 'KZT',
    'availability': 'https://schema.org/InStock',
    'seller': { '@id': ORG_ID },
    'areaServed': { '@type': 'City', 'name': 'Алматы' },
    ...(unit && { priceSpecification: { '@type': 'UnitPriceSpecification', price, 'priceCurrency': 'KZT', 'unitCode': unit } }),
  })
  useJsonLd('page', {
    '@type': 'Product',
    'name': `${t.name} ${f.fraction}`,
    'description': f.description,
    'url': `${SITE_URL}${path}`,
    'image': `${SITE_URL}/og.jpg`,
    'category': 'Керамзит',
    'brand': { '@type': 'Brand', 'name': 'Gold Beton' },
    'offers': [
      offer('Россыпью, за 1 м³', t.bulk, 'MTQ'),
      offer('Мешок 50 л', t.bag),
      offer(`Биг-бэг ${BIG_BAG_VOLUME_M3} м³`, bigBagPrice(t)),
    ],
  })
}

const siblings = computed(() => keramzitFractions
  .filter(f => f.slug !== item.value?.slug)
  .map((f) => {
    const t = keramzitTypes.find(x => x.id === f.typeId)!
    return { to: `/keramzit/${f.slug}`, name: `${t.short} ${f.fraction}`, hint: `от ${formatPrice(t.bulk)}/м³` }
  }))
</script>

<template>
  <template v-if="item && type">
    <ProductHero
      :crumbs="[{ name: 'Керамзит', path: '/keramzit' }, { name: `${type.short} ${item.fraction}`, path: `/keramzit/${item.slug}` }]"
      :h1="item.h1"
      :lead="item.lead"
      :subject="`${type.name} ${item.fraction}`"
      :chips="[
        { label: 'Россыпью', value: `${formatPrice(type.bulk)}/м³` },
        { label: 'Мешок 50 л', value: formatPrice(type.bag) },
        { label: 'Биг-бэг 1,2 м³', value: formatPrice(bigBagPrice(type)) },
      ]"
    >
      <template #visual>
        <div class="relative aspect-square overflow-hidden rounded-3xl border bg-card/60">
          <GranulesFall :kinds="granules" :stream-x="0.5" :stream-x-mobile="0.5" :spread="0.12" :rate="70" :max-pile="0.4" />
          <div class="absolute left-6 top-6 rounded-full border border-white/10 bg-concrete-950/70 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
            Фракция {{ item.fraction }}
          </div>
        </div>
      </template>
    </ProductHero>

    <ProductDetails
      :title="`${type.name} ${item.fraction} — описание`"
      :intro="item.intro"
      :specs="[
        { label: 'Вид', value: type.short },
        { label: 'Фракция', value: item.fraction },
        { label: 'Россыпью', value: `${formatPrice(type.bulk)} / м³` },
        { label: 'Мешок 50 л', value: formatPrice(type.bag) },
        { label: 'Биг-бэг', value: `${formatPrice(type.bigBagPerM3)} / м³` },
        { label: 'Доставка', value: 'платная, договорная' },
      ]"
      :uses="item.uses"
      uses-title="Где применяется"
      :advantages="item.advantages"
      advantages-title="Преимущества"
    />

    <div id="calc">
      <KeramzitCalculator />
    </div>

    <FaqSection :faq="item.faq" />
    <SiblingLinks title="Другие виды керамзита" :items="siblings" />
    <CrossSell
      to="/keramzitobeton"
      eyebrow="Керамзитобетон"
      title="Нужен готовый лёгкий бетон?"
      text="Привезём керамзитобетон для стяжек, перекрытий и стен — без самостоятельного замеса."
    />
    <CtaSection />
    <div id="contacts">
      <Contacs />
    </div>
  </template>
  <NotFoundBlock v-else />
</template>
