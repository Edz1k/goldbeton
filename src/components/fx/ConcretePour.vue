<script setup lang="ts">
// Порт идеи «WebGL Liquid» (21st.dev / componentry) под Vue:
// струя бетона падает сверху и набирает растекающуюся «лужу» внизу.
const props = withDefaults(defineProps<{
  /** Позиция струи по X (0..1) на десктопе / на мобилке */
  streamX?: number
  streamXMobile?: number
  /** Длительность «налива» в секундах */
  pourDuration?: number
}>(), {
  streamX: 0.72,
  streamXMobile: 0.84,
  pourDuration: 2.6,
})

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform float u_pour;
uniform float u_streamX;
uniform vec3 u_mouse; // xy — uv курсора, z — сила (0..1)

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.86, 0.51, -0.51, 0.86);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

float aspect() { return u_res.x / max(u_res.y, 1.0); }

float poolLevel(vec2 uv, float dx, float t) {
  float fill = smoothstep(0.45, 1.0, u_pour);
  float h = 0.2
    + 0.018 * sin(uv.x * 7.0 + t * 0.7)
    + 0.05 * (fbm(vec2(uv.x * 2.6 - t * 0.05, t * 0.12)) - 0.5);
  h += 0.11 * exp(-dx * dx * 5.0);
  return mix(-0.05, h, fill);
}

float wobble(float y, float t) {
  return (fbm(vec2(y * 2.2 - t * 0.9, t * 0.25)) - 0.5) * 0.07;
}

// Поле высот поверхности — из него считаем нормали для объёмного света
float heightField(vec2 uv, float t, float inStream) {
  float a = aspect();
  float dx = (uv.x - u_streamX) * a;
  float hs = fbm(vec2(dx * 9.0, uv.y * 5.0 + t * 2.4));
  // Растекание от струи в обе стороны: abs(dx) даёт непрерывное поле без шва
  float hp = fbm(vec2(abs(dx) * 3.5 - t * 0.25, uv.y * 7.0 + t * 0.1));

  vec2 m = (uv - u_mouse.xy) * vec2(a, 1.0);
  float md = length(m);
  float ripple = 0.35 * u_mouse.z * sin(md * 55.0 - t * 7.0) * exp(-md * 7.0);

  return mix(hp + ripple, hs, inStream);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time;
  float a = aspect();
  float dx = (uv.x - u_streamX) * a;

  // --- Струя ---
  float wob = wobble(uv.y, t);
  float w = mix(0.05, 0.075, 1.0 - uv.y);
  float sd = abs(dx - wob) - w;
  float front = mix(1.08, -0.1, clamp(u_pour * 1.25, 0.0, 1.0));
  float streamMask = (1.0 - smoothstep(-0.004, 0.01, sd)) * smoothstep(front - 0.03, front + 0.03, uv.y);

  // --- Лужа ---
  float level = poolLevel(uv, dx, t);
  float poolMask = 1.0 - smoothstep(level - 0.006, level + 0.006, uv.y);

  // --- Брызги у места удара ---
  float impact = smoothstep(0.55, 0.9, u_pour);
  float splashN = noise(vec2(dx * 26.0, uv.y * 22.0 - t * 3.5));
  float splashZone = exp(-dx * dx * 18.0) * smoothstep(level + 0.16, level, uv.y) * step(level, uv.y);
  float splash = smoothstep(0.78, 0.9, splashN) * splashZone * impact;

  float inStream = streamMask * (1.0 - poolMask);
  float alpha = clamp(max(max(streamMask, poolMask), splash), 0.0, 1.0);
  if (alpha < 0.002) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Нормаль из поля высот
  float e = 0.0025;
  float h0 = heightField(uv, t, inStream);
  float hx = heightField(uv + vec2(e, 0.0), t, inStream);
  float hy = heightField(uv + vec2(0.0, e), t, inStream);
  vec3 n = normalize(vec3((h0 - hx) * 2.2, (h0 - hy) * 2.2, 0.06));

  // Струя — цилиндр: добавляем наклон нормали поперёк
  float across = clamp((dx - wob) / w, -1.0, 1.0);
  n = normalize(mix(n, normalize(vec3(across * 1.4, 0.0, 1.0) + n * 0.6), inStream));

  vec3 l = normalize(vec3(-0.45, 0.65, 0.65));
  float diff = clamp(dot(n, l), 0.0, 1.0);
  vec3 r = reflect(-l, n);
  float spec = pow(clamp(r.z, 0.0, 1.0), 28.0);

  vec3 dark = vec3(0.24, 0.235, 0.225);
  vec3 light = vec3(0.66, 0.645, 0.615);
  vec3 col = mix(dark, light, smoothstep(0.25, 0.85, h0));
  col *= 0.45 + 0.75 * diff;
  col += spec * vec3(1.0, 0.86, 0.6) * 0.75;

  // Золотой контур у кромки струи и по поверхности лужи
  float rim = exp(-abs(sd) * 140.0) * inStream;
  float surface = exp(-abs(uv.y - level) * 160.0) * poolMask;
  col += vec3(0.85, 0.65, 0.3) * (rim * 0.35 + surface * 0.45);

  // Глубина: лужа темнеет книзу
  col *= mix(1.0, smoothstep(-0.2, level, uv.y) * 0.6 + 0.4, poolMask * (1.0 - inStream));

  // Зерно
  col += (hash(gl_FragCoord.xy + t) - 0.5) * 0.035;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0) * alpha, alpha);
}
`

const host = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const failed = ref(false)

let cleanup: (() => void) | undefined

onMounted(() => {
  const el = canvas.value
  const box = host.value
  if (!el || !box)
    return

  const gl = el.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true })
  if (!gl) {
    failed.value = true
    return
  }

  function compile(type: number, source: string) {
    const shader = gl!.createShader(type)
    if (!shader)
      return null
    gl!.shaderSource(shader, source)
    gl!.compileShader(shader)
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      console.warn(gl!.getShaderInfoLog(shader))
      gl!.deleteShader(shader)
      return null
    }
    return shader
  }

  const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER)
  const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  const program = gl.createProgram()
  if (!vs || !fs || !program) {
    failed.value = true
    return
  }
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    failed.value = true
    return
  }
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(program, 'u_res')
  const uTime = gl.getUniformLocation(program, 'u_time')
  const uPour = gl.getUniformLocation(program, 'u_pour')
  const uStreamX = gl.getUniformLocation(program, 'u_streamX')
  const uMouse = gl.getUniformLocation(program, 'u_mouse')

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let streamX = props.streamX

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const { width, height } = box!.getBoundingClientRect()
    el!.width = Math.max(1, Math.floor(width * dpr))
    el!.height = Math.max(1, Math.floor(height * dpr))
    streamX = width < 768 ? props.streamXMobile : props.streamX
    gl!.viewport(0, 0, el!.width, el!.height)
    gl!.uniform2f(uRes, el!.width, el!.height)
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(box)

  // Рябь от курсора: плавно затухает, когда мышь не двигается
  const mouse = { x: 0.5, y: 0.1, z: 0, target: 0 }
  function onMove(e: PointerEvent) {
    const rect = box!.getBoundingClientRect()
    mouse.x = (e.clientX - rect.left) / rect.width
    mouse.y = 1 - (e.clientY - rect.top) / rect.height
    mouse.target = 1
  }
  function onLeave() {
    mouse.target = 0
  }
  // Слушаем родителя: контент hero лежит поверх канваса и перехватывает события
  const surface = box.closest('section') ?? box.parentElement ?? box
  surface.addEventListener('pointermove', onMove)
  surface.addEventListener('pointerleave', onLeave)

  let visible = true
  let raf = 0
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible && !raf && !reduceMotion)
      raf = requestAnimationFrame(frame)
  })
  io.observe(box)

  const start = performance.now()

  function draw(time: number) {
    const elapsed = (time - start) / 1000
    const pour = Math.min(1, elapsed / props.pourDuration)
    mouse.z += (mouse.target - mouse.z) * 0.04
    mouse.target *= 0.985
    gl!.clearColor(0, 0, 0, 0)
    gl!.clear(gl!.COLOR_BUFFER_BIT)
    gl!.uniform1f(uTime, elapsed)
    gl!.uniform1f(uPour, 1 - (1 - pour) ** 3)
    gl!.uniform1f(uStreamX, streamX)
    gl!.uniform3f(uMouse, mouse.x, mouse.y, mouse.z)
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
  }

  function frame(time: number) {
    draw(time)
    raf = visible ? requestAnimationFrame(frame) : 0
  }

  if (reduceMotion)
    draw(start + props.pourDuration * 1000 + 4000)
  else
    raf = requestAnimationFrame(frame)

  cleanup = () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    surface.removeEventListener('pointermove', onMove)
    surface.removeEventListener('pointerleave', onLeave)
    gl!.deleteBuffer(buffer)
    gl!.deleteProgram(program)
    gl!.deleteShader(vs)
    gl!.deleteShader(fs)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div ref="host" class="absolute inset-0">
    <canvas
      v-if="!failed"
      ref="canvas"
      aria-hidden="true"
      class="size-full block"
    />
    <div
      v-else
      aria-hidden="true"
      class="size-full bg-[radial-gradient(ellipse_at_75%_100%,oklch(0.5_0.008_85/.6),transparent_60%)]"
    />
  </div>
</template>
