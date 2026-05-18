'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AnalysisResult {
  riskLevel: 'low' | 'moderate' | 'high'
  riskScore: number
  reasons: string[]
  summary: string
}

const LEVEL_STYLES: Record<AnalysisResult['riskLevel'], { label: string; bg: string; bar: string; text: string }> = {
  low:      { label: 'Low risk',      bg: 'bg-emerald-50 border-emerald-200',  bar: 'bg-emerald-500', text: 'text-emerald-700' },
  moderate: { label: 'Moderate risk', bg: 'bg-amber-50 border-amber-200',      bar: 'bg-amber-500',   text: 'text-amber-700'   },
  high:     { label: 'High risk',     bg: 'bg-red-50 border-red-200',          bar: 'bg-red-500',     text: 'text-red-700'     },
}

export default function AnalyzePage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      setResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charCount = text.length
  const canSubmit = charCount >= 20 && !loading

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span className="font-semibold text-slate-900">MindMarker</span>
        </Link>
        <Link href="/dashboard" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
          ← Back to dashboard
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Run a new analysis</h1>
          <p className="text-slate-500">
            Paste a writing sample (a journal entry, email, story, etc.) to receive a
            cognitive language risk report. Educational use only — not a clinical diagnosis.
          </p>
        </header>

        {/* Input */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
          <label htmlFor="sample" className="block text-sm font-medium text-slate-700 mb-2">
            Text sample
          </label>
          <textarea
            id="sample"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste at least 20 characters of writing here..."
            rows={10}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-400">
              {wordCount} word{wordCount === 1 ? '' : 's'} · {charCount} character{charCount === 1 ? '' : 's'}
            </span>
            <button
              onClick={handleAnalyze}
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing…' : 'Analyze →'}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
            <p className="text-sm font-semibold text-red-800 mb-1">Something went wrong</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <section className={`rounded-2xl border p-6 ${LEVEL_STYLES[result.riskLevel].bg}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${LEVEL_STYLES[result.riskLevel].text}`}>
                {LEVEL_STYLES[result.riskLevel].label}
              </h2>
              <span className={`text-3xl font-bold ${LEVEL_STYLES[result.riskLevel].text}`}>
                {result.riskScore}
                <span className="text-base font-normal opacity-60">/100</span>
              </span>
            </div>

            <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden mb-5">
              <div
                className={`h-full ${LEVEL_STYLES[result.riskLevel].bar} transition-all duration-500`}
                style={{ width: `${Math.min(Math.max(result.riskScore, 0), 100)}%` }}
              />
            </div>

            <p className="text-slate-800 mb-5 leading-relaxed">{result.summary}</p>

            {result.reasons.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Observations</h3>
                <ul className="space-y-2">
                  {result.reasons.map((reason, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700 leading-relaxed">
                      <span className="text-slate-400 select-none">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="text-xs text-slate-500 mt-6 italic">
              This tool is educational. Risk signals here are not a clinical diagnosis. If you
              have concerns about cognitive change in yourself or a loved one, speak with a
              qualified healthcare provider.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}
