'use client';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { SpikeNodeData } from '@/data/spikeDemo';

export default function NicheNode({ data, selected }: NodeProps) {
  const d = data as SpikeNodeData;
  return (
    <div style={{
      background: selected
        ? 'linear-gradient(135deg, #041e1b 0%, #083530 100%)'
        : 'linear-gradient(135deg, #021411 0%, #052420 100%)',
      border: `1.5px solid ${selected ? 'rgba(45,212,191,0.85)' : 'rgba(20,184,166,0.3)'}`,
      boxShadow: selected
        ? '0 0 0 3px rgba(45,212,191,0.07), 0 0 22px rgba(20,184,166,0.42), 0 0 55px rgba(20,184,166,0.1)'
        : '0 0 10px rgba(20,184,166,0.08)',
      borderRadius: '10px',
      padding: '10px 15px',
      minWidth: '172px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, width: 8, height: 8 }} />
      <div style={{
        fontSize: '8px',
        color: selected ? 'rgba(45,212,191,0.6)' : 'rgba(20,184,166,0.35)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '5px',
        fontFamily: 'var(--font-geist-mono)',
        transition: 'color 0.2s ease',
      }}>
        Approach
      </div>
      <div style={{
        fontSize: '13px',
        color: selected ? '#ccfbf1' : 'rgba(204,251,241,0.65)',
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
