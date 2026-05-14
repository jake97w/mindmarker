'use client'
import { useState } from 'react'
import type { Step, Selection } from '@/data/engine/types'
import { resolveInterest } from '@/data/engine/content'
import StepInput from './StepInput'
import StepBranches from './StepBranches'
import StepProblems from './StepProblems'
import StepSpikes from './StepSpikes'
import StepBlueprint from './StepBlueprint'

const INITIAL_SELECTION: Selection = {
  interest: '',
  branchId: null,
  problemId: null,
  spikeId: null,
}

export default function EngineShell() {
  const [step, setStep] = useState<Step>('input')
  const [selection, setSelection] = useState<Selection>(INITIAL_SELECTION)
  const [notFound, setNotFound] = useState(false)

  const content = selection.interest ? resolveInterest(selection.interest) : null

  function handleInterest(value: string) {
    const resolved = resolveInterest(value)
    if (!resolved) {
      setNotFound(true)
      return
    }
    setNotFound(false)
    setSelection({ ...INITIAL_SELECTION, interest: value })
    setStep('branches')
  }

  function handleBranch(branchId: string) {
    setSelection(s => ({ ...s, branchId, problemId: null, spikeId: null }))
    setStep('problems')
  }

  function handleProblem(problemId: string) {
    setSelection(s => ({ ...s, problemId, spikeId: null }))
    setStep('spikes')
  }

  function handleSpike(spikeId: string) {
    setSelection(s => ({ ...s, spikeId }))
    setStep('blueprint')
  }

  function handleRestart() {
    setSelection(INITIAL_SELECTION)
    setStep('input')
    setNotFound(false)
  }

  const branch = content && selection.branchId
    ? content.branches.find(b => b.id === selection.branchId) ?? null
    : null

  const problem = content && selection.problemId
    ? Object.values(content.problems).flat().find(p => p.id === selection.problemId) ?? null
    : null

  const spike = content && selection.spikeId
    ? Object.values(content.spikes).flat().find(s => s.id === selection.spikeId) ?? null
    : null

  return (
    <div style={{ minHeight: '100vh', background: '#07080f' }}>
      {/* Not-found banner */}
      {notFound && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          background: 'rgba(239,68,68,0.12)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '10px',
          fontSize: '13.5px',
          color: 'rgba(252,165,165,0.9)',
          zIndex: 100,
          letterSpacing: '-0.01em',
          maxWidth: '90vw',
          textAlign: 'center',
        }}>
          No content found for that interest. Try: Economics, Neuroscience, Climate Change, Fashion, or Robotics.
        </div>
      )}

      {step === 'input' && (
        <StepInput onSubmit={handleInterest} />
      )}

      {step === 'branches' && content && (
        <StepBranches
          content={content}
          onSelect={handleBranch}
          onBack={handleRestart}
        />
      )}

      {step === 'problems' && content && branch && (
        <StepProblems
          content={content}
          branch={branch}
          onSelect={handleProblem}
          onBack={() => setStep('branches')}
        />
      )}

      {step === 'spikes' && content && problem && (
        <StepSpikes
          content={content}
          problem={problem}
          onSelect={handleSpike}
          onBack={() => setStep('problems')}
        />
      )}

      {step === 'blueprint' && content && branch && problem && spike && (
        <StepBlueprint
          content={content}
          branch={branch}
          problem={problem}
          spike={spike}
          onRestart={handleRestart}
          onBack={() => setStep('spikes')}
        />
      )}
    </div>
  )
}
