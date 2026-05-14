'use client'

import { useEffect } from 'react'
import { SignInButton, SignUpButton } from '@clerk/nextjs'

// ── Video asset — swap this path to change the background ────────────────────
const HERO_VIDEO_SRC =
  'https://hdogyhzlenfqvwut.public.blob.vercel-storage.com/kling_20260325_%E4%BD%9C%E5%93%81_I_want_to__4448_0.mp4'

// ── Scroll-reveal hook ───────────────────────────────────────────────────────
function useScrollReveal(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector])
}

// ── Icons ────────────────────────────────────────────────────────────────────
function IconQuill() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4C16 4 8 8 6 20" />
      <path d="M6 20c1.5-2 3.5-3.5 6-4" />
      <path d="M6 20l-2 2" />
      <path d="M20 4c-2 4-5 7-9 9" />
    </svg>
  )
}

function IconWave() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c1.5-3 3-4.5 4.5-4.5S9 9 10.5 9 13.5 6 15 6s3 3 4.5 3S22 7.5 22 7.5" />
      <path d="M2 17c1.5-3 3-4.5 4.5-4.5S9 14 10.5 14 13.5 11 15 11s3 3 4.5 3S22 12.5 22 12.5" />
    </svg>
  )
}

function IconHands() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
    </svg>
  )
}

// ── Feature card data ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <IconQuill />,
    title: 'Journal freely',
    desc: 'Privately write what\'s on your mind — no judgment, no audience. Just you and your thoughts on the page.',
    delay: '',
    accent: 'rgba(167,139,250,0.08)',
  },
  {
    icon: <IconWave />,
    title: 'Track your emotions',
    desc: 'Notice patterns in how you feel over time. Gently, at your own pace, in a way that feels like self-care.',
    delay: 'delay-100',
    accent: 'rgba(196,181,253,0.07)',
  },
  {
    icon: <IconHands />,
    title: 'Find support',
    desc: 'Feel connected through a gentle, support-oriented space that meets you exactly where you are.',
    delay: 'delay-200',
    accent: 'rgba(244,168,208,0.07)',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────
export default function QuietMindPage() {
  useScrollReveal('.scroll-reveal')

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0d0b12]">

      {/* ────────────────────────────── Hero ──────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex flex-col">

        {/* Video background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
            src={HERO_VIDEO_SRC}
          />
          {/* Primary gradient: soft top + heavier bottom for text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-transparent via-40% to-black/62" />
          {/* Radial side vignette */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.22) 100%)' }} />
        </div>

        {/* ── Floating glass nav ── */}
        <div className="relative z-10 px-6 md:px-10 pt-6">
          <nav className="flex items-center justify-between">
            <span
              className="text-white/88 text-lg tracking-[0.22em] uppercase select-none"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
            >
              QuietMind
            </span>

            <div className="flex items-center gap-3">
              <SignInButton>
                <button className="text-white/55 text-sm tracking-wide hover:text-white/85 transition-colors duration-300 px-3 py-1.5 cursor-pointer">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="glass-btn-ghost rounded-full px-5 py-2 text-white/80 text-sm tracking-wide cursor-pointer">
                  Get started
                </button>
              </SignUpButton>
            </div>
          </nav>
        </div>

        {/* ── Hero content ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pb-16">

          {/* Eyebrow */}
          <p
            className="anim-fade-in text-white/48 text-xs tracking-[0.42em] uppercase mb-7"
          >
            A gentle space for your mind
          </p>

          {/* Headline — clean, no glass box */}
          <h1
            className="anim-fade-in-up anim-delay-200 text-white font-light leading-[1.07] mb-6"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              textShadow: '0 2px 32px rgba(0,0,0,0.25)',
            }}
          >
            Find clarity<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>in a noisy world</em>
          </h1>

          {/* Subheadline */}
          <p
            className="anim-fade-in-up anim-delay-350 text-white/60 font-light leading-relaxed mb-11 max-w-sm md:max-w-md"
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              textShadow: '0 1px 12px rgba(0,0,0,0.3)',
            }}
          >
            A gentle place to journal your thoughts,<br className="hidden md:block" />
            process your feelings, and feel a little less alone.
          </p>

          {/* CTA buttons — liquid glass */}
          <div className="anim-fade-in-up anim-delay-500 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="glass-btn-primary rounded-full px-8 py-3.5 text-white text-sm tracking-wider cursor-pointer">
              Start Journaling
            </button>
            <button className="glass-btn-ghost rounded-full px-8 py-3.5 text-white/80 text-sm tracking-wider cursor-pointer">
              Find Support
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 flex justify-center pb-8">
          <div className="scroll-indicator w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ─────────────────────────── Features ────────────────────────────── */}
      <section
        className="relative py-28 md:py-36 px-6"
        style={{ background: 'linear-gradient(180deg, #16101f 0%, #1a1128 40%, #1e1530 100%)' }}
      >
        {/* Ambient glow orbs */}
        <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.09), transparent)' }} />
        <div className="absolute bottom-8 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(244,168,208,0.07), transparent)' }} />

        <div className="relative max-w-5xl mx-auto">

          {/* Section header */}
          <div className="scroll-reveal text-center mb-16">
            <p className="text-purple-300/45 text-xs tracking-[0.4em] uppercase mb-4">
              What QuietMind offers
            </p>
            <h2
              className="text-white/82 font-light"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              }}
            >
              Everything you need to feel heard
            </h2>
          </div>

          {/* Glass cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {FEATURES.map(({ icon, title, desc, delay, accent }) => (
              <div
                key={title}
                className={`scroll-reveal ${delay} glass-card group relative rounded-2xl p-8 md:p-9 flex flex-col gap-5 cursor-default`}
              >
                {/* Per-card hover accent glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${accent}, transparent 65%)` }}
                />

                {/* Icon in a small glass pill */}
                <div className="glass-icon-wrap relative w-11 h-11 rounded-xl flex items-center justify-center text-purple-300/65 group-hover:text-purple-200/85 transition-colors duration-400">
                  {icon}
                </div>

                {/* Text */}
                <div className="relative flex flex-col gap-2.5">
                  <h3
                    className="text-white/82 font-light"
                    style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.45rem' }}
                  >
                    {title}
                  </h3>
                  <p className="text-white/42 text-sm leading-relaxed font-light">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────── Final CTA ──────────────────────────── */}
      <section
        className="relative py-32 md:py-44 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a1228 0%, #261640 30%, #2d1a45 55%, #1a1228 100%)' }}
      >
        {/* Central glow bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 52%, rgba(167,139,250,0.12), rgba(240,171,252,0.06), transparent)',
          }}
        />

        {/* Hairline top separator */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(196,181,253,0.18), transparent)' }}
        />

        <div className="relative scroll-reveal max-w-xl mx-auto flex flex-col items-center gap-8">
          <p className="text-purple-300/38 text-xs tracking-[0.42em] uppercase">
            You are not alone
          </p>

          <h2
            className="text-white/78 font-light leading-[1.18]"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 6vw, 3.75rem)',
            }}
          >
            You don&apos;t have to hold<br />
            <em style={{ fontStyle: 'italic' }}>everything alone.</em>
          </h2>

          <p className="text-white/38 text-sm leading-relaxed font-light max-w-xs">
            QuietMind is always here — open, unhurried, and ready whenever you need a quiet moment.
          </p>

          {/* Purple glass CTA */}
          <button className="glass-btn-cta mt-2 rounded-full px-10 py-4 text-sm tracking-widest text-white/88 cursor-pointer">
            Enter QuietMind
          </button>
        </div>

        {/* Footer */}
        <div className="relative mt-20 md:mt-28 flex flex-col items-center gap-3">
          <span
            className="text-white/18 text-xs tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            QuietMind
          </span>
          <p className="text-white/14 text-xs">
            © {new Date().getFullYear()} · Made with care
          </p>
        </div>
      </section>

    </main>
  )
}
