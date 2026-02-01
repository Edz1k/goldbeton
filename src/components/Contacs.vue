<script setup lang="ts">
</script>

<template>
  <section id="contacts" class="pt-20 bg-gray-50">
    <div class="mx-auto px-4 container">
      <h2 class="text-3xl font-bold mb-12 text-center">
        Контакты
      </h2>

      <!-- Контактная информация и карта -->
      <div class="mb-20 gap-10 grid items-center md:grid-cols-2">
        <!-- Левая колонка -->
        <div class="space-y-6">
          <div>
            <p class="text-lg font-semibold">
              📞 Телефон:
            </p>
            <div class="flex flex-col space-y-1">
              <a href="tel:+77072000985" class="text-xl text-red-600 font-medium hover:underline">
                +7 (707) 200-09-85
              </a>
            </div>
          </div>
          <div>
            <p class="text-lg font-semibold">
              💬 WhatsApp:
            </p>
            <a
              href="https://wa.me/77072000985"
              target="_blank"
              class="text-xl text-green-600 font-medium hover:underline"
            >
              Написать в WhatsApp
            </a>
          </div>
          <div>
            <p class="text-lg font-semibold">
              📍 Адрес:
            </p>
            <p class="text-gray-700">
              Улица Казыбаева 262, Алматы, Казахстан
            </p>
          </div>
        </div>

        <!-- Карта -->
        <iframe
          class="rounded-lg h-96 w-full shadow-md"
          src="https://yandex.kz/map-widget/v1/?from=mapframe&ll=76.916279%2C43.300471&mode=whatshere&tab=inside&whatshere%5Bpoint%5D=76.916279%2C43.300470&whatshere%5Bzoom%5D=17&z=16" width="560" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"
        />
      </div>

      <!-- ФУТЕР -->
      <footer class="py-6 border-t border-gray-200 bg-white">
        <div class="text-sm text-gray-600 mx-auto px-4 flex flex-col gap-4 items-center justify-between container sm:flex-row">
          <div class="text-center sm:text-left">
            © {{ new Date().getFullYear() }} «BM Beton». Все права защищены.
          </div>
          <div class="text-center space-x-4 sm:text-right">
            <a href="#about" class="hover:text-red-600">О нас</a>
            <a href="#assoritment" class="hover:text-red-600">Ассортимент</a>
            <a href="#contacts" class="hover:text-red-600">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  </section>
</template>
