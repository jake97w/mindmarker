'use client'
import { useState, useRef, useEffect } from 'react'

const SUGGESTIONS = ['Economics', 'Neuroscience', 'Climate Change', 'Fashion', 'Robotics']

interface StepInputProps {
  onSubmit: (value: string) => void
}

export default function StepInput({ onSubmit }: StepInputProps) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 600)
    return () => clearTimeout(t)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSubmit(trimmed)
  }

  const hasValue = value.trim().length > 0

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '48px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes inputFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.05); }
        }
        .suggest-pill {
          padding: 8px 18px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 100px;
          font-size: 13.5px;
          color: rgba(245,245,247,0.45);
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: -0.01em;
          font-family: inherit;
        }
        .suggest-pill:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.18);
          color: rgba(245,245,247,0.85);
          transform: translateY(-1px);
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'glowPulse 6s ease-in-out infinite',
      }} />

      {/* Wordmark */}
      <div style={{
        fontSize: '11px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(245,245,247,0.22)',
        marginBottom: '80px',
        fontFamily: 'var(--font-geist-mono)',
        animation: 'inputFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
      }}>
        Ivy Brothers Spike Engine
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: 'clamp(34px, 5.5vw, 58px)',
        fontWeight: '600',
        letterSpacing: '-0.035em',
        lineHeight: 1.08,
        color: '#f5f5f7',
        textAlign: 'center',
        marginBottom: '20px',
        maxWidth: '580px',
        animation: 'inputFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
      }}>
        What are you genuinely curious about?
      </h1>

      <p style={{
        fontSize: '17px',
        color: 'rgba(245,245,247,0.38)',
        textAlign: 'center',
        marginBottom: '64px',
        maxWidth: '380px',
        lineHeight: 1.65,
        letterSpacing: '-0.015em',
        animation: 'inputFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
      }}>
        Start broad. We&apos;ll help you find a spike that&apos;s distinctly yours.
      </p>

      {/* Input form */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '500px',
          animation: 'inputFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both',
        }}
      >
        <div style={{
          position: 'relative',
          marginBottom: '12px',
        }}>
          <input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="e.g. Economics, Neuroscience, Climate..."
            style={{
              width: '100%',
              padding: '19px 26px',
              background: focused
                ? 'rgba(255,255,255,0.07)'
                : 'rgba(255,255,255,0.04)',
              border: `1px solid ${focused
                ? 'rgba(255,255,255,0.22)'
                : 'rgba(255,255,255,0.09)'}`,
              borderRadius: '16px',
              fontSize: '18px',
              color: '#f5f5f7',
              outline: 'none',
              transition: 'all 0.25s ease',
              letterSpacing: '-0.02em',
              boxSizing: 'border-box',
              boxShadow: focused ? '0 0 0 4px rgba(99,102,241,0.08)' : 'none',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!hasValue}
          style={{
            width: '100%',
            padding: '18px',
            background: hasValue
              ? '#f5f5f7'
              : 'rgba(255,255,255,0.06)',
            color: hasValue ? '#07080f' : 'rgba(245,245,247,0.2)',
            border: 'none',
            borderRadius: '16px',
            fontSize: '15px',
            fontWeight: '600',
            letterSpacing: '-0.015em',
            cursor: hasValue ? 'pointer' : 'default',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: hasValue ? 'none' : 'none',
            boxShadow: hasValue ? '0 2px 20px rgba(245,245,247,0.12)' : 'none',
          }}
          onMouseEnter={e => {
            if (hasValue) (e.currentTarget as HTMLElement).style.opacity = '0.9'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.opacity = '1'
          }}
        >
          Explore this interest
        </button>
      </form>

      {/* Suggestions */}
      <div style={{
        marginTop: '48px',
        textAlign: 'center',
        animation: 'inputFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both',
      }}>
        <p style={{
          fontSize: '10.5px',
          color: 'rgba(245,245,247,0.2)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '16px',
          fontFamily: 'var(--font-geist-mono)',
        }}>
          Or try one of these
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} className="suggest-pill" onClick={() => onSubmit(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
