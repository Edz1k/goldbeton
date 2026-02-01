<script setup lang="ts">
const pumps = [
  {
    image: '/pumps/services-item1-bg.webp',
    size: '8×10 м',
    height: '32 м',
    distance: '32 м',
  },
  {
    image: '/pumps/services-item2-bg.webp',
    size: '6×8 м',
    height: '37 м',
    distance: '37 м',
  },
  {
    image: '/pumps/services-item3-bg.webp',
    size: '9×12 м',
    height: '42 м',
    distance: '42 м',
  },
  {
    image: '/pumps/services-item4-bg.webp',
    size: '14×12 м',
    height: '54 м',
    distance: '54 м',
  },
]
</script>

<template>
  <section id="pumps" class="py-20 bg-white">
    <div class="mx-auto px-4 container">
      <h2 class="text-3xl font-bold mb-4 text-center">
        Услуги автобетононасосов
      </h2>
      <p class="text-gray-600 mb-12 text-center">
        Компания предоставляет услуги автобетононасосов с длиной подачи от 32 и 54 метров.<br>
        Стоимость составляет от <strong>40 000 ₸</strong> за три часа работы.
      </p>

      <div class="gap-6 grid md:grid-cols-2">
        <div
          v-for="(pump, i) in pumps"
          :key="i"
          class="group rounded-xl shadow relative overflow-hidden"
        >
          <img
            :src="pump.image"
            alt="Автобетононасос"
            class="h-72 w-full transition-transform duration-300 object-cover group-hover:scale-105"
          >
          <div class="text-white p-6 bg-black bg-opacity-40 flex flex-col inset-0 justify-end absolute">
            <h3 class="text-lg font-semibold mb-2">
              СПЕЦИФИКАЦИЯ АВТОНАСОСА
            </h3>
            <p>Размер площадки: <strong>{{ pump.size }}</strong></p>
            <p>Высота подачи: <strong>{{ pump.height }}</strong></p>
            <p>Дальность подачи: <strong>{{ pump.distance }}</strong></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
