import { useHead } from '@unhead/vue'
import { SITE_URL } from './useJsonLd'

const DEFAULT_IMAGE = `${SITE_URL}/og.jpg`

// Title, description, canonical, Open Graph и Twitter для каждой страницы
export function usePageSeo(opts: {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}) {
  const url = `${SITE_URL}${opts.path}`
  const image = opts.image ? `${SITE_URL}${opts.image}` : DEFAULT_IMAGE
  useHead({
    title: opts.title,
    meta: [
      { name: 'description', content: opts.description },
      { property: 'og:type', content: opts.type ?? 'website' },
      { property: 'og:title', content: opts.title },
      { property: 'og:description', content: opts.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:locale', content: 'ru_RU' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: opts.title },
      { name: 'twitter:description', content: opts.description },
      { name: 'twitter:image', content: image },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
