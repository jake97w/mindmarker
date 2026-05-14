'use client'
import type { InterestContent, Branch, Problem, Spike } from '@/data/engine/types'
import { composite, tier } from '@/data/engine/scoring'
import ScoreBar from './ScoreBar'

interface StepBlueprintProps {
  content: InterestContent
  branch: Branch
  problem: Problem
  spike: Spike
  onRestart: () => void
  onBack: () => void
}

export default function StepBlueprint({ content, branch, problem, spike, onRestart, onBack }: StepBlueprintProps) {
  const score = composite(spike.scores)
  const t = tier(score)

  return (
    <div style={{
      maxWidth: '720px',
      margin: '0 auto',
      padding: '72px 32px 112px',
    }}>
      <style>{`
        @keyframes stepFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scoreReveal {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes identityReveal {
          from { opacity: 0; transform: translateY(20px); }
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
        ← Compare directions
      </button>

      {/* Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '5px 13px',
        background: 'rgba(250,204,21,0.07)',
        border: '1px solid rgba(250,204,21,0.18)',
        borderRadius: '100px',
        marginBottom: '32px',
        animation: 'stepFadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both',
      }}>
        <span style={{ fontSize: '11px', color: 'rgba(250,204,21,0.7)' }}>★</span>
        <span style={{
          fontSize: '10.5px',
          color: 'rgba(250,204,21,0.6)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-geist-mono)',
        }}>
          Your Spike Identity
        </span>
      </div>

      {/* Hero: Spike Identity */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.025) 100%)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '12px',
        animation: 'identityReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
      }}>
        <div style={{
          fontSize: '10.5px',
          color: 'rgba(245,245,247,0.22)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-geist-mono)',
          marginBottom: '20px',
        }}>
          You are
        </div>
        <p style={{
          fontSize: 'clamp(20px, 2.8vw, 28px)',
          fontWeight: '500',
          color: '#f5f5f7',
          lineHeight: 1.35,
          letterSpacing: '-0.025em',
          margin: 0,
        }}>
          {spike.spikeIdentity}
        </p>
      </div>

      {/* Theme Explanation */}
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        animation: 'stepFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
      }}>
        <p style={{
          fontSize: '15px',
          color: 'rgba(245,245,247,0.58)',
          lineHeight: 1.8,
          letterSpacing: '-0.012em',
          margin: 0,
        }}>
          {spike.themeExplanation}
        </p>
      </div>

      {/* Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        padding: '12px 18px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '10px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        animation: 'stepFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both',
      }}>
        {[content.label, branch.label, problem.label].map((item, i, arr) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <span style={{
              fontSize: '12.5px',
              color: i === arr.length - 1
                ? 'rgba(245,245,247,0.55)'
                : 'rgba(245,245,247,0.25)',
              letterSpacing: '-0.01em',
            }}>
              {item}
            </span>
            {i < arr.length - 1 && (
              <span style={{ color: 'rgba(245,245,247,0.15)', fontSize: '12px' }}>›</span>
            )}
          </span>
        ))}
      </div>

      {/* Score block */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '12px',
        animation: 'scoreReveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '28px',
          gap: '16px',
        }}>
          <div>
            <div style={{
              fontSize: '10.5px',
              color: 'rgba(245,245,247,0.22)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-geist-mono)',
              marginBottom: '6px',
            }}>
              Differentiation Score
            </div>
            <div style={{
              fontSize: '15px',
              color: 'rgba(245,245,247,0.38)',
              letterSpacing: '-0.01em',
            }}>
              {t.label}
            </div>
          </div>
          <div style={{
            fontSize: '56px',
            fontWeight: '600',
            color: '#f5f5f7',
            letterSpacing: '-0.05em',
            fontFamily: 'var(--font-geist-mono)',
            lineHeight: 0.9,
          }}>
            {score}
          </div>
        </div>
        <ScoreBar label="Differentiation" value={spike.scores.differentiation} reason={spike.scores.differentiationReason} delay={350} />
        <ScoreBar label="Uniqueness"      value={spike.scores.uniqueness}      reason={spike.scores.uniquenessReason}      delay={430} />
        <ScoreBar label="Feasibility"     value={spike.scores.feasibility}     reason={spike.scores.feasibilityReason}     delay={510} />
      </div>

      {/* Research Directions */}
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '12px',
        animation: 'stepFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both',
      }}>
        <div style={{
          fontSize: '10.5px',
          color: 'rgba(245,245,247,0.22)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-geist-mono)',
          marginBottom: '20px',
        }}>
          Research Directions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {spike.researchDirections.map((dir, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '10px',
                color: 'rgba(245,245,247,0.35)',
                fontFamily: 'var(--font-geist-mono)',
                marginTop: '1px',
              }}>
                {i + 1}
              </div>
              <p style={{
                fontSize: '14px',
                color: 'rgba(245,245,247,0.55)',
                lineHeight: 1.65,
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                {dir}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Ideas */}
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '40px',
        animation: 'stepFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
      }}>
        <div style={{
          fontSize: '10.5px',
          color: 'rgba(245,245,247,0.22)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-geist-mono)',
          marginBottom: '20px',
        }}>
          Project & Initiative Ideas
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {spike.projectIdeas.map((idea, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '11px',
                color: 'rgba(245,245,247,0.4)',
                fontFamily: 'var(--font-geist-mono)',
                marginTop: '0px',
              }}>
                {i + 1}
              </div>
              <p style={{
                fontSize: '14.5px',
                color: 'rgba(245,245,247,0.55)',
                lineHeight: 1.65,
                letterSpacing: '-0.01em',
                margin: 0,
                paddingTop: '2px',
              }}>
                {idea}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '10px',
        animation: 'stepFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.58s both',
      }}>
        <button
          onClick={onRestart}
          style={{
            flex: 1,
            padding: '17px',
            background: '#f5f5f7',
            color: '#07080f',
            border: 'none',
            borderRadius: '16px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            letterSpacing: '-0.015em',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 16px rgba(245,245,247,0.1)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.opacity = '0.88'
            el.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }}
        >
          Explore another interest
        </button>
        <button
          onClick={onBack}
          style={{
            padding: '17px 24px',
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(245,245,247,0.55)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '16px',
            fontSize: '15px',
            cursor: 'pointer',
            letterSpacing: '-0.015em',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'rgba(255,255,255,0.09)'
            el.style.color = 'rgba(245,245,247,0.8)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'rgba(255,255,255,0.05)'
            el.style.color = 'rgba(245,245,247,0.55)'
          }}
        >
          Compare directions
        </button>
      </div>
    </div>
  )
}
