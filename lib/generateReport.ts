/**
 * MindMarker — PDF Report Generator
 *
 * Builds a single-page clinical-style PDF from an AnalysisResult.
 * Uses jsPDF for fully client-side, zero-server rendering.
 * Imported dynamically so the library is never bundled into the initial JS.
 */

import { jsPDF } from "jspdf";
import type { AnalysisResult, RiskLevel } from "./analyzer";

// ─── Colour palette ───────────────────────────────────────────────────────────

type RGB = [number, number, number];

const C = {
  header:   [67,  56, 202] as RGB,   // indigo-700
  headerSub:[129, 120, 230] as RGB,  // indigo-400
  low:      [16,  185, 129] as RGB,  // emerald-500
  moderate: [245, 158,  11] as RGB,  // amber-500
  high:     [239,  68,  68] as RGB,  // red-500
  text:     [15,   23,  42] as RGB,  // slate-900
  muted:    [100, 116, 139] as RGB,  // slate-500
  light:    [241, 245, 249] as RGB,  // slate-100
  barBg:    [226, 232, 240] as RGB,  // slate-200
  white:    [255, 255, 255] as RGB,
  divider:  [226, 232, 240] as RGB,
} as const;

function fill(doc: jsPDF, c: RGB)      { doc.setFillColor(...c); }
function textColor(doc: jsPDF, c: RGB) { doc.setTextColor(...c); }
function drawColor(doc: jsPDF, c: RGB) { doc.setDrawColor(...c); }

function riskColor(level: RiskLevel): RGB {
  return level === "low" ? C.low : level === "moderate" ? C.moderate : C.high;
}

function riskLabel(level: RiskLevel): string {
  return level === "low" ? "LOW RISK" : level === "moderate" ? "MODERATE RISK" : "HIGH RISK";
}

// ─── Layout helpers ───────────────────────────────────────────────────────────

const PAGE_W   = 210;
const PAGE_H   = 297;
const MARGIN   = 18;
const CONTENT  = PAGE_W - MARGIN * 2;

/** Thin horizontal rule */
function rule(doc: jsPDF, y: number, opacity = 1) {
  drawColor(doc, C.divider);
  doc.setLineWidth(0.25);
  doc.setDrawColor(226, 232, 240);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
}

/** Section heading */
function sectionHead(doc: jsPDF, label: string, y: number): number {
  textColor(doc, C.muted);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text(label.toUpperCase(), MARGIN, y);
  return y + 5;
}

/** Wrapped body text; returns new y position */
function bodyText(doc: jsPDF, text: string, y: number, maxW = CONTENT, size = 9): number {
  textColor(doc, C.text);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(size);
  const lines = doc.splitTextToSize(text, maxW) as string[];
  doc.text(lines, MARGIN, y);
  return y + lines.length * (size * 0.42);
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generateReport(result: AnalysisResult, sampleText: string): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const rc  = riskColor(result.riskLevel);
  let   y   = 0;

  // ── Header bar ────────────────────────────────────────────────────────────
  fill(doc, C.header);
  doc.rect(0, 0, PAGE_W, 36, "F");

  // Brand mark (small rounded square)
  doc.setFillColor(99, 91, 235);
  doc.roundedRect(MARGIN, 9, 11, 11, 2, 2, "F");
  textColor(doc, C.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text("M", MARGIN + 5.5, 16.5, { align: "center" });

  // Title
  textColor(doc, C.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("MindMarker", MARGIN + 14, 17);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  textColor(doc, C.headerSub);
  doc.text("Cognitive Language Analysis Report", MARGIN + 14, 23);

  // Date (right-aligned)
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  doc.setFontSize(7.5);
  doc.text(dateStr, PAGE_W - MARGIN, 23, { align: "right" });

  y = 46;

  // ── Sample text preview ───────────────────────────────────────────────────
  y = sectionHead(doc, "Text Sample", y);
  const preview = sampleText.trim().slice(0, 320) + (sampleText.length > 320 ? "…" : "");
  fill(doc, C.light);
  // Draw background box — height calculated after text layout
  const previewLines = doc.splitTextToSize(preview, CONTENT - 8) as string[];
  const previewH = previewLines.length * 3.8 + 6;
  doc.roundedRect(MARGIN, y, CONTENT, previewH, 2, 2, "F");
  textColor(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(previewLines, MARGIN + 4, y + 4.5);
  y += previewH + 8;

  // ── Risk overview ─────────────────────────────────────────────────────────
  y = sectionHead(doc, "Risk Assessment", y);

  // Coloured badge
  fill(doc, rc);
  doc.roundedRect(MARGIN, y, 40, 8, 2, 2, "F");
  textColor(doc, C.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(riskLabel(result.riskLevel), MARGIN + 20, y + 5.5, { align: "center" });

  // Stats row (right of badge)
  textColor(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    `${result.wordCount} words  ·  ${result.sentenceCount} sentences`,
    MARGIN + 45, y + 5.5,
  );

  y += 13;

  // Score (large numeral)
  textColor(doc, rc);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(44);
  doc.text(String(result.riskScore), MARGIN, y + 12);

  textColor(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("/ 100", MARGIN + 24, y + 12);

  // Score bar
  y += 16;
  fill(doc, C.barBg);
  doc.roundedRect(MARGIN, y, CONTENT, 3.5, 1.5, 1.5, "F");
  fill(doc, rc);
  const barW = Math.max(4, (result.riskScore / 100) * CONTENT);
  doc.roundedRect(MARGIN, y, barW, 3.5, 1.5, 1.5, "F");

  y += 9;
  rule(doc, y);
  y += 7;

  // ── Summary ───────────────────────────────────────────────────────────────
  y = sectionHead(doc, "Clinical Summary", y);
  y = bodyText(doc, result.summary, y);
  y += 8;
  rule(doc, y);
  y += 7;

  // ── Feature breakdown ─────────────────────────────────────────────────────
  y = sectionHead(doc, "Feature Breakdown — sorted by contribution", y);
  y += 1;

  for (const f of result.features) {
    const fc: RGB =
      f.score < 35 ? C.low :
      f.score < 65 ? C.moderate :
                     C.high;

    // Feature name + raw value
    textColor(doc, C.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(f.label, MARGIN, y);

    textColor(doc, C.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(f.rawValue, MARGIN + 42, y);

    // Score (right-aligned)
    textColor(doc, fc);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(String(f.score), PAGE_W - MARGIN, y, { align: "right" });

    y += 3.2;

    // Mini bar
    fill(doc, C.barBg);
    doc.roundedRect(MARGIN, y, CONTENT, 1.8, 0.9, 0.9, "F");
    fill(doc, fc);
    doc.roundedRect(MARGIN, y, Math.max(2, (f.score / 100) * CONTENT), 1.8, 0.9, 0.9, "F");

    y += 3;

    // Interpretation
    textColor(doc, C.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.text(f.interpretation, MARGIN, y);

    y += 5.5;
  }

  rule(doc, y);
  y += 7;

  // ── Detected signals ──────────────────────────────────────────────────────
  if (result.signals.length > 0) {
    y = sectionHead(doc, "Detected Signals", y);
    for (const s of result.signals) {
      // Bullet
      fill(doc, C.muted);
      doc.circle(MARGIN + 1, y - 1, 0.8, "F");
      textColor(doc, C.text);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      const lines = doc.splitTextToSize(s, CONTENT - 6) as string[];
      doc.text(lines, MARGIN + 4, y);
      y += lines.length * 3.4 + 1.5;
    }
    rule(doc, y);
    y += 7;
  }

  // ── Disclaimer ────────────────────────────────────────────────────────────
  fill(doc, C.light);
  const disclaimerText =
    "DISCLAIMER: This report is generated by an automated heuristic engine for research and informational purposes only. " +
    "It is not a medical device, clinical diagnostic tool, or substitute for professional medical evaluation. " +
    "Results must not be used to diagnose, treat, or make medical decisions of any kind. " +
    "If you have concerns about cognitive health, please consult a qualified healthcare professional.";
  const dLines = doc.splitTextToSize(disclaimerText, CONTENT - 8) as string[];
  const dH = dLines.length * 3.6 + 6;
  doc.roundedRect(MARGIN, y, CONTENT, dH, 2, 2, "F");
  textColor(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text(dLines, MARGIN + 4, y + 4);
  y += dH + 6;

  // ── Footer ────────────────────────────────────────────────────────────────
  // Pin to bottom if room, otherwise just append
  const footerY = Math.max(y + 4, PAGE_H - 10);
  textColor(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text("MindMarker · mindmarker.app · For research use only", PAGE_W / 2, footerY, { align: "center" });

  // ── Save ──────────────────────────────────────────────────────────────────
  const filename = `mindmarker-report-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
