'use client';
import { useState, useCallback, useEffect } from 'react';
import SpikeGraph from './SpikeGraph';
import AnalysisPanel from './AnalysisPanel';
import { demoNodes } from '@/data/spikeDemo';

export default function SpikeEngine() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  const handleNodeSelect = useCallback((id: string | null) => {
    setSelectedNodeId(id);
  }, []);

  const selectedNode = selectedNodeId
    ? demoNodes.find((n) => n.id === selectedNodeId) ?? null
    : null;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes panelFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
      `}</style>

      {/* ── Intro overlay ───────────────────────────────────────────────────── */}
      {!ready && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: '#070b14',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          animation: 'fadeIn 0.3s ease forwards',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '22px',
              height: '22px',
              background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              boxShadow: '0 0 14px rgba(251,191,36,0.25)',
            }}>
              ✦
            </div>
            <span style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.22em',
              fontFamily: 'var(--font-geist-mono)',
              textTransform: 'uppercase',
            }}>
              Ivy Brothers
            </span>
          </div>
          <div style={{
            fontSize: '26px',
            color: 'rgba(255,255,255,0.8)',
            fontWeight: '300',
            letterSpacing: '-0.03em',
          }}>
            Profile Framework
          </div>
          <div style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.18)',
            fontFamily: 'var(--font-geist-mono)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Alex Chen · Junior
          </div>
        </div>
      )}

      {/* ── App shell ──────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        background: '#070b14',
        overflow: 'hidden',
        fontFamily: 'var(--font-geist-sans)',
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header style={{
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(6,10,18,0.98)',
          backdropFilter: 'blur(20px)',
          flexShrink: 0,
          zIndex: 10,
        }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <div style={{
                width: '16px',
                height: '16px',
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                boxShadow: '0 0 6px rgba(251,191,36,0.18)',
              }}>
                ✦
              </div>
              <span style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.18em',
                fontFamily: 'var(--font-geist-mono)',
                textTransform: 'uppercase',
              }}>
                Ivy Brothers
              </span>
            </div>
            <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.14em',
              fontFamily: 'var(--font-geist-mono)',
              textTransform: 'uppercase',
            }}>
              Profile Framework
            </span>
          </div>

          {/* Right */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.32)',
              letterSpacing: '-0.01em',
            }}>
              Alex Chen
            </div>
            <div style={{
              fontSize: '9px',
              color: 'rgba(255,255,255,0.14)',
              fontFamily: 'var(--font-geist-mono)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginTop: '1px',
            }}>
              Junior · File #2025-001
            </div>
          </div>
        </header>

        {/* ── Canvas ─────────────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
          <div style={{ flex: 1, position: 'relative', height: '100%' }}>
            <SpikeGraph onNodeSelect={handleNodeSelect} selectedNodeId={selectedNodeId} />

            {/* Layer legend */}
            <div style={{
              position: 'absolute',
              bottom: 24,
              right: 24,
              background: 'rgba(6,10,18,0.88)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '12px 14px',
              zIndex: 5,
            }}>
              <div style={{
                fontSize: '7.5px',
                color: 'rgba(255,255,255,0.14)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-geist-mono)',
                marginBottom: '9px',
              }}>
                Map Layers
              </div>
              {[
                { color: '#f59e0b', label: 'Profile' },
                { color: '#6366f1', label: 'Interest Areas' },
                { color: '#8b5cf6', label: 'Focus Areas' },
                { color: '#f43f5e', label: 'Problem Spaces' },
                { color: '#14b8a6', label: 'Approaches' },
                { color: '#fbbf24', label: 'Profile Blueprint' },
              ].map(({ color, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '2px',
                    background: color, flexShrink: 0,
                    boxShadow: `0 0 4px ${color}44`,
                  }} />
                  <span style={{
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.25)',
                    fontFamily: 'var(--font-geist-mono)',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <AnalysisPanel node={selectedNode as { id: string; data: Record<string, unknown> } | null} />
        </div>
      </div>
    </>
  );
}
