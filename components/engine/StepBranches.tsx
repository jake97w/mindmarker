'use client'
import type { InterestContent } from '@/data/engine/types'

const ACCENT_COLORS = [
  { border: 'rgba(99,102,241,0.2)',  bg: 'rgba(99,102,241,0.06)',  hover: 'rgba(99,102,241,0.12)', dot: '#818cf8', glow: 'rgba(99,102,241,0.3)' },
  { border: 'rgba(20,184,166,0.2)',  bg: 'rgba(20,184,166,0.06)',  hover: 'rgba(20,184,166,0.12)', dot: '#2dd4bf', glow: 'rgba(20,184,166,0.3)' },
  { border: 'rgba(249,115,22,0.2)',  bg: 'rgba(249,115,22,0.06)',  hover: 'rgba(249,115,22,0.12)', dot: '#fb923c', glow: 'rgba(249,115,22,0.3)' },
  { border: 'rgba(236,72,153,0.2)',  bg: 'rgba(236,72,153,0.06)',  hover: 'rgba(236,72,153,0.12)', dot: '#f472b6', glow: 'rgba(236,72,153,0.3)' },
  { border: 'rgba(234,179,8,0.2)',   bg: 'rgba(234,179,8,0.06)',   hover: 'rgba(234,179,8,0.12)',  dot: '#facc15', glow: 'rgba(234,179,8,0.3)'  },
  { border: 'rgba(34,197,94,0.2)',   bg: 'rgba(34,197,94,0.06)',   hover: 'rgba(34,197,94,0.12)',  dot: '#4ade80', glow: 'rgba(34,197,94,0.3)'  },
]

interface StepBranchesProps {
  content: InterestContent
  onSelect: (branchId: string) => void
  onBack: () => void
}

export default function StepBranches({ content, onSelect, onBack }: StepBranchesProps) {
  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '72px 32px 96px',
    }}>
      <style>{`
        @keyframes stepFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .branch-card {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .branch-card:hover {
          transform: translateY(-3px) !important;
        }
      `}</style>

      {/* Back */}
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
          letterSpacing: '-0.01em',
          fontFamily: 'inherit',
          animation: 'stepFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,247,0.55)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,247,0.28)'}
      >
        ← Back
      </button>

      {/* Header */}
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
          Interest Area
        </div>
        <h2 style={{
          fontSize: 'clamp(30px, 4.5vw, 48px)',
          fontWeight: '600',
          letterSpacing: '-0.035em',
          color: '#f5f5f7',
          marginBottom: '14px',
          lineHeight: 1.08,
        }}>
          {content.label}
        </h2>
        <p style={{
          fontSize: '16px',
          color: 'rgba(245,245,247,0.35)',
          letterSpacing: '-0.015em',
          lineHeight: 1.5,
        }}>
          Choose a focus area to explore.
        </p>
      </div>

      {/* Branch grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '10px',
      }}>
        {content.branches.map((branch, i) => {
          const color = ACCENT_COLORS[branch.colorIndex % ACCENT_COLORS.length]
          return (
            <button
              key={branch.id}
              className="branch-card"
              onClick={() => onSelect(branch.id)}
              style={{
                background: color.bg,
                border: `1px solid ${color.border}`,
                borderRadius: '18px',
                padding: '28px 26px',
                cursor: 'pointer',
                textAlign: 'left',
                animation: `stepFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.04}s both`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = color.hover
                el.style.borderColor = color.dot.replace(')', ',0.4)').replace('rgb', 'rgba')
                el.style.boxShadow = `0 8px 32px ${color.glow}`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = color.bg
                el.style.borderColor = color.border
                el.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: color.dot,
                marginBottom: '20px',
                boxShadow: `0 0 10px ${color.glow}`,
              }} />
              <div style={{
                fontSize: '15.5px',
                fontWeight: '500',
                color: '#f5f5f7',
                letterSpacing: '-0.025em',
                marginBottom: '9px',
                lineHeight: 1.3,
              }}>
                {branch.label}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(245,245,247,0.4)',
                lineHeight: 1.6,
                letterSpacing: '-0.01em',
              }}>
                {branch.description}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
