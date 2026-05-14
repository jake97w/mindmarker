import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy Brothers Spike Engine',
  description: 'Discover your research direction.',
}

export default function EngineLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#07080f', color: '#f5f5f7' }}>
      {children}
    </div>
  )
}
