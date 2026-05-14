'use client';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { SpikeNodeData } from '@/data/spikeDemo';

export default function StudentNode({ data, selected }: NodeProps) {
  const d = data as SpikeNodeData;
  return (
    <div style={{
      background: selected
        ? 'linear-gradient(135deg, #1f1500 0%, #2e1e00 100%)'
        : 'linear-gradient(135deg, #14100a 0%, #1c1500 100%)',
      border: `1.5px solid ${selected ? 'rgba(251,191,36,0.9)' : 'rgba(245,158,11,0.4)'}`,
      boxShadow: selected
        ? '0 0 0 3px rgba(251,191,36,0.08), 0 0 32px rgba(251,191,36,0.45), 0 0 80px rgba(251,191,36,0.14)'
        : '0 0 16px rgba(245,158,11,0.12), inset 0 1px 0 rgba(255,255,255,0.03)',
      borderRadius: '12px',
      padding: '14px 18px',
      minWidth: '210px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}>
      <Handle type="source" position={Position.Right} style={{ opacity: 0, width: 10, height: 10 }} />
      <div style={{
        fontSize: '8.5px',
        color: selected ? 'rgba(251,191,36,0.7)' : 'rgba(245,158,11,0.45)',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        marginBottom: '8px',
        fontFamily: 'var(--font-geist-mono)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'color 0.2s ease',
      }}>
        <span>◆</span> Student Profile
      </div>
      <div style={{
        fontSize: '16px',
        color: selected ? '#fef9c3' : 'rgba(254,243,199,0.8)',
        fontWeight: '500',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        transition: 'color 0.2s ease',
      }}>
        {d.label}
      </div>
      {d.subtitle && (
        <div style={{
          fontSize: '10.5px',
          color: 'rgba(254,243,199,0.28)',
          marginTop: '5px',
          fontFamily: 'var(--font-geist-mono)',
          letterSpacing: '0.04em',
        }}>
          {d.subtitle}
        </div>
      )}
    </div>
  );
}
