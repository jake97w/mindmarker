import type { ReactNode } from 'react';

// Isolated layout — no nav, no auth chrome, full viewport
export const metadata = {
  title: 'Spike Discovery Engine · Ivy Brothers',
};

export default function SpikeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
