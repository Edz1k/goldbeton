import { SchemaOrgUnheadPlugin } from '@unhead/schema-org'
import { createHead } from '@unhead/vue/client'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import './styles/main.css'
import 'uno.css'

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    const head = createHead()

    head.use(
      SchemaOrgUnheadPlugin(
        {
          host: 'https://mg-cement.kz.kz',
          canonicalHost: 'https://mg-cement.kz.kz',
        },
        () => ({
          // Можно задать мета-данные по умолчанию
          title: 'MG Цемент - Бетон в Алматы',
          description: 'Продажа и доставка бетона по Алматы',
        }),
      ),
    )

    ctx.app.use(head)
    ctx.head = head
  },
)
