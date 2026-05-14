'use client'
import type { InterestContent, Branch } from '@/data/engine/types'

interface StepProblemsProps {
  content: InterestContent
  branch: Branch
  onSelect: (problemId: string) => void
  onBack: () => void
}

export default function StepProblems({ content, branch, onSelect, onBack }: StepProblemsProps) {
  const problems = content.problems[branch.id] ?? []

  return (
    <div style={{
      maxWidth: '740px',
      margin: '0 auto',
      padding: '72px 32px 96px',
    }}>
      <style>{`
        @keyframes stepFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .problem-row {
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .problem-row:hover {
          background: rgba(255,255,255,0.055) !important;
          border-color: rgba(255,255,255,0.13) !important;
          transform: translateY(-1px);
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
        ← {branch.label}
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
          Focus Area
        </div>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: '600',
          letterSpacing: '-0.035em',
          color: '#f5f5f7',
          marginBottom: '14px',
          lineHeight: 1.1,
        }}>
          {branch.label}
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'rgba(245,245,247,0.35)',
          letterSpacing: '-0.015em',
        }}>
          Which problem space interests you most?
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {problems.map((problem, i) => (
          <button
            key={problem.id}
            className="problem-row"
            onClick={() => onSelect(problem.id)}
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '28px 30px',
              cursor: 'pointer',
              textAlign: 'left',
              animation: `stepFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.07}s both`,
            }}
          >
            <div style={{
              fontSize: '17px',
              fontWeight: '500',
              color: '#f5f5f7',
              letterSpacing: '-0.025em',
              marginBottom: '9px',
              lineHeight: 1.35,
            }}>
              {problem.label}
            </div>
            <div style={{
              fontSize: '14px',
              color: 'rgba(245,245,247,0.42)',
              lineHeight: 1.6,
              letterSpacing: '-0.01em',
              marginBottom: '18px',
            }}>
              {problem.description}
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}>
              <span style={{
                fontSize: '10px',
                color: 'rgba(245,245,247,0.2)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-geist-mono)',
                paddingTop: '2px',
                flexShrink: 0,
                lineHeight: 1.5,
              }}>
                Why it matters
              </span>
              <span style={{
                fontSize: '13px',
                color: 'rgba(245,245,247,0.38)',
                lineHeight: 1.65,
                letterSpacing: '-0.01em',
              }}>
                {problem.whyItMatters}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
