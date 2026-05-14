'use client'
import type { InterestContent, Problem } from '@/data/engine/types'
import { composite, tier, ranked } from '@/data/engine/scoring'
import ScoreBar from './ScoreBar'

interface StepSpikesProps {
  content: InterestContent
  problem: Problem
  onSelect: (spikeId: string) => void
  onBack: () => void
}

export default function StepSpikes({ content, problem, onSelect, onBack }: StepSpikesProps) {
  const spikes = ranked(content.spikes[problem.id] ?? [])

  return (
    <div style={{
      maxWidth: '780px',
      margin: '0 auto',
      padding: '72px 32px 96px',
    }}>
      <style>{`
        @keyframes stepFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(245,245,247,0.28)',
          fontSize: '13px',
          cursor: 'pointer',
          padding: '0',
          marginBottom: '64px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          fontFamily: 'inherit',
          animation: 'stepFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,247,0.55)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,247,0.28)'}
      >
        ← {problem.label}
      </button>

      <div style={{
        marginBottom: '56px',
        animation: 'stepFadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both',
      }}>
        <div style={{
          fontSize: '10.5px',
          color: 'rgba(245,245,247,0.22)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          marginBottom: '14px',
          fontFamily: 'var(--font-geist-mono)',
        }}>
          Research Directions
        </div>
        <h2 style={{
          fontSize: 'clamp(26px, 3.5vw, 38px)',
          fontWeight: '600',
          letterSpacing: '-0.035em',
          color: '#f5f5f7',
          marginBottom: '14px',
          lineHeight: 1.1,
        }}>
          Ranked spike directions
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'rgba(245,245,247,0.35)',
          letterSpacing: '-0.015em',
        }}>
          Ordered by differentiation potential. Select one to build your blueprint.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {spikes.map((spike, i) => {
          const score = composite(spike.scores)
          const t = tier(score)
          const isTop = i === 0

          return (
            <button
              key={spike.id}
              onClick={() => onSelect(spike.id)}
              style={{
                background: isTop
                  ? 'rgba(255,255,255,0.055)'
                  : 'rgba(255,255,255,0.025)',
                border: isTop
                  ? '1px solid rgba(255,255,255,0.13)'
                  : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '18px',
                padding: '30px 32px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                animation: `stepFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.08}s both`,
                boxShadow: isTop ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = isTop ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = isTop ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.025)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = isTop ? '0 4px 24px rgba(0,0,0,0.3)' : 'none'
              }}
            >
              {/* Header row */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '20px',
              }}>
                <div style={{ flex: 1 }}>
                  {isTop && (
                    <div style={{
                      fontSize: '10px',
                      color: 'rgba(250,204,21,0.65)',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-geist-mono)',
                      marginBottom: '10px',
                    }}>
                      ★ Top match
                    </div>
                  )}
                  <div style={{
                    fontSize: '17px',
                    fontWeight: '500',
                    color: '#f5f5f7',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.35,
                  }}>
                    {spike.label}
                  </div>
                </div>

                {/* Score pill */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  flexShrink: 0,
                }}>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    color: score >= 80 ? '#f5f5f7' : 'rgba(245,245,247,0.5)',
                    fontFamily: 'var(--font-geist-mono)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}>
                    {score}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(245,245,247,0.22)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-geist-mono)',
                  }}>
                    {t.label}
                  </div>
                </div>
              </div>

              <div style={{
                fontSize: '14px',
                color: 'rgba(245,245,247,0.4)',
                lineHeight: 1.65,
                letterSpacing: '-0.01em',
                marginBottom: '24px',
              }}>
                {spike.description}
              </div>

              {/* Score bars */}
              <div style={{
                paddingTop: '20px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                <ScoreBar label="Differentiation" value={spike.scores.differentiation} reason={spike.scores.differentiationReason} delay={i * 80 + 80} />
                <ScoreBar label="Uniqueness"      value={spike.scores.uniqueness}      reason={spike.scores.uniquenessReason}      delay={i * 80 + 140} />
                <ScoreBar label="Feasibility"     value={spike.scores.feasibility}     reason={spike.scores.feasibilityReason}     delay={i * 80 + 200} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
