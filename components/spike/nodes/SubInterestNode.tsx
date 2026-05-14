'use client';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { SpikeNodeData } from '@/data/spikeDemo';

export default function SubInterestNode({ data, selected }: NodeProps) {
  const d = data as SpikeNodeData;
  return (
    <div style={{
      background: selected
        ? 'linear-gradient(135deg, #110c28 0%, #1a1040 100%)'
        : 'linear-gradient(135deg, #0b0818 0%, #110d25 100%)',
      border: `1px solid ${selected ? 'rgba(167,139,250,0.8)' : 'rgba(139,92,246,0.3)'}`,
      boxShadow: selected
        ? '0 0 0 3px rgba(167,139,250,0.06), 0 0 20px rgba(139,92,246,0.4), 0 0 50px rgba(139,92,246,0.1)'
        : '0 0 8px rgba(139,92,246,0.08)',
      borderRadius: '8px',
      padding: '8px 13px',
      minWidth: '154px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, width: 8, height: 8 }} />
      <div style={{
        fontSize: '7.5px',
        color: selected ? 'rgba(167,139,250,0.55)' : 'rgba(139,92,246,0.32)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        marginBottom: '4px',
        fontFamily: 'var(--font-geist-mono)',
        transition: 'color 0.2s ease',
      }}>
        Focus Area
      </div>
      <div style={{
        fontSize: '12.5px',
        color: selected ? '#ede9fe' : 'rgba(237,233,254,0.65)',
        fontWeight: '450',
        letterSpacing: '-0.01em',
        lineHeight: 1.25,
        transition: 'color 0.2s ease',
      }}>
        {d.label}
      </div>
    </div>
  );
}
