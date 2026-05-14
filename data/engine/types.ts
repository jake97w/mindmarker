export type Step = 'input' | 'branches' | 'problems' | 'spikes' | 'blueprint'

export interface Branch {
  id: string
  label: string
  description: string
  colorIndex: number // 0–5
}

export interface Problem {
  id: string
  branchId: string
  label: string
  description: string
  whyItMatters: string
}

export interface SpikeScores {
  differentiation: number // 0–100
  differentiationReason: string
  uniqueness: number
  uniquenessReason: string
  feasibility: number
  feasibilityReason: string
}

export interface Spike {
  id: string
  problemId: string
  label: string
  description: string
  scores: SpikeScores
  spikeIdentity: string
  themeExplanation: string
  researchDirections: string[]
  projectIdeas: string[]
}

export interface InterestContent {
  id: string
  label: string
  branches: Branch[]
  problems: Record<string, Problem[]>  // keyed by branchId
  spikes: Record<string, Spike[]>       // keyed by problemId
}

export interface Selection {
  interest: string
  branchId: string | null
  problemId: string | null
  spikeId: string | null
}
