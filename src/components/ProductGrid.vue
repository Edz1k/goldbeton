<script setup lang="ts">
interface ProductItem {
  image: string

  note?: string
}

const products: ProductItem[] = [
  { image: '/marks/100.webp', note: 'Бетон B 7.5 (M100)' },
  { image: '/marks/150.webp', note: 'Бетон B 12.5 (M150)' },
  { image: '/marks/200.webp', note: 'Бетон B 15 (M200)' },
  { image: '/marks/250.webp', note: 'Бетон B 20 (M250)' },
  { image: '/marks/300.webp', note: 'Бетон B 22.5 (M300)' },
  { image: '/marks/350.webp', note: 'Бетон B 25 (M350)' },
  { image: '/marks/400.webp', note: 'Бетон B 30 (M400)' },
  { image: '/marks/450.webp', note: 'Бетон B 35 (M450)' },
]
</script>

<template>
  <section id="assortment" class="py-16 bg-gray-100">
    <div class="mx-auto px-4 container">
      <h2 class="text-3xl font-bold mb-4 text-center">
        НАШ АССОРТИМЕНТ
      </h2>
      <p class="text-gray-600 mx-auto mb-10 text-center max-w-xl">
        На сегодняшний день мы предлагаем следующую продукцию с доставкой до объекта строительства по городу Алматы:
      </p>

      <div class="gap-6 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2">
        <div
          v-for="(item, i) in products"
          :key="i"
          class="p-6 text-center rounded-xl bg-white flex flex-col shadow-md items-center"
        >
          <div class="mb-4">
            <img
              :src="item.image"
              alt="Марка бетона"
              class="border border-gray-200 rounded-full h-24 w-24 shadow-sm object-contain"
            >
          </div>
          <div class="text-sm text-gray-600 mb-1 py-2">
            {{ item.note }}
          </div>
          <OrderComponent />
        </div>
      </div>
    </div>
  </section>
</template>
