<template>
  <section class="relative px-5 py-12 sm:px-8">
    <Reveal class="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-gold-400/20 bg-concrete-900">
      <!-- Подвижное золотое свечение -->
      <div class="pointer-events-none absolute -left-1/4 -top-1/2 size-[700px] rounded-full bg-gold-400/20 blur-[120px] animate-[spin_18s_linear_infinite] [transform-origin:60%_60%]" aria-hidden="true" />
      <div class="bg-grid-fade pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div class="bg-grain pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      <div class="relative grid items-center gap-10 p-6 sm:p-14 lg:grid-cols-[1.4fr_1fr] lg:p-20">
        <div>
          <h2 class="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
            Нужен бетон <span class="text-gold-gradient animate-shine">сегодня?</span>
          </h2>
          <p class="mt-5 max-w-lg text-lg text-concrete-200">
            Позвоните или оставьте заявку — рассчитаем объём и привезём бетон в день заказа.
          </p>
        </div>
        <div class="flex flex-col gap-3">
          <a
            href="tel:+77073990549"
            class="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 sm:px-6 sm:py-5 backdrop-blur transition hover:border-gold-400/50 hover:bg-white/10"
          >
            <span>
              <span class="block text-xs uppercase tracking-[0.2em] text-concrete-400">Позвонить</span>
              <span class="mt-1 block whitespace-nowrap font-display text-lg font-semibold text-white sm:text-2xl">+7 (707) 399-05-49</span>
            </span>
            <span class="icon-[mdi--phone] text-2xl text-gold-400 transition-transform group-hover:rotate-12" />
          </a>
          <a href="tel:+77774917897" class="-mt-1 text-center text-sm text-concrete-300 transition hover:text-gold-300">
            или второй номер: <span class="font-semibold text-white">+7 (777) 491-78-97</span>
          </a>
          <a
            href="https://wa.me/77073990549"
            target="_blank"
            rel="noopener"
            class="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 sm:px-6 sm:py-5 backdrop-blur transition hover:border-emerald-400/50 hover:bg-white/10"
          >
            <span>
              <span class="block text-xs uppercase tracking-[0.2em] text-concrete-400">WhatsApp</span>
              <span class="mt-1 block font-display text-xl font-semibold text-white sm:text-2xl">Написать</span>
            </span>
            <span class="icon-[mdi--whatsapp] text-2xl text-emerald-400 transition-transform group-hover:scale-110" />
          </a>
          <RequestButton size="lg" class="mt-1 w-full" subject="Заказ бетона (финальный блок)" />
        </div>
      </div>
    </Reveal>
  </section>
</template>
