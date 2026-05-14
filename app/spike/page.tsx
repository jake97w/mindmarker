'use client';
import dynamic from 'next/dynamic';

// Load client-only (React Flow uses browser APIs)
const SpikeEngine = dynamic(() => import('@/components/spike/SpikeEngine'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#070b14',
      color: 'rgba(255,255,255,0.2)',
      fontSize: '11px',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontFamily: 'monospace',
    }}>
      Initializing Engine...
    </div>
  ),
});

export default function SpikePage() {
  return <SpikeEngine />;
}
