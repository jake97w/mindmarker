/**
 * MindMarker — Analysis History (localStorage)
 *
 * Persists up to MAX_ENTRIES analyses on the user's device.
 * Everything is client-side — no server, no account required.
 */

import type { AnalysisResult, RiskLevel } from "./analyzer";

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputText: string;
  score: number;
  level: RiskLevel;
  signals: string[];
  wordCount: number;
  sentenceCount: number;
  summary: string;
  /** Full result stored so reopening is instant, no re-analysis needed */
  result: AnalysisResult;
}

const STORAGE_KEY = "mindmarker_history";
const MAX_ENTRIES = 20;

/** Returns all saved entries, newest first. Safe to call during SSR (returns []). */
export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

/** Prepends a new entry and trims to MAX_ENTRIES. Returns the saved entry. */
export function saveEntry(
  inputText: string,
  result: AnalysisResult,
): HistoryEntry {
  const entry: HistoryEntry = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    inputText,
    score: result.riskScore,
    level: result.riskLevel,
    signals: result.signals,
    wordCount: result.wordCount,
    sentenceCount: result.sentenceCount,
    summary: result.summary,
    result,
  };
  const updated = [entry, ...loadHistory()].slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return entry;
}

/** Removes a single entry by id. Returns the updated list. */
export function deleteEntry(id: string): HistoryEntry[] {
  const updated = loadHistory().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/** Wipes all saved analyses. */
export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/** Human-readable relative timestamp ("2h ago", "Yesterday", etc.) */
export function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  <  1) return "Just now";
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days  <  2) return "Yesterday";
  if (days  <  7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}
