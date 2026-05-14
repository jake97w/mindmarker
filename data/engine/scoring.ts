import type { Spike, SpikeScores } from './types'

export function composite(scores: SpikeScores): number {
  return Math.round(
    scores.differentiation * 0.35 +
    scores.uniqueness      * 0.40 +
    scores.feasibility     * 0.25
  )
}

export function tier(score: number): { label: string; color: string } {
  if (score >= 85) return { label: 'Exceptional',  color: '#1d1d1f' }
  if (score >= 75) return { label: 'Strong',        color: '#3a3a3c' }
  if (score >= 65) return { label: 'Good',          color: '#6e6e73' }
  return               { label: 'Developing',     color: '#aeaeb2' }
}

export function barFill(score: number): string {
  if (score >= 80) return '#1d1d1f'
  if (score >= 65) return '#6e6e73'
  return '#c7c7cc'
}

export function ranked(spikes: Spike[]): Spike[] {
  return [...spikes].sort((a, b) => composite(b.scores) - composite(a.scores))
}
