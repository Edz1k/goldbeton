<script setup lang="ts">
import Inputmask from 'inputmask'
import { onMounted, ref } from 'vue'

const phone = defineModel<string>()
const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (input.value) {
    Inputmask({
      mask: '+7 (999) 999-99-99',
      showMaskOnHover: false,
      showMaskOnFocus: true,
      placeholder: '_',
      clearIncomplete: true,
    }).mask(input.value)
  }
})
</script>

<template>
  <div class="w-full relative">
    <!-- Иконка -->
    <div
      class="i-mdi:phone peer-focus:text-accent text-xl text-gray-400 transition-colors duration-300 left-4 top-1/2 absolute -translate-y-1/2"
    />

    <!-- Инпут -->
    <input
      ref="input"
      v-model="phone"
      type="tel"
      placeholder="Номер телефона"
      class="peer text-textColor border-concrete focus:ring-main hover:border-main text-lg py-3 pl-12 pr-4 border rounded-lg w-full transition-all duration-300 focus:outline-none focus:ring-2 hover:shadow-md"
    >
  </div>
</template>
