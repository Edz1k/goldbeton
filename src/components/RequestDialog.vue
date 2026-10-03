<script setup lang="ts">
import { CheckCircle2, Loader2, X } from '@lucide/vue'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { useRequestModal } from '~/composables/useRequestModal'
import { useTelegram } from '~/composables/useTelegramApi'

const { isOpen, subject } = useRequestModal()
const { sendMessage } = useTelegram()

const name = ref('')
const phone = ref('')
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const touched = ref(false)

const phoneValid = computed(() => phone.value.replace(/\D/g, '').length === 11)
const canSend = computed(() => name.value.trim().length > 0 && phoneValid.value)

watch(isOpen, (open) => {
  if (open) {
    status.value = 'idle'
    touched.value = false
  }
})

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function handleSend() {
  touched.value = true
  if (!canSend.value || status.value === 'sending')
    return

  status.value = 'sending'
  const lines = [
    '📝 Заявка',
    `👤 Имя: ${escapeHtml(name.value.trim())}`,
    `📞 Телефон: ${escapeHtml(phone.value)}`,
  ]
  if (subject.value)
    lines.push(`🧱 Тема: ${escapeHtml(subject.value)}`)

  const ok = await sendMessage(lines.join('\n'))
  status.value = ok ? 'sent' : 'error'
  if (ok) {
    name.value = ''
    phone.value = ''
  }
}
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      />
      <DialogContent
        class="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-concrete-900 p-0 shadow-2xl shadow-black/60 duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      >
        <!-- Золотая «струя» сверху -->
        <div class="h-1 w-full bg-gradient-to-r from-gold-700 via-gold-300 to-gold-700 bg-[length:200%_auto] animate-shine" />
        <div class="bg-grain pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

        <DialogClose
          class="absolute right-4 top-5 grid size-9 place-items-center rounded-full text-concrete-300 transition hover:bg-white/10 hover:text-white"
          aria-label="Закрыть"
        >
          <X class="size-5" />
        </DialogClose>

        <div class="relative p-7 sm:p-8">
          <template v-if="status !== 'sent'">
            <DialogTitle class="pr-10 font-display text-2xl font-semibold leading-tight">
              Оставьте заявку
            </DialogTitle>
            <DialogDescription class="mt-2 text-sm text-muted-foreground">
              Перезвоним, уточним объём и марку, рассчитаем стоимость с доставкой.
            </DialogDescription>

            <div
              v-if="subject"
              class="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-xs font-medium text-gold-200"
            >
              <span class="size-1.5 rounded-full bg-gold-400" />
              {{ subject }}
            </div>

            <form class="mt-6 space-y-3" @submit.prevent="handleSend">
              <UsernameInput v-model="name" :invalid="touched && !name.trim()" />
              <PhoneInput v-model="phone" :invalid="touched && !phoneValid" />

              <button
                type="submit"
                :disabled="status === 'sending'"
                class="group relative mt-3 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gold-400 font-semibold text-concrete-950 transition hover:bg-gold-300 disabled:opacity-70"
              >
                <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Loader2 v-if="status === 'sending'" class="size-5 animate-spin" />
                <span>{{ status === 'sending' ? 'Отправляем…' : 'Отправить заявку' }}</span>
              </button>

              <p v-if="status === 'error'" class="text-center text-sm text-red-400">
                Не удалось отправить. Позвоните нам:
                <a href="tel:+77073990549" class="underline">+7 (707) 399-05-49</a>
              </p>
              <p class="text-center text-xs text-concrete-400">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          </template>

          <div v-else class="flex flex-col items-center py-6 text-center animate-in fade-in-0 zoom-in-95 duration-500">
            <div class="relative grid size-20 place-items-center">
              <span class="absolute inset-0 rounded-full bg-gold-400/30 animate-pulse-ring" />
              <CheckCircle2 class="relative size-14 text-gold-400" />
            </div>
            <DialogTitle class="mt-6 font-display text-2xl font-semibold">
              Заявка принята
            </DialogTitle>
            <DialogDescription class="mt-2 text-muted-foreground">
              Скоро перезвоним и всё уточним.
            </DialogDescription>
            <DialogClose class="mt-8 rounded-xl border border-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/5">
              Хорошо
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
