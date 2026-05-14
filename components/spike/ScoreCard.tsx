'use client';
import { useEffect, useState } from 'react';

interface ScoreCardProps {
  label: string;
  score: number;
  barColor: string;
  glowColor: string;
  delay?: number;
}

export default function ScoreCard({ label, score, barColor, glowColor, delay = 0 }: ScoreCardProps) {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setWidth(0);
    setVisible(false);
    const t1 = setTimeout(() => setVisible(true), delay);
    const t2 = setTimeout(() => setWidth(score), delay + 60);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [score, delay]);

  const tier =
    score >= 93 ? { label: 'EXCEPTIONAL', color: '#fbbf24' } :
    score >= 85 ? { label: 'STRONG',       color: '#a3e635' } :
    score >= 75 ? { label: 'VIABLE',       color: '#67e8f9' } :
                  { label: 'DEVELOPING',   color: '#94a3b8' };

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(6px)',
      transition: 'opacity 0.35s ease, transform 0.35s ease',
      marginBottom: '18px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-geist-mono)',
        }}>
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{
            fontSize: '8px',
            color: tier.color,
            letterSpacing: '0.15em',
            fontFamily: 'var(--font-geist-mono)',
            opacity: 0.75,
          }}>
            {tier.label}
          </span>
          <span style={{
            fontSize: '17px',
            color: tier.color,
            fontFamily: 'var(--font-geist-mono)',
            fontWeight: '600',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            {score}
          </span>
        </div>
      </div>
      <div style={{
        height: '2px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '1px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          width: `${width}%`,
          background: barColor,
          borderRadius: '1px',
          transition: 'width 1.1s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: `0 0 12px ${glowColor}`,
        }} />
      </div>
    </div>
  );
}
