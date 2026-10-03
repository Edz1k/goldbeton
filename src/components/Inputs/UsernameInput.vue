<script setup lang="ts">
const { invalid = false } = defineProps<{ invalid?: boolean }>()
const name = defineModel<string>()
</script>

<template>
  <div class="group relative w-full">
    <div
      class="icon-[mdi--account] absolute left-4 top-1/2 -translate-y-1/2 text-xl text-concrete-400 transition-colors duration-300 group-focus-within:text-gold-400"
    />
    <input
      v-model="name"
      type="text"
      autocomplete="name"
      placeholder="Ваше имя"
      :aria-invalid="invalid || undefined"
      class="h-14 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-base text-white placeholder:text-concrete-400 transition-all duration-300 hover:border-white/20 focus:border-gold-400/70 focus:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-gold-400/15 aria-invalid:border-red-400/70"
    >
  </div>
</template>
