import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    pnpm: true,
    // Скрипты рендера промо-ролика — отдельный инструмент, не код сайта
    ignores: ['promo/**'],
  },
)
