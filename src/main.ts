import { SchemaOrgUnheadPlugin } from '@unhead/schema-org'
import { createHead } from '@unhead/vue/client'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import { concreteGrades } from '~/data/seo/concrete-grades'
import { keramzitFractions } from '~/data/seo/keramzit-fractions'
import App from './App.vue'

import './styles/main.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    // Якоря (#calc, #contacts) работают и при переходе с другой страницы
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition)
        return savedPosition
      // Ждём, пока новая страница отрисуется, иначе цель ещё не на месте
      if (to.hash) {
        return new Promise(resolve => setTimeout(
          () => resolve({ el: to.hash, top: 96, behavior: 'smooth' }),
          to.path === from.path ? 0 : 350,
        ))
      }
      return { top: 0 }
    },
  },
  (ctx) => {
    const head = createHead()

    head.use(
      SchemaOrgUnheadPlugin(
        {
          host: 'https://gold-beton.kz',
          canonicalHost: 'https://gold-beton.kz',
        },
        () => ({
          // Можно задать мета-данные по умолчанию
          title: 'Gold Beton — бетон с доставкой в Алматы',
          description: 'Продажа и доставка бетона по Алматы',
        }),
      ),
    )

    ctx.app.use(head)
    ctx.head = head
  },
)

// Какие страницы пререндерить: динамические маршруты раскрываем по данным
export function includedRoutes(paths: string[]) {
  // '/beton' — только родитель для /beton/:grade, своей страницы у него нет
  const dynamic = new Set(['/beton', '/beton/:grade', '/keramzit/:slug'])
  return [
    ...paths.filter(path => !dynamic.has(path)),
    ...concreteGrades.map(g => `/beton/${g.slug}`),
    ...keramzitFractions.map(f => `/keramzit/${f.slug}`),
  ]
}
