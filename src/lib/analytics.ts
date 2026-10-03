// Google Ads / gtag: конверсии и просмотры страниц.
// Тег подключён в index.html (AW-17940042625).

export const ADS_ID = 'AW-17940042625'

// Ярлыки конверсий: Google Ads → Цели → Конверсии → действие → «Настройка тега»
// → в фрагменте события send_to: 'AW-17940042625/<ЯРЛЫК>'. Пустой ярлык — конверсия
// в Ads не отправляется, но событие всё равно уходит в gtag.
export const CONVERSION_LABELS = {
  lead: '_TdzCNGqkI8dEIGnvepC', // «Заявка с сайта»
  call: 'LeW3CNSqkI8dEIGnvepC', // «Звонок с сайта»
  whatsapp: 'hX_JCNeqkI8dEIGnvepC', // «WhatsApp с сайта»
}

type ConversionKind = keyof typeof CONVERSION_LABELS

const EVENT_NAMES: Record<ConversionKind, string> = {
  lead: 'generate_lead',
  call: 'click_to_call',
  whatsapp: 'click_whatsapp',
}

type Gtag = (...args: unknown[]) => void

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined')
    return
  const fn = (window as unknown as { gtag?: Gtag }).gtag
  fn?.(...args)
}

export function trackConversion(kind: ConversionKind, params: Record<string, unknown> = {}) {
  // beacon — событие дойдёт, даже если пользователь сразу ушёл в звонилку/WhatsApp
  gtag('event', EVENT_NAMES[kind], { ...params, transport_type: 'beacon' })
  const label = CONVERSION_LABELS[kind]
  if (label)
    gtag('event', 'conversion', { send_to: `${ADS_ID}/${label}`, transport_type: 'beacon' })
}

export function trackPageView(path: string) {
  gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

// Один слушатель на весь сайт: любые ссылки tel: и wa.me считаются конверсиями
export function installClickTracking() {
  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!link)
      return
    const href = link.getAttribute('href') ?? ''
    const place = link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : window.location.pathname
    if (href.startsWith('tel:'))
      trackConversion('call', { phone: href.slice(4), place })
    else if (href.includes('wa.me/'))
      trackConversion('whatsapp', { place })
  }, { capture: true })
}
