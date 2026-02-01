<script setup lang="ts">
const certificates = [
  { src: '/certs/cert.webp', alt: 'Сертификат на бетон' },
  { src: '/certs/jh.webp', alt: 'Сертификат на добавки' },
  { src: '/certs/sheben.webp', alt: 'Сертификат на щебень' },
]
</script>

<template>
  <section id="about" class="py-20 bg-white">
    <div class="mx-auto px-4 container">
      <!-- Заголовок -->
      <h2 class="text-3xl font-bold mb-12 text-center">
        О компании и наши преимущества
      </h2>

      <!-- Преимущества -->
      <div class="mb-20 gap-6 grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2">
        <div class="p-6 text-center border-t-4 border-yellow-600 rounded-xl bg-white shadow-md">
          <div class="text-4xl mb-3">
            🚛
          </div>
          <h3 class="text-lg font-semibold mb-1">
            Собственный автопарк
          </h3>
          <p class="text-sm text-gray-600">
            Гарантируем своевременную доставку без посредников.
          </p>
        </div>
        <div class="p-6 text-center rounded-xl bg-gray-50 shadow-md">
          <div class="text-4xl mb-3">
            ⏱️
          </div>
          <h3 class="text-lg font-semibold mb-1">
            Доставка в день заказа
          </h3>
          <p class="text-sm text-gray-600">
            Оперативно поставим бетон прямо на ваш объект.
          </p>
        </div>
        <div class="bg-gradient-to-tr p-6 text-center rounded-xl shadow-md from-red-50 to-white">
          <div class="text-4xl mb-3">
            💰
          </div>
          <h3 class="text-lg font-semibold mb-1">
            Работаем с юр. и физ. лицами
          </h3>
          <p class="text-sm text-gray-600">
            Любая форма оплаты — наличный и безналичный расчёт.
          </p>
        </div>
        <div class="p-6 text-center border border-gray-200 rounded-xl bg-white shadow-md">
          <div class="text-4xl mb-3">
            🕐
          </div>
          <h3 class="text-lg font-semibold mb-1">
            Круглосуточная работа
          </h3>
          <p class="text-sm text-gray-600">
            Принимаем и выполняем заказы 24/7, без выходных.
          </p>
        </div>
      </div>

      <!-- Дополнительные факты о компании -->
      <div class="mb-20 gap-6 grid grid-cols-1 md:grid-cols-3">
        <div class="p-6 text-center rounded-xl bg-gray-50 shadow">
          <div class="text-4xl mb-2">
            🏗️
          </div>
          <h3 class="text-lg font-semibold mb-1">
            Опыт в строительстве
          </h3>
          <p class="text-sm text-gray-600">
            Более 10 лет и десятки реализованных проектов.
          </p>
        </div>
        <div class="p-6 text-center border-t-4 border-yellow-600 rounded-xl bg-white shadow">
          <div class="text-4xl mb-2">
            🤝
          </div>
          <h3 class="text-lg font-semibold mb-1">
            Надёжные партнёры
          </h3>
          <p class="text-sm text-gray-600">
            Работаем напрямую с бетонными и щебёночными заводами.
          </p>
        </div>
        <div class="bg-gradient-to-bl p-6 text-center rounded-xl shadow from-white to-red-50">
          <div class="text-4xl mb-2">
            📄
          </div>
          <h3 class="text-lg font-semibold mb-1">
            Сертификаты качества
          </h3>
          <p class="text-sm text-gray-600">
            Продукция сертифицирована по ГОСТ и ТР РК.
          </p>
        </div>
      </div>

      <!-- Сертификаты -->
      <div class="text-3xl font-semibold mb-6 text-center">
        Наши сертификаты:
      </div>

      <div class="flex flex-wrap gap-6 justify-evenly">
        <a
          v-for="(cert, i) in certificates"
          :key="i"
          :href="cert.src"
          target="_blank"
          rel="noopener"
          class="rounded-xl block shadow-lg transition-transform duration-300 overflow-hidden hover:scale-105"
        >
          <img
            :src="cert.src"
            :alt="cert.alt"
            class="border border-gray-200 h-[450px] w-full object-cover"
          >
        </a>
      </div>
    </div>
  </section>
</template>
