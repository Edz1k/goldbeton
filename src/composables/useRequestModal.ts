// Одна модалка заявки на весь сайт: любая кнопка открывает её с нужной темой
const isOpen = ref(false)
const subject = ref<string | undefined>()

export function useRequestModal() {
  function open(topic?: string) {
    subject.value = topic
    isOpen.value = true
  }
  return { isOpen, subject, open }
}
