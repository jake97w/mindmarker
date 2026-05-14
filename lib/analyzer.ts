/**
 * MindMarker — Local Text Analysis Engine
 *
 * Computes heuristic cognitive-risk features from written text.
 * Each feature is normalized 0–100 (higher = more risk), then
 * combined via calibrated weights into a single composite score.
 *
 * Score bands:
 *   0 – 34  →  Low risk      (green)
 *  35 – 64  →  Moderate risk (yellow)
 *  65 – 100 →  High risk     (red)
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FeatureResult {
  id: string;
  label: string;
  /** 0–100, higher = more risk */
  score: number;
  /** Importance weight (all weights sum to 1.0) */
  weight: number;
  /** Points contributed to composite score (score × weight) */
  contribution: number;
  /** Human-readable measured value */
  rawValue: string;
  /** One-line clinical interpretation */
  interpretation: string;
}

export type RiskLevel = "low" | "moderate" | "high";

export interface AnalysisResult {
  riskScore: number;
  riskLevel: RiskLevel;
  summary: string;
  signals: string[];
  features: FeatureResult[];
  wordCount: number;
  sentenceCount: number;
}

// ─── Word Lists ───────────────────────────────────────────────────────────────

/**
 * Non-specific / vague terms that substitute for precise nouns or verbs.
 * Elevated frequency is a documented marker in early cognitive decline.
 */
const VAGUE_WORDS = new Set([
  "thing", "things", "stuff", "something", "someone", "somewhere",
  "somehow", "whatever", "whenever", "wherever", "whoever",
  "kind", "sort", "type", "certain", "various", "several",
  "lot", "lots", "bit", "etc", "etcetera", "whatnot",
]);

/**
 * Filler / hedge words common in spoken language.
 * Elevated density in written text may indicate word-finding difficulty.
 */
const FILLER_WORDS = new Set([
  "um", "uh", "hmm", "ah", "er", "like", "basically", "literally",
  "actually", "honestly", "seriously", "really", "very", "quite",
  "just", "simply", "totally", "absolutely", "obviously", "clearly",
  "well", "right", "okay", "ok", "anyway", "anyways", "alright",
]);

/**
 * Personal, demonstrative, and referential pronouns.
 * Overuse without clear antecedents is associated with referential ambiguity.
 */
const PRONOUNS = new Set([
  "i", "me", "my", "mine", "myself",
  "he", "him", "his", "himself",
  "she", "her", "hers", "herself",
  "it", "its", "itself",
  "they", "them", "their", "theirs", "themselves",
  "we", "us", "our", "ours", "ourselves",
  "you", "your", "yours", "yourself", "yourselves",
  "this", "that", "these", "those",
]);

/** Stop words excluded when computing content-word overlap (topic coherence). */
const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "nor", "so", "yet", "for",
  "is", "are", "was", "were", "be", "been", "being", "am",
  "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "shall", "can", "must",
  "to", "of", "in", "on", "at", "by", "from", "with", "as", "into",
  "through", "during", "before", "after", "above", "below",
  "up", "down", "out", "off", "over", "under", "again",
  "not", "no", "about", "than", "when", "where",
  "who", "which", "what", "if", "how", "all", "each", "every",
  "both", "only", "own", "same", "too", "also", "back",
  "then", "such", "even", "because",
  ...PRONOUNS,
]);

// ─── Utilities ────────────────────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/\b[a-z']+\b/g) ?? [];
}

function splitSentences(text: string): string[] {
  const parts = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 2);
  return parts.length > 0 ? parts : [text.trim()];
}

function contentWords(words: string[]): string[] {
  return words.filter((w) => !STOP_WORDS.has(w) && w.length > 2);
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

// ─── Feature Extractors ───────────────────────────────────────────────────────

/**
 * Moving-Average Type-Token Ratio (MATTR) using a 40-word sliding window.
 * Normalizes vocabulary richness for texts of varying lengths.
 * Range: 0–1; higher = more diverse.
 */
function computeMATTR(words: string[], windowSize = 40): number {
  if (words.length === 0) return 0;
  if (words.length <= windowSize) return new Set(words).size / words.length;
  const ttrs: number[] = [];
  for (let i = 0; i <= words.length - windowSize; i++) {
    const win = words.slice(i, i + windowSize);
    ttrs.push(new Set(win).size / windowSize);
  }
  return ttrs.reduce((a, b) => a + b, 0) / ttrs.length;
}

/**
 * Ratio of repeated bigrams to total bigrams.
 * High repetition suggests perseveration — a documented cognitive signal.
 */
function computePhraseRepetition(words: string[]): number {
  if (words.length < 4) return 0;
  const counts = new Map<string, number>();
  for (let i = 0; i < words.length - 1; i++) {
    const bg = `${words[i]} ${words[i + 1]}`;
    counts.set(bg, (counts.get(bg) ?? 0) + 1);
  }
  const repeated = [...counts.values()].filter((c) => c > 1).length;
  return repeated / (words.length - 1);
}

/** Generic per-word frequency for any word set. */
function wordFrequency(words: string[], set: Set<string>): number {
  if (words.length === 0) return 0;
  return words.filter((w) => set.has(w)).length / words.length;
}

/**
 * Mean and coefficient of variation (CV = σ/μ) of sentence word-counts.
 * CV measures structural regularity; very low or very high values are flagged.
 */
function sentenceLengthStats(sentences: string[]): { mean: number; cv: number } {
  const lengths = sentences.map((s) => tokenize(s).length).filter((l) => l > 0);
  if (lengths.length === 0) return { mean: 0, cv: 0 };
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  if (lengths.length === 1) return { mean, cv: 0 };
  const variance = lengths.reduce((acc, l) => acc + (l - mean) ** 2, 0) / lengths.length;
  const cv = mean > 0 ? Math.sqrt(variance) / mean : 0;
  return { mean, cv };
}

/**
 * Average Jaccard similarity between adjacent sentence content-word sets.
 * Low overlap → topic drift; used as a proxy for semantic coherence.
 */
function computeCoherence(sentences: string[]): number {
  if (sentences.length < 2) return 0.15; // single sentence: assume coherent
  const sims: number[] = [];
  for (let i = 0; i < sentences.length - 1; i++) {
    const a = new Set(contentWords(tokenize(sentences[i])));
    const b = new Set(contentWords(tokenize(sentences[i + 1])));
    if (a.size === 0 || b.size === 0) continue;
    const intersection = [...a].filter((w) => b.has(w)).length;
    const union = new Set([...a, ...b]).size;
    sims.push(union > 0 ? intersection / union : 0);
  }
  if (sims.length === 0) return 0.1;
  return sims.reduce((a, b) => a + b, 0) / sims.length;
}

/**
 * Fraction of sentences under 5 words — a proxy for thought fragmentation.
 */
function computeFragmentRatio(sentences: string[]): number {
  if (sentences.length === 0) return 0;
  return sentences.filter((s) => tokenize(s).length < 5).length / sentences.length;
}

// ─── Feature Scorers (0–100, higher = more risk) ──────────────────────────────

function scoreMATTR(v: number): number {
  // Healthy adult MATTR (40-word window): ~0.62–0.82
  if (v >= 0.72) return 0;
  if (v >= 0.58) return lerp(0, 22, (0.72 - v) / 0.14);
  if (v >= 0.44) return lerp(22, 58, (0.58 - v) / 0.14);
  if (v >= 0.30) return lerp(58, 82, (0.44 - v) / 0.14);
  return lerp(82, 100, (0.30 - v) / 0.30);
}

function scorePhraseRepetition(v: number): number {
  // Healthy prose: <3% repeated bigrams; >10% is strongly flagged
  return clamp(v * 750, 0, 100);
}

function scoreVagueLanguage(v: number): number {
  // Healthy: <2% vague terms; >8% is notably elevated
  return clamp(v * 800, 0, 100);
}

function scoreFillerWords(v: number): number {
  // Written text baseline: <2% filler density
  return clamp(v * 650, 0, 100);
}

/** Voice mode — spoken speech has 5–10% natural filler; penalize far less harshly. */
function scoreFillerWordsVoice(v: number): number {
  return clamp(v * 300, 0, 100);
}

/** Voice mode — incomplete utterances are normal in speech; raise the threshold. */
function scoreFragmentsVoice(v: number): number {
  return clamp(v * 60, 0, 80);
}

function scoreSentenceLength(mean: number): number {
  // Optimal written range: 13–22 words
  if (mean >= 13 && mean <= 22) return 5;
  if (mean < 13) return lerp(75, 5, mean / 13);
  return clamp(lerp(5, 70, (mean - 22) / 18), 5, 70);
}

function scoreSentenceLengthCV(cv: number): number {
  // Healthy CV: 0.35–0.80 (natural variation in sentence rhythm)
  // Too uniform (rigidity) or too chaotic (fragmentation) = elevated risk
  if (cv >= 0.35 && cv <= 0.80) return 8;
  if (cv < 0.35) return lerp(60, 8, cv / 0.35);
  return clamp(lerp(8, 68, (cv - 0.80) / 0.70), 8, 68);
}

function scorePronounDensity(v: number): number {
  // Healthy written prose: ~8–13% pronouns
  if (v <= 0.13) return clamp(v * 60, 0, 8);
  if (v <= 0.22) return lerp(8, 52, (v - 0.13) / 0.09);
  return clamp(lerp(52, 90, (v - 0.22) / 0.16), 52, 90);
}

function scoreCoherence(v: number): number {
  // Adjacent-sentence Jaccard similarity; 0.07–0.22 is healthy
  if (v >= 0.07 && v <= 0.22) return clamp((0.15 - v) * 60, 0, 10);
  if (v < 0.07) return lerp(70, 10, v / 0.07);
  return clamp(lerp(10, 40, (v - 0.22) / 0.22), 10, 40); // repetitive overlap
}

function scoreFragments(v: number): number {
  // <10% short sentences is normal; >40% is strongly flagged
  return clamp(v * 100, 0, 95);
}

// ─── Output Generators ────────────────────────────────────────────────────────

function buildSummary(level: RiskLevel, features: FeatureResult[]): string {
  const topFlags = features.filter((f) => f.score > 45).slice(0, 2).map((f) => f.label.toLowerCase());

  if (level === "low") {
    return "This sample demonstrates coherent sentence structure, good lexical variety, and consistent topical flow — all patterns consistent with healthy cognitive function.";
  }
  if (level === "moderate") {
    const note = topFlags.length
      ? `The most notable patterns are ${topFlags.join(" and ")}.`
      : "Several patterns deviate from baseline expectations.";
    return `This sample shows linguistic markers worth monitoring. ${note} These findings are not diagnostic, but represent meaningful deviations from typical healthy-adult writing.`;
  }
  const note = topFlags.length
    ? `The most significant signals are ${topFlags.join(" and ")}.`
    : "Multiple significant signals were identified.";
  return `This sample contains multiple high-risk linguistic patterns associated with cognitive strain. ${note} This writing would benefit from professional clinical evaluation.`;
}

function buildSignals(features: FeatureResult[]): string[] {
  const map: Record<string, string> = {
    lexical_diversity: "Reduced vocabulary range — repeated word choices within short passages",
    phrase_repetition: "Recurring word combinations detected across the sample",
    vague_language: 'Elevated use of non-specific terms ("thing," "stuff," "somewhere")',
    filler_words: "Higher-than-expected density of filler and hedge words",
    sentence_length: "Sentence length falls outside the typical range for structured adult writing",
    sentence_variability: "Unusual uniformity or irregularity in sentence-length rhythm",
    pronoun_density: "Over-reliance on pronouns — possible referential ambiguity",
    coherence: "Limited topical continuity detected between consecutive sentences",
    fragments: "Elevated proportion of incomplete or very short sentence fragments",
  };
  return features
    .filter((f) => f.score >= 30 && map[f.id])
    .map((f) => map[f.id]);
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function analyzeText(text: string, voiceMode = false): AnalysisResult {
  const words = tokenize(text);
  const sentences = splitSentences(text);

  // ── Raw measurements ──
  const mattr = computeMATTR(words);
  const phraseRep = computePhraseRepetition(words);
  const vagueFreq = wordFrequency(words, VAGUE_WORDS);
  const fillerFreq = wordFrequency(words, FILLER_WORDS);
  const { mean: sentMean, cv: sentCV } = sentenceLengthStats(sentences);
  const pronounFreq = wordFrequency(words, PRONOUNS);
  const coherence = computeCoherence(sentences);
  const fragmentRatio = computeFragmentRatio(sentences);

  // ── Weighted feature definitions ──
  // Voice mode redistributes weight away from filler/fragments (naturally high in speech).
  const W = voiceMode
    ? { lexical_diversity: 0.24, phrase_repetition: 0.15, vague_language: 0.19,
        filler_words: 0.05, sentence_length: 0.10, sentence_variability: 0.06,
        pronoun_density: 0.10, coherence: 0.09, fragments: 0.02 }
    : { lexical_diversity: 0.20, phrase_repetition: 0.15, vague_language: 0.15,
        filler_words: 0.10, sentence_length: 0.10, sentence_variability: 0.08,
        pronoun_density: 0.10, coherence: 0.08, fragments: 0.04 };

  const rawFeatures = [
    {
      id: "lexical_diversity",
      label: "Vocabulary Diversity",
      weight: W.lexical_diversity,
      score: scoreMATTR(mattr),
      rawValue: `${(mattr * 100).toFixed(1)}% unique per 40-word window`,
      interpretation:
        mattr >= 0.65 ? "Rich, varied vocabulary" :
        mattr >= 0.50 ? "Moderate vocabulary breadth" :
        "Reduced lexical variety detected",
    },
    {
      id: "phrase_repetition",
      label: "Phrase Repetition",
      weight: W.phrase_repetition,
      score: scorePhraseRepetition(phraseRep),
      rawValue: `${(phraseRep * 100).toFixed(1)}% repeated word pairs`,
      interpretation:
        phraseRep < 0.03 ? "Minimal repeated word combinations" :
        phraseRep < 0.08 ? "Some phrase repetition present" :
        "High frequency of recurring word pairs",
    },
    {
      id: "vague_language",
      label: "Vague Language",
      weight: W.vague_language,
      score: scoreVagueLanguage(vagueFreq),
      rawValue: `${(vagueFreq * 100).toFixed(1)}% of total words`,
      interpretation:
        vagueFreq < 0.025 ? "Precise and specific word choice" :
        vagueFreq < 0.07  ? "Some non-specific language present" :
        "Elevated vague and non-specific terminology",
    },
    {
      id: "filler_words",
      label: "Filler Word Frequency",
      weight: W.filler_words,
      score: voiceMode ? scoreFillerWordsVoice(fillerFreq) : scoreFillerWords(fillerFreq),
      rawValue: `${(fillerFreq * 100).toFixed(1)}% of total words`,
      interpretation:
        fillerFreq < 0.025 ? "Low filler word density" :
        fillerFreq < 0.06  ? "Moderate filler word presence" :
        "Elevated use of hedge and filler terms",
    },
    {
      id: "sentence_length",
      label: "Sentence Length",
      weight: W.sentence_length,
      score: scoreSentenceLength(sentMean),
      rawValue: `${sentMean.toFixed(1)} words per sentence (avg)`,
      interpretation:
        sentMean >= 13 && sentMean <= 22 ? "Sentence length within typical range" :
        sentMean < 9 ? "Unusually short sentences detected" :
        "Unusually long sentences detected",
    },
    {
      id: "sentence_variability",
      label: "Structural Regularity",
      weight: W.sentence_variability,
      score: scoreSentenceLengthCV(sentCV),
      rawValue: `CV ${sentCV.toFixed(2)} (${sentCV < 0.35 ? "very uniform" : sentCV > 0.80 ? "highly irregular" : "natural"})`,
      interpretation:
        sentCV >= 0.35 && sentCV <= 0.80 ? "Natural sentence-length variation" :
        sentCV < 0.35 ? "Unusually uniform sentence structure" :
        "Highly irregular sentence rhythm",
    },
    {
      id: "pronoun_density",
      label: "Pronoun Density",
      weight: W.pronoun_density,
      score: scorePronounDensity(pronounFreq),
      rawValue: `${(pronounFreq * 100).toFixed(1)}% of total words`,
      interpretation:
        pronounFreq <= 0.13 ? "Normal pronoun usage" :
        pronounFreq <= 0.21 ? "Somewhat elevated pronoun use" :
        "High pronoun density — possible referential ambiguity",
    },
    {
      id: "coherence",
      label: "Topic Coherence",
      weight: W.coherence,
      score: scoreCoherence(coherence),
      rawValue: `${(coherence * 100).toFixed(1)}% avg sentence-to-sentence overlap`,
      interpretation:
        coherence >= 0.07 ? "Consistent topical flow between sentences" :
        "Limited conceptual continuity between sentences",
    },
    {
      id: "fragments",
      label: "Sentence Completeness",
      weight: W.fragments,
      score: voiceMode ? scoreFragmentsVoice(fragmentRatio) : scoreFragments(fragmentRatio),
      rawValue: `${(fragmentRatio * 100).toFixed(0)}% short/incomplete sentences`,
      interpretation:
        fragmentRatio < 0.12 ? "Sentences appear complete and well-formed" :
        "Elevated proportion of incomplete sentence patterns",
    },
  ];

  // ── Composite score ──
  const riskScore = clamp(
    Math.round(rawFeatures.reduce((sum, f) => sum + f.score * f.weight, 0)),
    0,
    100
  );

  const riskLevel: RiskLevel =
    riskScore <= 34 ? "low" :
    riskScore <= 64 ? "moderate" :
    "high";

  // Sort features by contribution descending so highest-impact appears first
  const features: FeatureResult[] = rawFeatures
    .map((f) => ({ ...f, contribution: Math.round(f.score * f.weight * 10) / 10 }))
    .sort((a, b) => b.contribution - a.contribution);

  return {
    riskScore,
    riskLevel,
    summary: buildSummary(riskLevel, features),
    signals: buildSignals(features),
    features,
    wordCount: words.length,
    sentenceCount: sentences.length,
  };
}
