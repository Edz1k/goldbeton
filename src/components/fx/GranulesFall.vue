<script setup lang="ts">
// Сыплющиеся гранулы (керамзит / щебень / песок): падают струёй, огибают курсор
// и насыпаются горкой. Осевшие гранулы рисуются один раз в отдельный слой — дёшево.

export interface GranuleKind {
  colors: string[]
  rMin: number
  rMax: number
  shape: 'round' | 'angular'
  weight: number
}

const props = withDefaults(defineProps<{
  kinds: GranuleKind[]
  /** Центр струи по X (0..1) на десктопе / мобилке */
  streamX?: number
  streamXMobile?: number
  /** Ширина струи в долях ширины */
  spread?: number
  /** Гранул в секунду */
  rate?: number
  /** Насыпать горку; иначе гранулы «тонут» на уровне floor */
  pile?: boolean
  /** Уровень, где исчезают гранулы без горки (0..1 от низа) */
  floor?: number
  /** Максимальная высота горки (0..1 от высоты) */
  maxPile?: number
  /** Задержка перед стартом, сек */
  delay?: number
}>(), {
  streamX: 0.74,
  streamXMobile: 0.82,
  spread: 0.06,
  rate: 90,
  pile: true,
  floor: 0.18,
  maxPile: 0.28,
  delay: 0,
})

interface Granule {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  sprite: HTMLCanvasElement
}

const host = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let cleanup: (() => void) | undefined

function makeSprite(color: string, r: number, shape: GranuleKind['shape'], dpr: number) {
  const size = Math.ceil((r * 2 + 2) * dpr)
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  ctx.scale(dpr, dpr)
  const cx = r + 1
  const cy = r + 1

  ctx.beginPath()
  if (shape === 'round') {
    // Слегка неровный овал — как настоящая гранула
    const steps = 14
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2
      const rr = r * (0.9 + Math.random() * 0.1)
      ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.92)
    }
  }
  else {
    const steps = 5 + Math.floor(Math.random() * 3)
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2 + Math.random() * 0.5
      const rr = r * (0.65 + Math.random() * 0.35)
      ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr)
    }
  }
  ctx.closePath()

  const g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r * 1.1)
  g.addColorStop(0, 'rgba(255,255,255,0.35)')
  g.addColorStop(0.35, color)
  g.addColorStop(1, 'rgba(0,0,0,0.55)')
  ctx.fillStyle = color
  ctx.fill()
  ctx.fillStyle = g
  ctx.fill()

  // Поры на поверхности
  if (shape === 'round' && r > 3) {
    ctx.fillStyle = 'rgba(0,0,0,0.25)'
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(cx + (Math.random() - 0.5) * r, cy + (Math.random() - 0.3) * r, Math.max(0.5, r * 0.09), 0, Math.PI * 2)
      ctx.fill()
    }
  }
  return c
}

onMounted(() => {
  const el = canvas.value
  const box = host.value
  if (!el || !box)
    return
  const ctx = el.getContext('2d')
  if (!ctx)
    return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

  // Заранее нарезаем спрайты: по несколько вариантов на каждый тип
  const totalWeight = props.kinds.reduce((s, k) => s + k.weight, 0)
  const sprites = props.kinds.map(kind => Array.from({ length: 10 }, () => {
    const r = kind.rMin + Math.random() * (kind.rMax - kind.rMin)
    const color = kind.colors[Math.floor(Math.random() * kind.colors.length)]
    return { r, sprite: makeSprite(color, r, kind.shape, dpr) }
  }))

  function pickSprite() {
    let w = Math.random() * totalWeight
    for (let i = 0; i < props.kinds.length; i++) {
      w -= props.kinds[i].weight
      if (w <= 0)
        return sprites[i][Math.floor(Math.random() * sprites[i].length)]
    }
    return sprites[0][0]
  }

  let width = 0
  let height = 0
  let streamX = props.streamX
  const COL = 5
  let heights: Float32Array = new Float32Array(0)
  const pileLayer = document.createElement('canvas')
  const pileCtx = pileLayer.getContext('2d')!
  let falling: Granule[] = []

  function resize() {
    const rect = box!.getBoundingClientRect()
    width = rect.width
    height = rect.height
    el!.width = Math.floor(width * dpr)
    el!.height = Math.floor(height * dpr)
    pileLayer.width = el!.width
    pileLayer.height = el!.height
    pileCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
    streamX = width < 768 ? props.streamXMobile : props.streamX
    heights = new Float32Array(Math.ceil(width / COL) + 1)
    falling = []
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(box)

  const mouse = { x: -9999, y: -9999 }
  const surface = box.closest('section') ?? box.parentElement ?? box
  function onMove(e: PointerEvent) {
    const rect = box!.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  }
  function onLeave() {
    mouse.x = mouse.y = -9999
  }
  surface.addEventListener('pointermove', onMove)
  surface.addEventListener('pointerleave', onLeave)

  function spawn() {
    const { r, sprite } = pickSprite()
    const spreadPx = props.spread * width
    falling.push({
      x: streamX * width + (Math.random() - 0.5) * spreadPx,
      y: -r * 2 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 30,
      vy: 120 + Math.random() * 120,
      r,
      sprite,
    })
  }

  // Кладём гранулу в горку: скатываем к более низкому соседу
  function settle(g: Granule) {
    let col = Math.max(0, Math.min(heights.length - 1, Math.round(g.x / COL)))
    for (let step = 0; step < 120; step++) {
      const h = heights[col]
      const left = col > 0 ? heights[col - 1] : Infinity
      const right = col < heights.length - 1 ? heights[col + 1] : Infinity
      // Угол откоса: чем меньше порог, тем положе горка
      const threshold = g.r * 0.38
      const canLeft = h - left > threshold
      const canRight = h - right > threshold
      if (canLeft && canRight)
        col += Math.random() < 0.5 ? -1 : 1
      else if (canLeft)
        col -= 1
      else if (canRight)
        col += 1
      else
        break
    }
    const x = col * COL + (Math.random() - 0.5) * COL
    const y = height - heights[col] - g.r * 0.8
    pileCtx.drawImage(g.sprite, x - g.r - 1, y - g.r - 1, g.sprite.width / dpr, g.sprite.height / dpr)
    // Добавляем «объём» гранулы колоколом вокруг точки падения
    const span = Math.max(1, Math.round(g.r / COL))
    for (let c = col - span; c <= col + span; c++) {
      if (c >= 0 && c < heights.length)
        heights[c] += g.r * 0.45 * (1 - Math.abs(c - col) / (span + 1))
    }
  }

  let raf = 0
  let last = performance.now()
  let acc = 0
  let visible = true

  let elapsed = 0

  function step(dt: number) {
    elapsed += dt
    if (elapsed > props.delay)
      acc += dt * props.rate
    while (acc > 1) {
      spawn()
      acc -= 1
    }

    const floorY = height * (1 - props.floor)
    const maxPileH = height * props.maxPile
    const next: Granule[] = []
    for (const g of falling) {
      g.vy += 900 * dt
      // Отталкивание от курсора
      const dx = g.x - mouse.x
      const dy = g.y - mouse.y
      const d2 = dx * dx + dy * dy
      if (d2 < 90 * 90) {
        const d = Math.sqrt(d2) || 1
        const f = (1 - d / 90) * 2400 * dt
        g.vx += (dx / d) * f
        g.vy += (dy / d) * f * 0.3
      }
      g.vx *= 0.995
      g.x += g.vx * dt
      g.y += g.vy * dt

      if (g.x < -20 || g.x > width + 20)
        continue

      if (props.pile) {
        const col = Math.max(0, Math.min(heights.length - 1, Math.round(g.x / COL)))
        if (g.y + g.r >= height - heights[col]) {
          if (heights[col] < maxPileH)
            settle(g)
          continue
        }
      }
      else if (g.y > floorY + Math.random() * 12) {
        continue
      }
      next.push(g)
    }
    falling = next
  }

  function draw() {
    ctx!.setTransform(1, 0, 0, 1, 0, 0)
    ctx!.clearRect(0, 0, el!.width, el!.height)
    ctx!.drawImage(pileLayer, 0, 0)
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    for (const g of falling)
      ctx!.drawImage(g.sprite, g.x - g.r - 1, g.y - g.r - 1, g.sprite.width / dpr, g.sprite.height / dpr)
  }

  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    step(dt)
    draw()
    raf = visible ? requestAnimationFrame(frame) : 0
  }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible && !raf && !reduceMotion) {
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
  })
  io.observe(box)

  if (reduceMotion) {
    // Статичный кадр: сразу насыпаем горку
    for (let i = 0; i < 260; i++) step(1 / 30)
    draw()
  }
  else {
    raf = requestAnimationFrame(frame)
  }

  cleanup = () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    surface.removeEventListener('pointermove', onMove)
    surface.removeEventListener('pointerleave', onLeave)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div ref="host" class="absolute inset-0">
    <canvas ref="canvas" aria-hidden="true" class="block size-full" />
  </div>
</template>
