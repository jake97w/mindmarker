'use client';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { SpikeNodeData } from '@/data/spikeDemo';

export default function ProblemNode({ data, selected }: NodeProps) {
  const d = data as SpikeNodeData;
  return (
    <div style={{
      background: selected
        ? 'linear-gradient(135deg, #200c14 0%, #301018 100%)'
        : 'linear-gradient(135deg, #13080d 0%, #1e0c12 100%)',
      border: `1.5px solid ${selected ? 'rgba(251,113,133,0.85)' : 'rgba(244,63,94,0.32)'}`,
      boxShadow: selected
        ? '0 0 0 3px rgba(251,113,133,0.07), 0 0 22px rgba(244,63,94,0.42), 0 0 55px rgba(244,63,94,0.1)'
        : '0 0 10px rgba(244,63,94,0.08)',
      borderRadius: '10px',
      padding: '10px 15px',
      minWidth: '175px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, width: 8, height: 8 }} />
      <div style={{
        fontSize: '8px',
        color: selected ? 'rgba(251,113,133,0.6)' : 'rgba(244,63,94,0.38)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '5px',
        fontFamily: 'var(--font-geist-mono)',
        transition: 'color 0.2s ease',
      }}>
        Problem Space
      </div>
      <div style={{
        fontSize: '13px',
        color: selected ? '#ffe4e6' : 'rgba(255,228,230,0.65)',
        fontWeight: '500',
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
        transition: 'color 0.2s ease',
      }}>
        {d.label}
      </div>
    </div>
  );
}
