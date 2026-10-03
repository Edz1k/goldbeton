<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { useRequestModal } from '~/composables/useRequestModal'

const { subject, variant = 'primary', size = 'md', class: className } = defineProps<{
  subject?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  class?: string
}>()

const { open } = useRequestModal()
</script>

<template>
  <button
    type="button"
    :class="cn(
      'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400',
      variant === 'primary' && 'bg-gold-400 text-concrete-950 shadow-[0_8px_30px_-8px] shadow-gold-400/60 hover:bg-gold-300 hover:shadow-gold-300/70',
      variant === 'outline' && 'border border-white/20 bg-white/5 text-white backdrop-blur hover:border-gold-400/60 hover:bg-white/10',
      variant === 'ghost' && 'text-gold-300 hover:text-gold-200',
      size === 'sm' && 'h-10 px-4 text-sm',
      size === 'md' && 'h-12 px-6 text-sm',
      size === 'lg' && 'h-14 px-8 text-base',
      className,
    )"
    @click="open(subject)"
  >
    <span
      v-if="variant === 'primary'"
      aria-hidden="true"
      class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full"
    />
    <span class="relative"><slot>Оставить заявку</slot></span>
    <ArrowRight class="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
  </button>
</template>
