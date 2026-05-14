import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface AnalysisResult {
  riskLevel: "low" | "moderate" | "high";
  riskScore: number;
  reasons: string[];
  summary: string;
}

const SYSTEM_PROMPT = `You are a clinical linguistic analyst trained to detect early cognitive risk signals in written text. Your role is to analyze text samples for patterns associated with cognitive changes such as those seen in early dementia, MCI (Mild Cognitive Impairment), depression-related cognitive effects, or other neurological risk factors.

You must respond ONLY with valid JSON matching this exact schema:
{
  "riskLevel": "low" | "moderate" | "high",
  "riskScore": <integer 0-100>,
  "reasons": [<list of specific observations as strings>],
  "summary": <one sentence summary>
}

Analyze for these cognitive risk signals:
- Lexical diversity (vocabulary richness and repetition)
- Syntactic complexity (sentence length and structure variation)
- Semantic coherence (logical flow and topic consistency)
- Temporal and spatial disorientation markers
- Word-finding difficulties (circumlocution, filler words, vague pronouns)
- Perseveration (repetitive ideas or phrases)
- Fragmented or incomplete thoughts
- Unusual pronoun usage or confusion about referents

Scoring guide:
- 0-33: Low risk (green) - Coherent, rich vocabulary, good structure
- 34-66: Moderate risk (yellow) - Some concerning patterns worth monitoring
- 67-100: High risk (red) - Multiple significant cognitive risk signals

Be objective and specific. Only flag genuine linguistic risk signals. Normal writing variation, informal style, or emotional expression alone are not risk signals.`;

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length < 20) {
      return NextResponse.json(
        { error: "Please provide at least 20 characters of text to analyze." },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      thinking: { type: "adaptive" },
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyze this text for cognitive risk signals:\n\n${text.trim()}`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from model");
    }

    const raw = textBlock.text.trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not parse JSON from response");

    const result: AnalysisResult = JSON.parse(jsonMatch[0]);

    if (
      !["low", "moderate", "high"].includes(result.riskLevel) ||
      typeof result.riskScore !== "number" ||
      !Array.isArray(result.reasons)
    ) {
      throw new Error("Invalid response structure from model");
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
