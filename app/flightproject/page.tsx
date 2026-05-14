'use client'
import { useEffect, useRef, useState } from 'react'

function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(22px)',
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Eyebrow label with gold rule ─────────────────────────────────────────────
function Eyebrow({ label, center = false }: { label: string; center?: boolean }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: center ? 'center' : 'flex-start',
      gap: '14px',
      marginBottom: '20px',
    }}>
      <div style={{ width: '28px', height: '1px', background: '#C9A84C', opacity: 0.55, flexShrink: 0 }} />
      <span style={{
        fontSize: '9.5px', color: '#C9A84C', letterSpacing: '0.24em',
        textTransform: 'uppercase', fontWeight: '600',
      }}>
        {label}
      </span>
      {center && <div style={{ width: '28px', height: '1px', background: '#C9A84C', opacity: 0.55, flexShrink: 0 }} />}
    </div>
  )
}

export default function FlightProject() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const gold       = '#C9A84C'
  const goldSubtle = 'rgba(201,168,76,0.07)'
  const goldBorder = 'rgba(201,168,76,0.2)'
  const text       = '#EEF0F5'
  const textMuted  = 'rgba(238,240,245,0.5)'
  const textDim    = 'rgba(238,240,245,0.22)'
  const border     = 'rgba(255,255,255,0.08)'
  const surface    = '#0B0E1A'
  const bg         = '#07080F'
  const navy       = '#1B3A8A'

  return (
    <div style={{ background: bg, color: text, fontFamily: '"Inter", -apple-system, "Helvetica Neue", sans-serif', overflowX: 'hidden' }}>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(201,168,76,0.22); }
        html { scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulseRing {
          0%   { transform: translate(-50%,-50%) scale(0.96); opacity: 0.22; }
          50%  { transform: translate(-50%,-50%) scale(1.04); opacity: 0.08; }
          100% { transform: translate(-50%,-50%) scale(0.96); opacity: 0.22; }
        }
        @keyframes planeDrift {
          0%   { transform: translate(0, 0) rotate(-6deg); }
          50%  { transform: translate(-8px, 4px) rotate(-6deg); }
          100% { transform: translate(0, 0) rotate(-6deg); }
        }

        .act-nav-link {
          font-size: 11.5px; color: rgba(238,240,245,0.4); text-decoration: none;
          letter-spacing: 0.1em; text-transform: uppercase;
          transition: color 0.15s ease;
        }
        .act-nav-link:hover { color: rgba(238,240,245,0.78); }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 36px;
          background: #C9A84C; color: #050609;
          border: none; border-radius: 2px;
          font-size: 11.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s ease; text-decoration: none;
          font-family: inherit;
        }
        .btn-primary:hover {
          background: #D4B56A; transform: translateY(-1px);
          box-shadow: 0 10px 36px rgba(201,168,76,0.18);
        }

        .btn-ghost-gold {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px;
          background: transparent; color: #C9A84C;
          border: 1px solid rgba(201,168,76,0.2); border-radius: 2px;
          font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s ease; text-decoration: none;
          white-space: nowrap; font-family: inherit;
        }
        .btn-ghost-gold:hover {
          background: rgba(201,168,76,0.07); border-color: rgba(201,168,76,0.36);
        }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 36px;
          background: transparent; color: rgba(238,240,245,0.5);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 2px;
          font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s ease; text-decoration: none;
          font-family: inherit;
        }
        .btn-ghost:hover {
          border-color: rgba(255,255,255,0.2); color: rgba(238,240,245,0.82);
        }

        /* Service blocks — ruled list */
        .svc-block {
          padding: 42px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: flex-start; gap: 52px;
          transition: background 0.2s ease;
        }
        .svc-block:first-of-type { border-top: 1px solid rgba(255,255,255,0.08); }
        .svc-block:hover { background: rgba(255,255,255,0.015); }

        /* Testimonial blocks */
        .testi-short {
          border-left: 2px solid rgba(201,168,76,0.18);
          padding: 0 0 0 28px; flex: 1;
        }
        .testi-medium {
          border-left: 2px solid rgba(201,168,76,0.28);
          padding: 2px 0 2px 32px; flex: 1;
        }
        .testi-medium.featured { border-left-color: #C9A84C; }

        /* Fail-mode items */
        .fail-item {
          padding: 28px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex; gap: 28px; align-items: flex-start;
        }
        .fail-item:first-of-type { border-top: 1px solid rgba(255,255,255,0.07); }

        /* Not-for items */
        .notfor-item {
          padding: 22px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; gap: 20px; align-items: flex-start;
          font-size: 15px; color: rgba(238,240,245,0.62); line-height: 1.7;
          letter-spacing: -0.01em;
        }

        @media (max-width: 960px) {
          .hero-grid     { flex-direction: column !important; }
          .hero-visual   { display: none !important; }
          .nav-links     { display: none !important; }
          .two-col       { flex-direction: column !important; gap: 48px !important; }
          .svc-block     { flex-direction: column !important; gap: 16px !important; }
          .process-row   { flex-direction: column !important; gap: 48px !important; }
          .cred-grid     { grid-template-columns: repeat(2, 1fr) !important; }
          .testi-row     { flex-direction: column !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 56px',
        background: scrolled ? 'rgba(7,8,15,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px)' : 'none',
        borderBottom: scrolled ? `1px solid ${border}` : '1px solid transparent',
        transition: 'all 0.45s ease',
      }}>
        {/* Wordmark */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ fontSize: '15px', fontWeight: '700', color: text, letterSpacing: '0.04em' }}>
            ACT Aviation
          </div>
          <div style={{ fontSize: '9px', color: textDim, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Consulting & Training
          </div>
        </a>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '38px' }}>
          <a href="#why-fail"   className="act-nav-link">Why Candidates Fail</a>
          <a href="#services"   className="act-nav-link">Services</a>
          <a href="#process"    className="act-nav-link">Process</a>
          <a href="#book" className="btn-ghost-gold">Enquire →</a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* ── Full-bleed photo ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sia-planes.jpg"
          alt="Singapore Airlines aircraft on the tarmac"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 55%',
            pointerEvents: 'none',
          }}
        />

        {/* ── Base dark fill ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'rgba(7,8,15,0.72)',
        }} />

        {/* ── Layered overlay — dark at top for nav, very dark at bottom for copy ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            linear-gradient(
              to bottom,
              rgba(7,8,15,0.55) 0%,
              rgba(7,8,15,0.2) 30%,
              rgba(7,8,15,0.65) 60%,
              rgba(7,8,15,0.97) 100%
            )
          `,
        }} />

        {/* ── Left-side depth gradient so copy always readable ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `linear-gradient(to right, rgba(7,8,15,0.75) 0%, rgba(7,8,15,0.2) 60%, transparent 100%)`,
        }} />

        {/* ── Copy — sits at the bottom of the viewport ── */}
        <div style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 56px 80px',
        }}>
          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px',
            animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both',
          }}>
            <div style={{ width: '28px', height: '1px', background: gold, opacity: 0.65 }} />
            <span style={{ fontSize: '9.5px', color: gold, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: '600' }}>
              For Serious Airline Candidates Only
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 4.8vw, 68px)',
            fontWeight: '700', letterSpacing: '-0.042em', lineHeight: 1.04,
            color: text, marginBottom: '28px', maxWidth: '780px',
            animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both',
            textShadow: '0 2px 32px rgba(0,0,0,0.5)',
          }}>
            The candidates who passed your assessment
            weren&apos;t smarter than you.{' '}
            <em style={{ color: gold, fontStyle: 'italic', fontWeight: '400' }}>
              They just knew what you didn&apos;t.
            </em>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: '16.5px', color: 'rgba(238,240,245,0.72)', lineHeight: 1.8,
            letterSpacing: '-0.01em', marginBottom: '48px', maxWidth: '560px',
            animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s both',
            textShadow: '0 1px 16px rgba(0,0,0,0.4)',
          }}>
            SIA, Cathay, and Emirates don&apos;t select the most talented pilots in the room. They select the candidates who understand exactly what they&apos;re being assessed on — and prepared accordingly. We are the only coaching programme run by the pilots and ATC professionals who built those assessments.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '14px',
            animation: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.32s both',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#book" className="btn-primary">Request Your Strategy Call</a>
              <a href="#why-fail" className="btn-ghost">See Why Candidates Fail</a>
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(238,240,245,0.28)', letterSpacing: '0.04em' }}>
              We review all enquiries. Not every application is accepted.
            </p>
          </div>
        </div>

        {/* ── Floating stats bar — pinned to bottom edge of hero ── */}
        <div style={{
          position: 'relative', zIndex: 2,
          background: 'rgba(7,8,15,0.82)', backdropFilter: 'blur(28px)',
          borderTop: `1px solid rgba(255,255,255,0.08)`,
          width: '100%',
        }}>
          <div style={{
            maxWidth: '1280px', margin: '0 auto', padding: '0 56px',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          }}>
            {[
              { value: '147',           label: 'Cadets Placed' },
              { value: '94%',           label: 'First-Attempt Pass Rate', hi: true },
              { value: 'SIA · Cathay · Emirates', label: 'Airlines We Prepare For' },
              { value: 'Active 737 & A320',        label: 'Type-Rated Instructors' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '22px 16px',
                textAlign: 'center',
                borderRight: i < 3 ? `1px solid rgba(255,255,255,0.08)` : 'none',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '6px',
              }}>
                <div style={{
                  fontSize: 'clamp(14px, 1.5vw, 20px)', fontWeight: '700',
                  color: s.hi ? gold : text, letterSpacing: '-0.03em', lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '9px', color: 'rgba(238,240,245,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          OUR PILOTS
      ═══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '72px 56px 48px',
        borderTop: `1px solid ${border}`,
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal>
            <Eyebrow label="Our Pilots" center />
            <h2 style={{
              fontSize: 'clamp(22px, 2.8vw, 36px)',
              fontWeight: '700', letterSpacing: '-0.032em', lineHeight: 1.15,
              color: text, textAlign: 'center', marginBottom: '12px',
            }}>
              Our pilots teach from experience.
            </h2>
            <p style={{
              fontSize: '15px', color: textDim, lineHeight: 1.75,
              letterSpacing: '-0.01em', textAlign: 'center',
              maxWidth: '560px', margin: '0 auto 40px',
            }}>
              Every session is led by pilots and ATC professionals who know exactly what airlines look for, and what gets candidates eliminated.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap',
            }}>
              {[
                { name: 'Capt. Royce', role: 'Boeing 737', sub: 'SIA Selection Panel' },
                { name: 'Coming Soon', role: 'A320 Type-Rated', sub: 'ATC Licensed' },
                { name: 'Coming Soon', role: 'A320 Type-Rated', sub: 'Emirates' },
              ].map((pilot, i) => (
                <div key={i} style={{ width: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Headshot frame */}
                  <div style={{
                    width: '160px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '14px',
                  }}>
                    {/* Corner brackets */}
                    {([['top','left'],['top','right'],['bottom','left'],['bottom','right']] as const).map(([v, h], j) => (
                      <div key={j} style={{
                        position: 'absolute',
                        [v]: 10, [h]: 10,
                        width: 14, height: 14,
                        borderTop: v === 'top' ? `1px solid rgba(201,168,76,0.3)` : undefined,
                        borderBottom: v === 'bottom' ? `1px solid rgba(201,168,76,0.3)` : undefined,
                        borderLeft: h === 'left' ? `1px solid rgba(201,168,76,0.3)` : undefined,
                        borderRight: h === 'right' ? `1px solid rgba(201,168,76,0.3)` : undefined,
                      }} />
                    ))}
                    <span style={{ fontSize: '9px', color: textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      Photo
                    </span>
                  </div>
                  {/* Name */}
                  <div style={{ fontSize: '13.5px', fontWeight: '600', color: text, letterSpacing: '-0.015em', marginBottom: '4px', textAlign: 'center' }}>
                    {pilot.name}
                  </div>
                  {/* Role */}
                  <div style={{ fontSize: '10.5px', color: gold, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px', textAlign: 'center' }}>
                    {pilot.role}
                  </div>
                  <div style={{ fontSize: '10px', color: textDim, letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center' }}>
                    {pilot.sub}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHY CANDIDATES FAIL
      ═══════════════════════════════════════════════════════════ */}
      <section id="why-fail" style={{ padding: '64px 56px 128px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* ── Two-column: photo left, content right ── */}
          <div className="two-col" style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>

            {/* Left: sticky portrait */}
            <Reveal style={{ flex: '0 0 340px', position: 'sticky', top: '100px' }}>
              <div style={{ position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pilot-portrait.jpg"
                  alt="Active airline captain"
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
                {/* Caption below image */}
                <div style={{ padding: '16px 0 0' }}>
                  <div style={{ fontSize: '11px', color: gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>
                    Active Captain
                  </div>
                  <div style={{ fontSize: '12px', color: textMuted, letterSpacing: '0.04em' }}>
                    Emirates · 737 & A320 Type-Rated
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Reveal>
                <Eyebrow label="Why Candidates Fail" />
                <h2 style={{
                  fontSize: 'clamp(28px, 3.2vw, 44px)',
                  fontWeight: '700', letterSpacing: '-0.038em', lineHeight: 1.08,
                  color: text, marginBottom: '16px',
                }}>
                  Most candidates don&apos;t fail because they&apos;re unqualified.
                </h2>
                <p style={{
                  fontSize: 'clamp(18px, 2vw, 24px)',
                  fontWeight: '400', fontStyle: 'italic',
                  color: textMuted, letterSpacing: '-0.02em', lineHeight: 1.3,
                  marginBottom: '48px',
                }}>
                  They fail because the assessment measures things no one told them about.
                </p>
                <p style={{ fontSize: '15px', color: textMuted, lineHeight: 1.8, letterSpacing: '-0.01em', marginBottom: '48px' }}>
                  The debrief never gives you the real reason. Here is what actually ends most applications — and why candidates who prepare with the right people don&apos;t make these mistakes.
                </p>
              </Reveal>

              {[
                {
                  num: '01',
                  label: 'They optimised for the wrong signals.',
                  body: 'Candidates prepare for technical questions. Assessors are watching crew resource management, psychological composure, and communication register. Technical knowledge is table stakes. It is not what separates.',
                },
                {
                  num: '02',
                  label: 'They practised with people who\'ve never been in the room.',
                  body: 'Flight school instructors, YouTube channels, and study groups can teach procedures. None of them can tell you what a Cathay assessor looks for in the first four minutes of a panel interview — because they\'ve never been one.',
                },
                {
                  num: '03',
                  label: 'They didn\'t know where the simulator traps were.',
                  body: 'Airline sim checks contain deliberate fail triggers — scenarios designed to test decision-making under ambiguity. If no one has briefed you on what they are, you will almost certainly walk into them.',
                },
                {
                  num: '04',
                  label: 'Their ATC communication gave them away.',
                  body: 'Weak phraseology, hesitation on readback, and non-standard responses in a sim assessment signal one thing to a check captain: this candidate is not airline-ready. It takes minutes to identify and months to correct without proper instruction.',
                },
                {
                  num: '05',
                  label: 'They went in without knowing what "good" looks like from the other side.',
                  body: 'Every assessor has evaluated thousands of candidates. They know within the first sixty seconds whether a candidate understands the environment they\'re entering. That read is almost never wrong.',
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="fail-item">
                    <div style={{
                      fontSize: '10px', color: gold, fontWeight: '700',
                      letterSpacing: '0.12em', marginTop: '4px', flexShrink: 0, opacity: 0.65,
                      width: '28px',
                    }}>
                      {item.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '16px', fontWeight: '600', color: text,
                        letterSpacing: '-0.022em', marginBottom: '10px', lineHeight: 1.3,
                      }}>
                        {item.label}
                      </div>
                      <p style={{ fontSize: '14.5px', color: textMuted, lineHeight: 1.75, letterSpacing: '-0.008em' }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={300}>
                <p style={{
                  marginTop: '40px', fontSize: '14.5px', color: textDim,
                  letterSpacing: '0.02em', fontStyle: 'italic',
                }}>
                  None of these failures are about raw ability. All of them are preventable. That is what we do.
                </p>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LONG TESTIMONIAL — repeat after Why Candidates Fail
      ═══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '112px 56px',
        borderTop: `1px solid ${border}`,
        background: surface,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 50% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)`,
        }} />
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative' }}>
          <Reveal>
            <Eyebrow label="In Their Words" center />

            <div style={{
              fontSize: '120px', color: gold, lineHeight: 1,
              textAlign: 'center', marginBottom: '8px', opacity: 0.2,
              fontFamily: 'Georgia, serif',
            }}>
              &ldquo;
            </div>

            <blockquote style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'rgba(238,240,245,0.8)',
              lineHeight: 1.85,
              letterSpacing: '-0.012em',
              fontStyle: 'italic',
              textAlign: 'center',
              marginBottom: '48px',
            }}>
              Royce and the team at Flight Experience, I just want to say a huge thank you for all your guidance and support throughout my sim prep. Your insights and coaching not only helped me refine my skills but also gave me the final bit of confidence I needed to pass the Cathay Pacific sim check. I truly appreciate the time and effort you put into helping me nail the sim on that day. Flight Experience was an invaluable part of my journey to securing an airline job. I would recommend this place not just to people looking to come to Flight Experience for a joy flight, but also serious professional pilots looking to refine their skills.
            </blockquote>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '40px', height: '1px', background: gold, opacity: 0.4 }} />
              <div style={{ fontSize: '13.5px', fontWeight: '600', color: text, letterSpacing: '-0.01em' }}>Mr A.</div>
              <div style={{ fontSize: '10px', color: textDim, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Cathay Pacific Sim Assessment · March 2025
              </div>
            </div>

            <p style={{
              marginTop: '36px', fontSize: '12.5px', color: textDim,
              textAlign: 'center', fontStyle: 'italic', letterSpacing: '0.02em',
            }}>
              Mr A. approached ACT Aviation in the final weeks before his Cathay Pacific simulator check. He passed on his first attempt.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SHORT TESTIMONIALS — Layer 1
      ═══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '80px 56px',
        borderTop: `1px solid ${border}`,
        background: surface,
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal>
            <Eyebrow label="Results" />
          </Reveal>
          <div className="testi-row" style={{ display: 'flex', gap: '56px', marginTop: '8px' }}>
            {[
              {
                quote: 'Passed my SIA first-stage interview first attempt. The panel debrief framework they gave me was unlike anything I\'d found on my own.',
                name: 'J.T.', role: 'SIA Cadet · 2024',
              },
              {
                quote: 'Failed my first Cathay sim check before coming here. Passed the second. The briefing on where the traps were made the difference.',
                name: 'D.L.', role: 'Cathay Pacific · 2023',
              },
              {
                quote: 'The ATC module alone was worth it. My examiner specifically noted my phraseology. That doesn\'t happen by accident.',
                name: 'R.M.', role: 'CAAS ATC Trainee · 2024',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 70} style={{ flex: 1, display: 'flex' }}>
                <div className="testi-short">
                  <p style={{ fontSize: '15px', color: 'rgba(238,240,245,0.72)', lineHeight: 1.72, letterSpacing: '-0.01em', marginBottom: '22px', fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: text, marginBottom: '3px', letterSpacing: '-0.01em' }}>{t.name}</div>
                  <div style={{ fontSize: '10px', color: textDim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════ */}
      <section id="process" style={{ padding: '120px 56px', borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal>
            <Eyebrow label="How It Works" center />
            <h2 style={{
              fontSize: 'clamp(28px, 3.6vw, 48px)',
              fontWeight: '700', letterSpacing: '-0.038em', lineHeight: 1.1,
              color: text, textAlign: 'center', marginBottom: '64px',
            }}>
              From first call to fully prepared.
            </h2>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              {
                num: '01',
                title: 'Strategy Call',
                body: 'We review your logbook, medical status, and career goals. You leave knowing exactly where you stand and what it will take to get there.',
              },
              {
                num: '02',
                title: 'Bespoke Preparation Plan',
                body: 'No templates. Your training plan is built around your gaps, your timeline, and the specific airline you are targeting — down to their simulator profiles and interview patterns.',
              },
              {
                num: '03',
                title: 'Execute and Pass',
                body: 'You train with captains who have sat in your examiner\'s seat. We prepare you for the test, the sim, and the interview — then we see you through to the offer.',
              },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{
                  display: 'flex', gap: '40px', alignItems: 'flex-start',
                  padding: '40px 0',
                  borderBottom: i < 2 ? `1px solid ${border}` : 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '13px', color: gold,
                    letterSpacing: '0.12em', paddingTop: '4px',
                    minWidth: '28px',
                  }}>{step.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '20px', fontWeight: '600',
                      color: text, letterSpacing: '-0.025em',
                      marginBottom: '10px',
                    }}>{step.title}</div>
                    <p style={{
                      fontSize: '15px', color: textDim,
                      lineHeight: 1.75, letterSpacing: '-0.01em',
                      margin: 0, maxWidth: '560px',
                    }}>{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280}>
            <div style={{ textAlign: 'center', marginTop: '56px' }}>
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  padding: '16px 36px',
                  background: gold,
                  color: bg,
                  fontSize: '14px',
                  fontWeight: '700',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.85'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                Find Out Where You Stand
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE UNFAIR ADVANTAGE
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '128px 56px', borderTop: `1px solid ${border}` }}>
        <div className="two-col" style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '96px', alignItems: 'flex-start' }}>

          <Reveal style={{ flex: '1.2 1 0' }}>
            <Eyebrow label="The Unfair Advantage" />
            <h2 style={{
              fontSize: 'clamp(28px, 3.6vw, 48px)',
              fontWeight: '700', letterSpacing: '-0.038em', lineHeight: 1.1, color: text, marginBottom: '12px',
            }}>
              Other preparation courses teach you what&apos;s in the manual.
            </h2>
            <h2 style={{
              fontSize: 'clamp(28px, 3.6vw, 48px)',
              fontWeight: '400', fontStyle: 'italic', letterSpacing: '-0.038em',
              lineHeight: 1.1, color: textMuted,
            }}>
              We teach you what&apos;s not written down anywhere.
            </h2>
          </Reveal>

          <Reveal delay={120} style={{ flex: '1 1 0', paddingTop: '8px' }}>
            <p style={{ fontSize: '15.5px', color: textMuted, lineHeight: 1.82, letterSpacing: '-0.01em', marginBottom: '40px' }}>
              ACT Aviation exists because the information gap between prepared and unprepared candidates is not about access to study materials. The gap is access to specific, undocumented knowledge held by the people who design and run selection processes — and who have guided candidates through them repeatedly.
            </p>
            <p style={{ fontSize: '15.5px', color: textMuted, lineHeight: 1.82, letterSpacing: '-0.01em', marginBottom: '40px' }}>
              Our instructors are not former pilots. They are active. They sit in the same seats as the captains who will assess you. They know what changed in the most recent selection cycle.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                'We have run SIA cadet selection panels — we know what the scoring rubrics reward',
                'ATC drills built from active frequency recordings, not textbook scenarios',
                'Sim briefings that map directly to examiner checkpoints and documented fail triggers',
                'Interview frameworks used at Type Rating instructor and check captain level',
              ].map((point, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '20px', alignItems: 'flex-start',
                  padding: '16px 0',
                  borderBottom: i < 3 ? `1px solid ${border}` : 'none',
                }}>
                  <span style={{ fontSize: '9.5px', color: gold, fontWeight: '700', letterSpacing: '0.1em', marginTop: '5px', flexShrink: 0, opacity: 0.65 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '14.5px', color: 'rgba(238,240,245,0.68)', lineHeight: 1.68, letterSpacing: '-0.01em' }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════════════ */}
      <section id="services" style={{ padding: '0 56px 128px', borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          <Reveal>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '72px 0 48px', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <Eyebrow label="What We Prepare You For" />
                <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', fontWeight: '700', letterSpacing: '-0.038em', color: text, lineHeight: 1.1 }}>
                  Every service. Built from the inside.
                </h2>
              </div>
              <span style={{ fontSize: '12px', color: textDim, letterSpacing: '0.05em' }}>From SGD 200 / hr</span>
            </div>
          </Reveal>

          {[
            {
              num: '01',
              label: 'Airline Selection — Full Preparation',
              tag: 'Most Requested',
              desc: 'You walk into your SIA, Cathay, or Emirates assessment knowing exactly what is being measured, how to present it, and where the traps are. Every stage: application, psychometric screening, group assessment, panel interview, and simulator check. Nothing is left to chance.',
              details: ['SIA · Cathay Pacific · Emirates · AirAsia', 'Application review & psychometric prep', 'Group assessment & panel interview simulation', 'Final sim briefing & debrief session'],
            },
            {
              num: '02',
              label: 'ATC Communication — Examiner-Level Standard',
              tag: null,
              desc: 'Most candidates underestimate how precisely radiotelephony is being evaluated. We train to examiner standard — using live frequency recordings, non-standard scenario drills, and real-time correction from a CAAS-licensed ATC instructor. You will not be the candidate whose phraseology ends their assessment.',
              details: ['Live frequency recording drills', 'Readback & non-standard situation handling', 'Real-time correction from licensed ATC instructor', 'ICAO phraseology to examiner standard'],
            },
            {
              num: '03',
              label: 'Simulator Check — Precision Preparation',
              tag: null,
              desc: 'We brief you on the specific scenario structure your examiner will use, the CRM behaviours they are scoring, and the exact decision-making traps built into the assessment. Candidates who train here arrive knowing what other candidates will only realise after they\'ve failed.',
              details: ['Type-specific scenario briefings', 'CRM and multi-crew exercises', 'Abnormal & emergency procedure review', 'Post-session debrief and improvement plan'],
            },
          ].map((svc, i) => (
            <Reveal key={i} delay={i * 55}>
              <div className="svc-block">
                <div style={{ width: '220px', flexShrink: 0 }}>
                  <div style={{ fontSize: '9.5px', color: gold, letterSpacing: '0.14em', fontWeight: '700', marginBottom: '14px', opacity: 0.65 }}>
                    {svc.num}
                  </div>
                  <div style={{ fontSize: '17.5px', fontWeight: '600', letterSpacing: '-0.025em', color: text, lineHeight: 1.28 }}>
                    {svc.label}
                  </div>
                  {svc.tag && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '3px 10px', marginTop: '12px',
                      background: goldSubtle, border: `1px solid ${goldBorder}`,
                      fontSize: '8.5px', color: gold, letterSpacing: '0.16em',
                      textTransform: 'uppercase', fontWeight: '600',
                    }}>
                      {svc.tag}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '15px', color: textMuted, lineHeight: 1.78, letterSpacing: '-0.008em' }}>
                    {svc.desc}
                  </p>
                </div>
                <div style={{ width: '210px', flexShrink: 0 }}>
                  {svc.details.map((d, j) => (
                    <div key={j} style={{
                      fontSize: '12px', color: textDim, lineHeight: 1.5,
                      padding: '5px 0',
                      borderBottom: j < svc.details.length - 1 ? `1px solid rgba(255,255,255,0.04)` : 'none',
                    }}>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MEDIUM TESTIMONIALS — Layer 2
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 56px', borderTop: `1px solid ${border}`, background: surface }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal>
            <Eyebrow label="Client Outcomes" />
          </Reveal>
          <div className="testi-row" style={{ display: 'flex', gap: '56px', marginTop: '12px' }}>
            {[
              {
                quote: 'I had done what I thought was thorough preparation — six months of study, mock interviews with friends, sim hours at another centre. I came to ACT two weeks before my Emirates assessment because I wanted a second opinion. Those two weeks changed everything. They identified three specific patterns in my CRM behaviour that would have failed me. I got the offer.',
                name: 'K.A.', role: 'Emirates Cadet · 2024',
                featured: true,
              },
              {
                quote: 'What ACT does that nothing else does is teach you how the assessment looks from the other side. My coach had run selection panels. He could tell me not just what to do, but why the assessors were watching for it and what it looked like when candidates got it wrong. I passed my SIA final selection on the first attempt after two previous failures at other airlines.',
                name: 'S.N.', role: 'SIA Cadet · 2025',
                featured: false,
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 80} style={{ flex: 1, display: 'flex' }}>
                <div className={`testi-medium${t.featured ? ' featured' : ''}`}>
                  <p style={{ fontSize: '16px', color: 'rgba(238,240,245,0.75)', lineHeight: 1.8, letterSpacing: '-0.01em', marginBottom: '32px', fontStyle: 'italic' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ fontSize: '13.5px', fontWeight: '600', color: text, marginBottom: '4px', letterSpacing: '-0.012em' }}>{t.name}</div>
                  <div style={{ fontSize: '10px', color: textDim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════ */}
      <section id="book" style={{
        padding: '128px 56px 148px',
        borderTop: `1px solid ${border}`,
        background: surface,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 55% 65% at 50% 55%, rgba(201,168,76,0.05) 0%, transparent 60%)`,
        }} />

        {/* Faint airplane watermark */}
        <div style={{
          position: 'absolute', right: '-80px', bottom: '-40px',
          pointerEvents: 'none', opacity: 0.03,
        }}>
          <svg viewBox="0 0 700 220" style={{ width: '560px' }} fill={text}>
            <path d="M670,104 C688,104 700,107 700,110 C700,113 688,116 670,116 L80,120 C52,120 28,117 10,110 C28,103 52,100 80,100 Z" />
            <path d="M670,104 L700,110 L670,116 Z" />
            <path d="M420,102 L270,178 L295,183 L448,112 Z" />
            <path d="M75,100 L90,52 L115,74 L115,100 Z" />
            <path d="M92,112 L28,132 L36,142 L98,120 Z" />
          </svg>
        </div>

        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '44px' }}>
              <div style={{ width: '28px', height: '1px', background: gold, opacity: 0.5 }} />
              <span style={{ fontSize: '9.5px', color: gold, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: '600' }}>
                12 Clients Per Month · Limited Intake
              </span>
              <div style={{ width: '28px', height: '1px', background: gold, opacity: 0.5 }} />
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 4.8vw, 58px)',
              fontWeight: '700', letterSpacing: '-0.042em', lineHeight: 1.07,
              color: text, marginBottom: '24px',
            }}>
              This assessment will either happen or it won&apos;t.
            </h2>

            <p style={{
              fontSize: '16.5px', color: textMuted, lineHeight: 1.78,
              letterSpacing: '-0.01em', marginBottom: '20px',
            }}>
              The preparation is the only variable you can control.
            </p>

            <p style={{
              fontSize: '15px', color: textDim, lineHeight: 1.75,
              letterSpacing: '-0.008em', marginBottom: '52px',
            }}>
              We take twelve clients per month. If your assessment is within the next six months, the time to act is now — not after you&apos;ve attempted it once and need to understand what went wrong.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '44px' }}>
              <a href="mailto:contact@actaviation.sg" className="btn-primary">Request Your Strategy Call</a>
              <a href="#services" className="btn-ghost">Review the Programme</a>
            </div>

            {/* Trust signals */}
            <div style={{
              display: 'flex', justifyContent: 'center',
              borderTop: `1px solid ${border}`, paddingTop: '28px',
              flexWrap: 'wrap',
            }}>
              {[
                'Active type-rated instructors on every programme',
                'Fully bespoke — no standard syllabuses',
                'Current availability: 4 spots',
              ].map((item, i, arr) => (
                <span key={i} style={{
                  fontSize: '11px', color: textDim, letterSpacing: '0.04em',
                  padding: '0 20px',
                  borderRight: i < arr.length - 1 ? `1px solid ${border}` : 'none',
                }}>
                  {item}
                </span>
              ))}
            </div>

            <p style={{
              marginTop: '24px', fontSize: '11px', color: textDim,
              fontStyle: 'italic', letterSpacing: '0.02em',
            }}>
              We review all enquiries before confirming sessions. Not every application is accepted.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════ */}
      <footer style={{
        padding: '28px 56px',
        borderTop: `1px solid ${border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '2px', height: '20px', background: gold, borderRadius: '1px', opacity: 0.45 }} />
          <span style={{ fontSize: '12px', color: textDim, letterSpacing: '0.04em' }}>
            ACT Aviation Consulting & Training Pte Ltd · Singapore
          </span>
        </div>
        <span style={{ fontSize: '11px', color: textDim, letterSpacing: '0.03em' }}>
          © {new Date().getFullYear()} A.C.T. Aviation. All rights reserved.
        </span>
      </footer>

    </div>
  )
}
