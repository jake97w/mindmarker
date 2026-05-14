'use client';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { SpikeNodeData } from '@/data/spikeDemo';

export default function InterestNode({ data, selected }: NodeProps) {
  const d = data as SpikeNodeData;
  return (
    <div style={{
      background: selected
        ? 'linear-gradient(135deg, #0f1135 0%, #141850 100%)'
        : 'linear-gradient(135deg, #090c22 0%, #0e1130 100%)',
      border: `1.5px solid ${selected ? 'rgba(129,140,248,0.85)' : 'rgba(99,102,241,0.35)'}`,
      boxShadow: selected
        ? '0 0 0 3px rgba(129,140,248,0.07), 0 0 24px rgba(99,102,241,0.45), 0 0 60px rgba(99,102,241,0.12)'
        : '0 0 10px rgba(99,102,241,0.1)',
      borderRadius: '10px',
      padding: '10px 15px',
      minWidth: '168px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, width: 8, height: 8 }} />
      <div style={{
        fontSize: '8px',
        color: selected ? 'rgba(129,140,248,0.6)' : 'rgba(99,102,241,0.38)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '5px',
        fontFamily: 'var(--font-geist-mono)',
        transition: 'color 0.2s ease',
      }}>
        Interest Area
      </div>
      <div style={{
        fontSize: '13.5px',
        color: selected ? '#e0e7ff' : 'rgba(224,231,255,0.7)',
        fontWeight: '500',
        letterSpacing: '-0.01em',
        lineHeight: 1.25,
        transition: 'color 0.2s ease',
      }}>
        {d.label}
      </div>
    </div>
  );
}
