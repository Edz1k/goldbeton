import type { GranuleKind } from '~/components/fx/GranulesFall.vue'

// Глиняный — терракота, сланцевый — серо-коричневый
export const keramzitGranules: GranuleKind[] = [
  { colors: ['#9a5b38', '#b06a40', '#874c2f', '#a4623b'], rMin: 4, rMax: 9, shape: 'round', weight: 3 },
  { colors: ['#6d655d', '#5c554f', '#7a7067', '#4f4944'], rMin: 3, rMax: 8, shape: 'round', weight: 2 },
]

export const keramzitInConcrete: GranuleKind[] = [
  { colors: ['#9a5b38', '#b06a40', '#874c2f'], rMin: 4, rMax: 8, shape: 'round', weight: 1 },
]

export const sandAndGravel: GranuleKind[] = [
  { colors: ['#8d8984', '#77736e', '#a29e98', '#615d59'], rMin: 4, rMax: 9, shape: 'angular', weight: 2 },
  { colors: ['#c9a873', '#b8955e', '#d6b98a'], rMin: 1.2, rMax: 2.4, shape: 'round', weight: 6 },
]
