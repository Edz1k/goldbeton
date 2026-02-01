<script setup lang="ts">
const name = defineModel<string>()
</script>

<template>
  <div class="w-full relative">
    <!-- Иконка -->
    <div
      class="peer-focus:text-accent i-mdi:account text-xl text-gray-400 transition-colors duration-300 left-4 top-1/2 absolute -translate-y-1/2"
    />

    <!-- Инпут -->
    <input
      v-model="name"
      type="text"
      placeholder="Ваше имя"
      class="peer text-textColor border-concrete hover:border-main focus:ring-main text-lg py-3 pl-12 pr-4 border rounded-lg w-full transition-all duration-300 focus:outline-none focus:ring-2 hover:shadow-md"
    >
  </div>
</template>
