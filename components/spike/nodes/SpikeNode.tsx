'use client';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { SpikeNodeData } from '@/data/spikeDemo';

export default function SpikeNode({ data, selected }: NodeProps) {
  const d = data as SpikeNodeData;

  return (
    <>
      <style>{`
        @keyframes spikeIdle {
          0%, 100% { box-shadow: 0 0 20px rgba(251,191,36,0.3), 0 0 50px rgba(251,191,36,0.1); }
          50%       { box-shadow: 0 0 28px rgba(251,191,36,0.44), 0 0 68px rgba(251,191,36,0.16); }
        }
        @keyframes spikeActive {
          0%, 100% { box-shadow: 0 0 0 3px rgba(251,191,36,0.08), 0 0 32px rgba(251,191,36,0.55), 0 0 80px rgba(251,191,36,0.2); }
          50%       { box-shadow: 0 0 0 3px rgba(251,191,36,0.14), 0 0 44px rgba(251,191,36,0.7), 0 0 100px rgba(251,191,36,0.28); }
        }
      `}</style>
      <div style={{
        background: selected
          ? 'linear-gradient(135deg, #231900 0%, #342500 60%, #1e1600 100%)'
          : 'linear-gradient(135deg, #161000 0%, #221800 60%, #141000 100%)',
        border: `2px solid ${selected ? 'rgba(251,191,36,0.92)' : 'rgba(251,191,36,0.55)'}`,
        animation: selected ? 'spikeActive 2.4s ease-in-out infinite' : 'spikeIdle 3.5s ease-in-out infinite',
        borderRadius: '14px',
        padding: '16px 18px',
        minWidth: '240px',
        maxWidth: '252px',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, background 0.2s ease',
      }}>
        <Handle type="target" position={Position.Left} style={{ opacity: 0, width: 10, height: 10 }} />

        {/* Header */}
        <div style={{
          fontSize: '8.5px',
          color: selected ? '#fbbf24' : 'rgba(251,191,36,0.55)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-geist-mono)',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          transition: 'color 0.2s ease',
        }}>
          ★ Profile Blueprint
        </div>

        {/* Label */}
        <div style={{
          fontSize: '13px',
          color: selected ? '#fef9c3' : 'rgba(254,249,195,0.72)',
          fontWeight: '500',
          letterSpacing: '-0.01em',
          lineHeight: 1.45,
          transition: 'color 0.2s ease',
        }}>
          {d.label}
        </div>
      </div>
    </>
  );
}
