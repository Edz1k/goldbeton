<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <!-- Hero -->
  <section
    id="hero"
    class="bg-[url('/background.png')] flex min-h-screen items-center relative bg-cover bg-center scroll-mt-16"
  >
    <div class="bg-black/60 inset-0 absolute z-0" aria-hidden="true" />
    <div class="mx-auto px-4 relative z-10 container">
      <div class="text-white py-12 flex flex-col min-h-[70vh] items-start justify-center md:items-start">
        <div class="text-center w-full space-y-6">
          <h1 class="text-2xl leading-tight font-bold md:text-6xl sm:text-5xl">
            Купить бетон с доставкой в Алматы по самым выгодным ценам
          </h1>
          <p class="text-base sm:text-lg">
            «BM Beton» — это надёжный производитель и поставщик бетона и строительных растворов по всей территории Казахстана. Мы предлагаем продукцию высокого качества, соответствующую всем строительным стандартам и требованиям.
          </p><div class="mt-6">
            <RequestModal />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Калькулятор -->
  <section id="calc" class="scroll-mt-16">
    <CalcTabs />
  </section>

  <!-- Ассортимент -->
  <section id="assortiment" class="scroll-mt-16">
    <ProductGrid />
  </section>

  <!-- Автобетононасосы -->
  <section id="pumps" class="scroll-mt-16">
    <Pumps />
  </section>

  <!-- О компании -->
  <section id="about" class="scroll-mt-16">
    <AboutUs />
  </section>

  <!-- Контакты -->
  <section id="contacts" class="scroll-mt-16">
    <Contacs />
  </section>
</template>
