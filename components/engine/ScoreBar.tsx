'use client'
import { useEffect, useState } from 'react'

interface ScoreBarProps {
  label: string
  value: number
  reason?: string
  delay?: number
}

const barColor = (v: number) =>
  v >= 85 ? 'rgba(245,245,247,0.75)' :
  v >= 70 ? 'rgba(245,245,247,0.5)'  :
            'rgba(245,245,247,0.28)'

export default function ScoreBar({ label, value, reason, delay = 0 }: ScoreBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])

  return (
    <div style={{ marginBottom: reason ? '18px' : '14px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '6px',
      }}>
        <span style={{
          fontSize: '11px',
          color: 'rgba(245,245,247,0.3)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-geist-mono)',
        }}>
          {label}
        </span>
        <span style={{
          fontSize: '12px',
          color: 'rgba(245,245,247,0.5)',
          fontFamily: 'var(--font-geist-mono)',
          fontWeight: '500',
        }}>
          {value}
        </span>
      </div>
      <div style={{
        height: '2px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '1px',
        overflow: 'hidden',
        marginBottom: reason ? '7px' : '0',
      }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: barColor(value),
          borderRadius: '1px',
          transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        }} />
      </div>
      {reason && (
        <p style={{
          fontSize: '12px',
          color: 'rgba(245,245,247,0.28)',
          lineHeight: 1.55,
          letterSpacing: '-0.005em',
          margin: 0,
          fontStyle: 'italic',
        }}>
          {reason}
        </p>
      )}
    </div>
  )
}
