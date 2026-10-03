<script setup lang="ts">
import { ORG_ID, SITE_URL, useJsonLd } from '~/composables/useJsonLd'

// Организация — на всех страницах; страницы ссылаются на неё через @id
useJsonLd('organization', {
  '@type': 'LocalBusiness',
  '@id': ORG_ID,
  'name': 'Gold Beton',
  'url': `${SITE_URL}/`,
  'logo': `${SITE_URL}/monolit3-r.png`,
  'image': `${SITE_URL}/og.jpg`,
  'telephone': '+7 707 399 05 49',
  'description': 'Производство и доставка бетона М100–М450, керамзитобетона, керамзита, песка и щебня по Алматы. Услуги автобетононасоса.',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'м-н Алгабас, 7 ул., 126/2',
    'addressLocality': 'Алматы',
    'addressCountry': 'KZ',
  },
  'geo': { '@type': 'GeoCoordinates', 'latitude': 43.288364, 'longitude': 76.795518 },
  'areaServed': { '@type': 'City', 'name': 'Алматы' },
  'contactPoint': [
    { '@type': 'ContactPoint', 'telephone': '+7 707 399 05 49', 'contactType': 'sales', 'areaServed': 'KZ' },
    { '@type': 'ContactPoint', 'telephone': '+7 777 491 78 97', 'contactType': 'customer service', 'areaServed': 'KZ' },
  ],
  'sameAs': ['https://wa.me/77073990549'],
})
</script>

<template>
  <NavbarComponent />
  <main class="overflow-x-clip">
    <RouterView />
  </main>
  <FloatingContacts />
  <RequestDialog />
</template>
