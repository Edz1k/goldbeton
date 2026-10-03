import { useHead } from '@unhead/vue'

export const SITE_URL = 'https://gold-beton.kz'

// Структурированные данные schema.org одним <script type="application/ld+json">.
// key нужен, чтобы при навигации блок заменялся, а не дублировался.
export function useJsonLd(key: string, data: Record<string, unknown> | (() => Record<string, unknown>)) {
  useHead(() => ({
    script: [{
      key: `ld-${key}`,
      type: 'application/ld+json',
      innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...(typeof data === 'function' ? data() : data) }),
    }],
  }))
}

export const ORG_ID = `${SITE_URL}/#organization`

export function breadcrumbLd(items: { name: string, path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': item.name,
      'item': `${SITE_URL}${item.path}`,
    })),
  }
}

export function faqLd(faq: { question: string, answer: string }[]) {
  return {
    '@type': 'FAQPage',
    'mainEntity': faq.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
    })),
  }
}
