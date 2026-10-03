// Типы SEO-контента посадочных страниц и статей

export interface Faq {
  question: string
  answer: string
}

export interface ConcreteGradeSeo {
  /** URL: /beton/<slug>, например 'm200' */
  slug: string
  /** Марка с кириллической «М»: 'М200' */
  mark: string
  /** Класс прочности: 'B15' */
  cls: string
  /** Число класса для индикатора прочности: 15 */
  strength: number
  image: string
  /** Короткое применение для карточки на главной */
  use: string
  /** <title>, до ~65 символов */
  title: string
  /** meta description, 140–160 символов */
  description: string
  h1: string
  /** Подзаголовок под H1, 1–2 предложения */
  lead: string
  /** Абзацы «Описание и особенности», 2–3 шт. */
  intro: string[]
  /** «Где применяется», 4–6 пунктов */
  uses: string[]
  /** «Преимущества», 4–5 пунктов */
  advantages: string[]
  /** «Что учесть при заказе», 3–4 пункта */
  tips: string[]
  faq: Faq[]
}

export interface KeramzitFractionSeo {
  /** URL: /keramzit/<slug> */
  slug: string
  typeId: 'slate' | 'clay'
  fraction: string
  title: string
  description: string
  h1: string
  lead: string
  intro: string[]
  uses: string[]
  advantages: string[]
  faq: Faq[]
}
