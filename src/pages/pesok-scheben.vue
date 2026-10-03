<script setup lang="ts">
import { usePageSeo } from '~/composables/usePageSeo'
import { bulkMaterials, formatPrice } from '~/data/catalog'
import { sandAndGravel } from '~/data/granules'

defineOptions({ name: 'PesokSchebenPage' })

usePageSeo({
  title: 'Песок и щебень в Алматы с доставкой | Gold Beton',
  description: 'Песок и щебень для бетона, фундаментов, подсыпки и благоустройства. Доставка по Алматы. Рассчитаем объём и стоимость: +7 707 399 05 49',
  path: '/pesok-scheben',
})

const uses = [
  { icon: 'icon-[mdi--home-city]', title: 'Фундаменты', text: 'Песчаная и щебёночная подушка под фундамент и плиту.' },
  { icon: 'icon-[mdi--road-variant]', title: 'Дороги и площадки', text: 'Подсыпка подъездов, парковок и площадок.' },
  { icon: 'icon-[mdi--water-pump]', title: 'Дренаж', text: 'Дренажные слои и отвод воды на участке.' },
  { icon: 'icon-[mdi--pine-tree]', title: 'Благоустройство', text: 'Дорожки, отмостки, выравнивание участка.' },
]
</script>

<template>
  <PageHero
    eyebrow="Нерудные материалы"
    title="Песок и щебень"
    accent="с доставкой по Алматы"
    description="Песок и щебень для бетона, фундаментов, подсыпки и благоустройства. Подберём фракцию под задачу и рассчитаем объём."
    subject="Песок и щебень"
  >
    <template #visual>
      <GranulesFall :kinds="sandAndGravel" :rate="160" :spread="0.08" />
    </template>
  </PageHero>

  <section id="price" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHeading eyebrow="Материалы" title="Что привезём" />
      <div class="mt-14 grid gap-5 md:grid-cols-2">
        <Reveal v-for="(item, i) in bulkMaterials" :key="item.id" :delay="i * 0.1">
          <SpotlightCard class="flex h-full flex-col p-7 sm:p-9">
            <span class="text-4xl text-gold-400" :class="item.icon" />
            <h3 class="mt-6 font-display text-3xl font-bold text-white">
              {{ item.name }}
            </h3>
            <p class="mt-3 flex-1 text-muted-foreground">
              {{ item.text }}
            </p>
            <div v-if="item.fractions?.length" class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="f in item.fractions"
                :key="f"
                class="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-0.5 text-xs font-semibold text-gold-200"
              >{{ f }}</span>
            </div>
            <div class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              <div>
                <div class="text-xs uppercase tracking-wider text-concrete-400">
                  Цена
                </div>
                <div class="mt-1 font-display text-2xl font-bold text-white">
                  <template v-if="item.price">
                    {{ formatPrice(item.price) }} <span class="text-sm font-normal text-concrete-400">/ м³</span>
                  </template>
                  <template v-else>
                    По запросу
                  </template>
                </div>
              </div>
              <RequestButton :subject="item.name">
                Узнать цену
              </RequestButton>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
      <Reveal :delay="0.2" class="mt-5">
        <div class="flex items-center gap-4 rounded-2xl border border-dashed border-white/15 px-6 py-5 text-sm text-concrete-200">
          <span class="icon-[mdi--truck-fast] shrink-0 text-2xl text-gold-400" />
          <span><b class="text-white">Доставка по Алматы</b> — стоимость зависит от объёма и адреса, уточним при заказе.</span>
        </div>
      </Reveal>
    </div>
  </section>

  <div id="calc">
    <VolumeEstimator :materials="bulkMaterials.map(m => m.name)" />
  </div>

  <UsesGrid eyebrow="Применение" title="Для каких работ" :items="uses" />

  <ProductLinks />
  <CtaSection />

  <div id="contacts">
    <Contacs />
  </div>
</template>
