// Прайсы и каталог. Цены — в тенге. Правьте здесь, страницы подтянут сами.

export interface KeramzitType {
  id: 'slate' | 'clay'
  name: string
  short: string
  fractions: string[]
  /** Россыпью, ₸ за м³ */
  bulk: number
  /** Мешок 50 л, ₸ */
  bag: number
  /** Биг-бэг, ₸ за м³ */
  bigBagPerM3: number
  description: string
}

export const BAG_VOLUME_M3 = 0.05
export const BIG_BAG_VOLUME_M3 = 1.2

export const keramzitTypes: KeramzitType[] = [
  {
    id: 'slate',
    name: 'Сланцевый керамзит',
    short: 'Сланцевый',
    fractions: ['5–20 мм', '20–40 мм'],
    bulk: 28_000,
    bag: 2_000,
    bigBagPerM3: 33_000,
    description: 'Выгодный вариант для утепления и засыпки больших объёмов.',
  },
  {
    id: 'clay',
    name: 'Глиняный керамзит',
    short: 'Глиняный',
    fractions: ['10–20 мм'],
    bulk: 35_000,
    bag: 2_500,
    bigBagPerM3: 40_000,
    description: 'Классический керамзит из обожжённой глины — лёгкий и прочный.',
  },
]

export function bigBagPrice(type: KeramzitType) {
  return Math.round(type.bigBagPerM3 * BIG_BAG_VOLUME_M3)
}

export function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₸`
}

// Страницы продукции — для меню и перекрёстных ссылок
export interface ProductPage {
  to: string
  name: string
  text: string
  /** Иконка iconify (mdi) */
  icon: string
}

export const productPages: ProductPage[] = [
  { to: '/', name: 'Бетон', text: 'Марки М100–М450 с доставкой миксером и подачей насосом', icon: 'icon-[mdi--truck-delivery]' },
  { to: '/keramzitobeton', name: 'Керамзитобетон', text: 'Лёгкий тёплый бетон для стяжек, перекрытий и стен', icon: 'icon-[mdi--layers-triple]' },
  { to: '/keramzit', name: 'Керамзит', text: 'Сланцевый и глиняный: россыпью, в мешках и биг-бэгах', icon: 'icon-[mdi--circle-multiple]' },
  { to: '/pesok-scheben', name: 'Песок и щебень', text: 'Нерудные материалы для фундаментов, бетона и благоустройства', icon: 'icon-[mdi--terrain]' },
]

// Песок и щебень. Фракции и цены пока не заданы — карточки показывают «цена по запросу».
// Чтобы показать цену, заполните price (₸ за м³) и при необходимости fractions.
export interface BulkMaterial {
  id: string
  name: string
  text: string
  fractions?: string[]
  price?: number
  icon: string
}

export const bulkMaterials: BulkMaterial[] = [
  {
    id: 'sand',
    name: 'Песок',
    text: 'Для бетона и растворов, подсыпки под фундамент и стяжку, благоустройства участка.',
    icon: 'icon-[mdi--grain]',
  },
  {
    id: 'gravel',
    name: 'Щебень',
    text: 'Для бетона, фундаментов, дорожек, дренажа и подсыпки площадок.',
    icon: 'icon-[mdi--dots-hexagon]',
  },
]
