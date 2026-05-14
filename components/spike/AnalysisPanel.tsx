'use client';
import type { SpikeNodeData } from '@/data/spikeDemo';

interface AnalysisPanelProps {
  node: { id: string; data: Record<string, unknown> } | null;
}

const VARIANT_META: Record<string, { label: string; accent: string; dim: string }> = {
  student:     { label: 'Student Profile',    accent: '#f59e0b', dim: 'rgba(245,158,11,0.1)'  },
  interest:    { label: 'Interest Area',      accent: '#818cf8', dim: 'rgba(99,102,241,0.08)' },
  subinterest: { label: 'Focus Area',         accent: '#a78bfa', dim: 'rgba(139,92,246,0.08)' },
  problem:     { label: 'Problem Space',      accent: '#fb7185', dim: 'rgba(244,63,94,0.08)'  },
  niche:       { label: 'Strategic Approach', accent: '#2dd4bf', dim: 'rgba(20,184,166,0.08)' },
  spike:       { label: 'Profile Blueprint',  accent: '#fbbf24', dim: 'rgba(251,191,36,0.1)'  },
};

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '8px',
      color: 'rgba(255,255,255,0.22)',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      fontFamily: 'var(--font-geist-mono)',
      marginBottom: '10px',
    }}>
      {children}
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyPanel() {
  return (
    <div style={{
      width: '360px',
      height: '100%',
      borderLeft: '1px solid rgba(255,255,255,0.05)',
      background: '#060a12',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '32px 28px',
      position: 'relative',
    }}>
      {/* Profile summary */}
      <div style={{
        padding: '18px',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '8px',
        marginBottom: '24px',
      }}>
        <div style={{
          fontSize: '8px',
          color: 'rgba(255,255,255,0.2)',
          fontFamily: 'var(--font-geist-mono)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Active Profile
        </div>
        <div style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.72)',
          fontWeight: '400',
          letterSpacing: '-0.02em',
          marginBottom: '4px',
        }}>
          Alex Chen
        </div>
        <div style={{
          fontSize: '11px',
          color: 'rgba(255,255,255,0.22)',
          fontFamily: 'var(--font-geist-mono)',
        }}>
          Junior · Honors Research Track
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '16px 0' }} />

        {[
          { label: 'Primary Focus',           value: 'Neuroscience & Aging' },
          { label: 'Differentiating Strength', value: 'Technical + Scientific' },
          { label: 'Research Readiness',       value: 'Strong' },
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '10px',
          }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{label}</span>
            <span style={{ fontSize: '11px', color: 'rgba(251,191,36,0.65)', fontFamily: 'var(--font-geist-mono)' }}>{value}</span>
          </div>
        ))}
      </div>

      <div style={{
        fontSize: '12px',
        color: 'rgba(255,255,255,0.18)',
        lineHeight: 1.7,
      }}>
        Select any section of the map to explore Alex's strategic direction in that area.
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: '9px',
        color: 'rgba(255,255,255,0.06)',
        fontFamily: 'var(--font-geist-mono)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
      }}>
        Ivy Brothers · Confidential
      </div>
    </div>
  );
}

// ── Profile Blueprint (spike) ─────────────────────────────────────────────────

function BlueprintPanel({ d, accent }: { d: SpikeNodeData; accent: string }) {
  const a = d.analysis;
  return (
    <div
      key="spike"
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '26px 26px 40px',
        animation: 'panelFadeUp 0.28s cubic-bezier(0.22,1,0.36,1) forwards',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.06) transparent',
      }}
    >
      {/* Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '4px 10px 4px 8px',
        borderRadius: '4px',
        background: 'rgba(251,191,36,0.08)',
        border: '1px solid rgba(251,191,36,0.18)',
        marginBottom: '20px',
      }}>
        <span style={{ fontSize: '9px', color: '#fbbf24', letterSpacing: '0.04em', fontFamily: 'var(--font-geist-mono)' }}>
          ★
        </span>
        <span style={{ fontSize: '9px', color: '#fbbf24', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-geist-mono)' }}>
          Profile Blueprint
        </span>
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: '16px',
        color: 'rgba(255,255,255,0.88)',
        fontWeight: '500',
        letterSpacing: '-0.015em',
        lineHeight: 1.4,
        marginBottom: '6px',
      }}>
        {d.label}
      </h2>

      {/* Positioning */}
      {a.positioning && (
        <p style={{
          fontSize: '12px',
          color: 'rgba(251,191,36,0.6)',
          fontStyle: 'italic',
          marginBottom: '18px',
          letterSpacing: '0.01em',
        }}>
          {a.positioning}
        </p>
      )}

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '22px' }} />

      {/* Your Direction */}
      <div style={{ marginBottom: '26px' }}>
        <SectionLabel>Your Direction</SectionLabel>
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.75,
        }}>
          {a.description}
        </p>
      </div>

      {/* Your Focus */}
      {a.themes && (
        <div style={{ marginBottom: '26px' }}>
          <SectionLabel>Your Focus</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {a.themes.map((t) => (
              <span key={t} style={{
                fontSize: '11px',
                color: 'rgba(251,191,36,0.55)',
                padding: '5px 11px',
                borderRadius: '4px',
                background: 'rgba(251,191,36,0.06)',
                border: '1px solid rgba(251,191,36,0.14)',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Your Positioning */}
      {a.advisorNote && (
        <div style={{ marginBottom: '26px' }}>
          <SectionLabel>Your Positioning</SectionLabel>
          <div style={{
            padding: '14px 16px',
            borderLeft: '2px solid rgba(251,191,36,0.3)',
            background: 'rgba(251,191,36,0.04)',
            borderRadius: '0 6px 6px 0',
          }}>
            <p style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.52)',
              lineHeight: 1.72,
              fontStyle: 'italic',
            }}>
              {a.advisorNote}
            </p>
          </div>
        </div>
      )}

      {/* Example Project Angles */}
      {a.projectAngles && (
        <div style={{ marginBottom: '26px' }}>
          <SectionLabel>Example Project Angles</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {a.projectAngles.map((angle, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '6px',
              }}>
                <span style={{
                  fontSize: '9px',
                  color: 'rgba(251,191,36,0.35)',
                  fontFamily: 'var(--font-geist-mono)',
                  marginTop: '2px',
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontSize: '12.5px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.6,
                }}>
                  {angle}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next steps */}
      {a.direction && (
        <div>
          <SectionLabel>Next Steps</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {a.direction.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: '9px',
                  color: 'rgba(251,191,36,0.3)',
                  fontFamily: 'var(--font-geist-mono)',
                  marginTop: '2px',
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Standard node panel ───────────────────────────────────────────────────────

export default function AnalysisPanel({ node }: AnalysisPanelProps) {
  const d = node?.data as SpikeNodeData | undefined;
  const analysis = d?.analysis;
  const variant = d?.variant;
  const meta = variant ? VARIANT_META[variant] : null;

  if (!node || !d || !analysis) return <EmptyPanel />;

  const isBlueprint = variant === 'spike';

  return (
    <div style={{
      width: '360px',
      height: '100%',
      borderLeft: '1px solid rgba(255,255,255,0.05)',
      background: '#060a12',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Accent line */}
      {meta && (
        <div style={{
          height: '2px',
          background: `linear-gradient(to right, ${meta.accent}bb, transparent 65%)`,
          flexShrink: 0,
          transition: 'background 0.3s ease',
        }} />
      )}

      {isBlueprint ? (
        <BlueprintPanel d={d} accent={meta?.accent ?? '#fbbf24'} />
      ) : (
        <div
          key={node.id}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '26px 26px 40px',
            animation: 'panelFadeUp 0.28s cubic-bezier(0.22,1,0.36,1) forwards',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.06) transparent',
          }}
        >
          {/* Badge */}
          {meta && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '4px 10px 4px 8px',
              borderRadius: '4px',
              background: meta.dim,
              border: `1px solid ${meta.accent}1a`,
              marginBottom: '18px',
            }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: meta.accent, flexShrink: 0 }} />
              <span style={{
                fontSize: '9px',
                color: meta.accent,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-geist-mono)',
              }}>
                {meta.label}
              </span>
            </div>
          )}

          {/* Positioning */}
          {analysis.positioning && (
            <p style={{
              fontSize: '12px',
              color: meta?.accent ?? 'rgba(255,255,255,0.4)',
              fontStyle: 'italic',
              marginBottom: '10px',
              opacity: 0.75,
              lineHeight: 1.55,
            }}>
              {analysis.positioning}
            </p>
          )}

          {/* Title */}
          <h2 style={{
            fontSize: '15.5px',
            color: 'rgba(255,255,255,0.86)',
            fontWeight: '500',
            letterSpacing: '-0.015em',
            lineHeight: 1.35,
            marginBottom: '16px',
          }}>
            {analysis.title}
          </h2>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '18px' }} />

          {/* Description */}
          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.38)',
            lineHeight: 1.78,
            marginBottom: analysis.advisorNote ? '20px' : '26px',
          }}>
            {analysis.description}
          </p>

          {/* Your Positioning (advisor note) */}
          {analysis.advisorNote && (
            <div style={{ marginBottom: '26px' }}>
              <SectionLabel>Your Positioning</SectionLabel>
              <div style={{
                padding: '13px 15px',
                borderLeft: `2px solid ${meta?.accent ?? '#fbbf24'}40`,
                background: `${meta?.accent ?? '#fbbf24'}05`,
                borderRadius: '0 6px 6px 0',
              }}>
                <p style={{
                  fontSize: '12.5px',
                  color: 'rgba(255,255,255,0.46)',
                  lineHeight: 1.72,
                  fontStyle: 'italic',
                }}>
                  {analysis.advisorNote}
                </p>
              </div>
            </div>
          )}

          {/* Your Focus (themes) */}
          {analysis.themes && analysis.themes.length > 0 && (
            <div style={{ marginBottom: '26px' }}>
              <SectionLabel>Your Focus</SectionLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {analysis.themes.map((t) => (
                  <span key={t} style={{
                    fontSize: '11px',
                    color: meta?.accent ? `${meta.accent}99` : 'rgba(255,255,255,0.35)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    background: meta?.dim ?? 'rgba(255,255,255,0.03)',
                    border: `1px solid ${meta?.accent ?? 'rgba(255,255,255,0.08)'}18`,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Your Direction */}
          {analysis.direction && analysis.direction.length > 0 && (
            <div>
              <SectionLabel>Your Direction</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {analysis.direction.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: '9px',
                      color: meta?.accent ? `${meta.accent}40` : 'rgba(255,255,255,0.2)',
                      fontFamily: 'var(--font-geist-mono)',
                      marginTop: '2px',
                      flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontSize: '12.5px',
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.65,
                    }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{
        padding: '10px 26px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Ivy Brothers · Confidential
        </span>
        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-geist-mono)' }}>
          #2025-001
        </span>
      </div>
    </div>
  );
}
