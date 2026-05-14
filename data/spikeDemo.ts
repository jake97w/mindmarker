export type NodeVariant =
  | 'student'
  | 'interest'
  | 'subinterest'
  | 'problem'
  | 'niche'
  | 'spike';

export interface NodeAnalysis {
  positioning?: string;
  title: string;
  description: string;
  advisorNote?: string;
  themes?: string[];
  direction?: string[];
  projectAngles?: string[];
}

export interface SpikeNodeData extends Record<string, unknown> {
  label: string;
  subtitle?: string;
  variant: NodeVariant;
  analysis: NodeAnalysis;
}

// ── Demo: Alex Chen ───────────────────────────────────────────────────────────

export const demoNodes = [
  // ── Student ──────────────────────────────────────────────────────────────
  {
    id: 'student',
    type: 'student',
    position: { x: 100, y: 330 },
    data: {
      label: 'Alex Chen',
      subtitle: 'Junior · Honors Research Track',
      variant: 'student' as NodeVariant,
      analysis: {
        positioning: 'A rare combination of scientific curiosity and technical depth.',
        title: 'Student Profile',
        description:
          "Alex's interests span neuroscience, technology, and the science of aging — three areas that don't often appear together in a high school student. That combination is meaningful, and it's the starting point for building something genuinely distinctive.",
        advisorNote:
          "Most students at this stage have broad interests but no clear thread. Alex already has the thread — it's a matter of following it to a specific, ownable direction.",
        themes: ['Neuroscience', 'Technology', 'Aging Science', 'Research Track'],
        direction: [
          'Identify the one problem within these interests that feels most urgent and personal',
          'Choose one area to go deeper in — not broader',
          'Begin connecting with researchers or practitioners working in that space',
        ],
      },
    },
  },

  // ── Interests ─────────────────────────────────────────────────────────────
  {
    id: 'interest-neuroscience',
    type: 'interest',
    position: { x: 360, y: 70 },
    data: {
      label: 'Neuroscience',
      variant: 'interest' as NodeVariant,
      analysis: {
        positioning: 'A field with real research pathways for motivated students.',
        title: 'Interest Area: Neuroscience',
        description:
          "Neuroscience is a rigorous discipline — and that's an asset. Programs that value research recognize students who engage with it seriously. For Alex, this interest provides the scientific foundation everything else builds on.",
        advisorNote:
          "The goal here is specificity. Neuroscience is a starting point, not a destination. The question to ask is: which part of the brain, and which problem, and at what stage of life? The answers to those questions become the project.",
        themes: ['Brain & Cognition', 'Research Foundation', 'Medical Adjacent'],
        direction: [
          'Read two or three foundational papers on neurodegeneration',
          'Find one aspect of neuroscience that connects to something you already care about',
          'Shadow a researcher or physician working in this space if possible',
        ],
      },
    },
  },
  {
    id: 'interest-technology',
    type: 'interest',
    position: { x: 360, y: 230 },
    data: {
      label: 'Technology',
      variant: 'interest' as NodeVariant,
      analysis: {
        positioning: 'Most valuable when pointed at a real problem.',
        title: 'Interest Area: Technology',
        description:
          "Technical skill on its own is common at selective schools. What's rare — and what admissions readers notice — is a student who uses technology to engage with a specific human or scientific problem. That's the direction this interest should go.",
        advisorNote:
          "Alex's technical interests become the differentiator when they're paired with a domain. A student who built a speech analysis tool to study cognitive decline is different from a student who knows how to code.",
        themes: ['Technical Depth', 'Applied Problem-Solving', 'Cross-Disciplinary'],
        direction: [
          'Identify a specific problem in science or health that technology could help address',
          'Build something small in that direction — a prototype, an analysis, a study',
          'Connect the technical work to a question that matters beyond the screen',
        ],
      },
    },
  },
  {
    id: 'interest-aging',
    type: 'interest',
    position: { x: 360, y: 390 },
    data: {
      label: 'Aging & Longevity',
      variant: 'interest' as NodeVariant,
      analysis: {
        positioning: 'An underexplored area at the high school level.',
        title: 'Interest Area: Aging & Longevity',
        description:
          "The science of aging is one of the most important and underfunded research areas of our time. Very few high school students work in this space — which means there's genuine room to contribute, not just observe.",
        advisorNote:
          "Students who work in aging science often find the personal connection quickly: a grandparent, a family experience, a documentary. That connection is worth naming in the application. It makes the interest feel earned, not chosen for strategy.",
        themes: ['Aging Science', 'Under-Explored Field', 'High Impact'],
        direction: [
          "Read one foundational book or paper on the biology of aging",
          "Identify whether your interest is in prevention, detection, or care",
          'Visit or connect with a geriatric care setting in your area',
        ],
      },
    },
  },
  {
    id: 'interest-behavioral',
    type: 'interest',
    position: { x: 360, y: 550 },
    data: {
      label: 'Behavioral Science',
      variant: 'interest' as NodeVariant,
      analysis: {
        positioning: 'The human dimension of an otherwise technical profile.',
        title: 'Interest Area: Behavioral Science',
        description:
          "Understanding how people behave, decide, and change is what gives technical work its meaning. For Alex, this interest is the bridge between building something and explaining why it matters to the people it's for.",
        advisorNote:
          "Schools that look for intellectual range will notice this. It signals that Alex isn't just a builder — he thinks about consequence. That's a meaningful distinction in a research-track applicant.",
        themes: ['Human Behavior', 'Interdisciplinary Thinking', 'Humanistic Lens'],
        direction: [
          'Look at how behavioral science intersects with healthcare or patient decision-making',
          'Consider how human behavior shapes the problem you care most about',
          'Let this interest ground the "why" behind your primary focus',
        ],
      },
    },
  },

  // ── Sub-interests ─────────────────────────────────────────────────────────
  {
    id: 'sub-neural-plasticity',
    type: 'subinterest',
    position: { x: 620, y: 10 },
    data: {
      label: 'Neural Plasticity',
      variant: 'subinterest' as NodeVariant,
      analysis: {
        positioning: 'How the brain changes — and why that matters for aging.',
        title: 'Focus Area: Neural Plasticity',
        description:
          "The brain's ability to adapt and reorganize is central to understanding how cognitive decline happens — and when. Studying plasticity gives Alex a scientific lens for thinking about prevention, not just treatment.",
        themes: ['Brain Adaptation', 'Foundational Neuroscience'],
        direction: [
          'Research how neuroplasticity relates to aging and early cognitive change',
          "Connect this mechanism to the specific disease process you're most interested in",
        ],
      },
    },
  },
  {
    id: 'sub-biomarkers',
    type: 'subinterest',
    position: { x: 620, y: 148 },
    data: {
      label: 'Brain Biomarkers',
      variant: 'subinterest' as NodeVariant,
      analysis: {
        positioning: 'Signals the body gives us before symptoms appear.',
        title: 'Focus Area: Brain Biomarkers',
        description:
          "Biomarkers are measurable signs of what's happening inside the body — and some of the most promising ones for early cognitive decline are non-invasive and accessible. This is where early detection becomes practically possible.",
        advisorNote:
          "Research in non-invasive biomarkers — including speech, gait, and writing — is active and growing. There's genuine room for a well-guided student to contribute to this literature.",
        themes: ['Early Detection', 'Non-Invasive Research', 'Active Field'],
        direction: [
          'Study what current biomarker research looks like in cognitive decline',
          'Identify one type of biomarker that connects to your other interests',
        ],
      },
    },
  },
  {
    id: 'sub-ml',
    type: 'subinterest',
    position: { x: 620, y: 290 },
    data: {
      label: 'Computational Analysis',
      variant: 'subinterest' as NodeVariant,
      analysis: {
        positioning: 'The technical skill set that makes the project possible.',
        title: 'Focus Area: Computational Analysis',
        description:
          "Processing large sets of data — speech recordings, clinical notes, behavioral patterns — requires specific technical skills. Alex's background here is what makes a research project in this space achievable, not just theoretical.",
        themes: ['Data Analysis', 'Technical Execution', 'Research Infrastructure'],
        direction: [
          'Apply your technical skills to a specific dataset in health or neuroscience',
          'Frame the technical work as a means to a research end, not an end itself',
        ],
      },
    },
  },
  {
    id: 'sub-voice',
    type: 'subinterest',
    position: { x: 620, y: 428 },
    data: {
      label: 'Speech & Language Patterns',
      variant: 'subinterest' as NodeVariant,
      analysis: {
        positioning: 'An unexpected window into cognitive health.',
        title: 'Focus Area: Speech & Language Patterns',
        description:
          "How people speak changes subtly in the early stages of cognitive decline — before clinical tests catch it. Word choice, pause patterns, sentence structure, and fluency can all shift years before a formal diagnosis. This is an active and largely uncharted research area at the high school level.",
        advisorNote:
          "The DementiaBank speech corpus from Carnegie Mellon provides a research-grade dataset that a motivated student can access and work with. This is where the project becomes concrete.",
        themes: ['Linguistics', 'Speech Research', 'Cognitive Signals', 'Novel Territory'],
        direction: [
          'Explore the DementiaBank dataset from Carnegie Mellon University',
          'Read published work on how speech patterns change in early Alzheimer\'s',
          'Design a simple study or analysis around one specific speech feature',
        ],
      },
    },
  },
  {
    id: 'sub-cognitive-decline',
    type: 'subinterest',
    position: { x: 620, y: 565 },
    data: {
      label: 'Cognitive Decline',
      variant: 'subinterest' as NodeVariant,
      analysis: {
        positioning: 'Understanding the progression — before it becomes irreversible.',
        title: 'Focus Area: Cognitive Decline',
        description:
          "The transition from normal aging to early cognitive impairment to Alzheimer's disease unfolds over years, often invisibly. Understanding that arc — its pace, its signals, its variation — is the scientific foundation for anything in early detection.",
        themes: ['Disease Progression', 'Clinical Context', 'Prevention Frame'],
        direction: [
          "Study the clinical stages of Alzheimer's disease and what distinguishes them",
          'Identify the specific window where early detection could have the most impact',
        ],
      },
    },
  },

  // ── Problems ──────────────────────────────────────────────────────────────
  {
    id: 'problem-late-diagnosis',
    type: 'problem',
    position: { x: 880, y: 130 },
    data: {
      label: 'Late-Stage Diagnosis',
      variant: 'problem' as NodeVariant,
      analysis: {
        positioning: "Most people find out too late. That's the problem worth solving.",
        title: 'Problem Space: Late-Stage Diagnosis',
        description:
          "The majority of Alzheimer's diagnoses happen after significant cognitive damage has already occurred — when treatment options are limited and quality of life has already declined. The gap between first signs and formal diagnosis averages more than two years.",
        advisorNote:
          "This is the most compelling entry point for Alex's project. It's a problem with human stakes, a clear gap, and an actionable research question. It gives the work a reason to exist beyond technical curiosity.",
        themes: ['Urgent Problem', 'Human Stakes', 'Clear Gap', 'Actionable'],
        direction: [
          'Make the diagnosis gap the anchor of your research question',
          'Understand what early warning signs currently go unnoticed',
          'Frame your project as closing — even partially — that gap',
        ],
      },
    },
  },
  {
    id: 'problem-inaccessible',
    type: 'problem',
    position: { x: 880, y: 350 },
    data: {
      label: 'Inaccessible Screening',
      variant: 'problem' as NodeVariant,
      analysis: {
        positioning: 'The tools that exist are out of reach for most people.',
        title: 'Problem Space: Inaccessible Screening',
        description:
          "Current cognitive evaluations require specialist appointments, clinical infrastructure, and costs ranging from $3,000 to $8,000 per assessment. For most families — especially in rural or underserved communities — they simply aren't available.",
        themes: ['Access & Equity', 'Structural Gap', 'Scalable Solution Needed'],
        direction: [
          'Research what cognitive screening tools currently exist and who can access them',
          'Think about what a low-barrier alternative might look like',
          'Frame access as both a research motivation and an application principle',
        ],
      },
    },
  },
  {
    id: 'problem-cost',
    type: 'problem',
    position: { x: 880, y: 555 },
    data: {
      label: 'Cost Barriers',
      variant: 'problem' as NodeVariant,
      analysis: {
        positioning: 'Effective solutions have to be affordable to matter.',
        title: 'Problem Space: Cost Barriers',
        description:
          "Even among insured patients, cost and logistics lead many people to forgo cognitive evaluation. Any meaningful advance in early detection needs to be deployable at low or no cost — which changes how the research question is framed from the start.",
        themes: ['Economic Access', 'Scale Thinking', 'Population Health'],
        direction: [
          'Consider cost as a design constraint, not an afterthought',
          'Research what zero-cost or low-cost screening might look like at scale',
          'Connect the access argument to the human stakes of your problem space',
        ],
      },
    },
  },

  // ── Niches ────────────────────────────────────────────────────────────────
  {
    id: 'niche-speech',
    type: 'niche',
    position: { x: 1130, y: 110 },
    data: {
      label: 'Speech as an Early Signal',
      variant: 'niche' as NodeVariant,
      analysis: {
        positioning: "Rare territory. Alex's interests converge here naturally.",
        title: 'Strategic Approach: Speech as an Early Signal',
        description:
          "Analyzing how people speak — their word choice, pauses, fluency, and structure — as an early indicator of cognitive change. This approach requires no expensive equipment, no clinical setting, and can potentially be done from a standard recording.",
        advisorNote:
          "This approach sits at the convergence of everything Alex cares about. It's technically feasible, scientifically grounded, and almost entirely unexplored at the high school level. The path to a real research contribution is shorter than it appears.",
        themes: ['Speech Research', 'Non-Invasive', 'Novel at This Level', 'High Potential'],
        direction: [
          'Access the DementiaBank Pitt Corpus — a research-grade speech dataset from Carnegie Mellon',
          'Study one or two published papers on linguistic markers in early Alzheimer\'s',
          'Design a focused study around a single speech feature you want to investigate',
        ],
      },
    },
  },
  {
    id: 'niche-passive',
    type: 'niche',
    position: { x: 1130, y: 348 },
    data: {
      label: 'Everyday Passive Monitoring',
      variant: 'niche' as NodeVariant,
      analysis: {
        positioning: 'Detection that happens in the background, without clinical burden.',
        title: 'Strategic Approach: Everyday Passive Monitoring',
        description:
          "Rather than asking people to seek out screening, this approach embeds observation into everyday life — through devices people already use. The insight is that early detection works best when it requires no effort from the patient.",
        themes: ['Systems Thinking', 'Longitudinal Approach', 'Low Friction'],
        direction: [
          'Research how passive monitoring has been explored in aging populations',
          'Think about what data could be captured without clinical visits',
          'Design a concept for what passive cognitive monitoring could look like in practice',
        ],
      },
    },
  },
  {
    id: 'niche-lowcost',
    type: 'niche',
    position: { x: 1130, y: 558 },
    data: {
      label: 'Accessible Screening Tools',
      variant: 'niche' as NodeVariant,
      analysis: {
        positioning: 'Making early detection available to people who need it most.',
        title: 'Strategic Approach: Accessible Screening Tools',
        description:
          "Developing a simple, low-cost screening approach that primary care doctors or community health workers can use — without specialist referral or expensive equipment. The goal is detection early enough to act, in the places where people actually receive care.",
        themes: ['Health Access', 'Practical Impact', 'Community Scale'],
        direction: [
          'Study what effective low-cost health screening looks like in other disease areas',
          'Identify a realistic deployment context — a clinic, a community center, a primary care setting',
          'Think about what "good enough to be useful" looks like in this context',
        ],
      },
    },
  },

  // ── Spike / Profile Blueprint ─────────────────────────────────────────────
  {
    id: 'spike',
    type: 'spike',
    position: { x: 1390, y: 280 },
    data: {
      label: "Early Detection of Alzheimer's Through Speech Patterns",
      variant: 'spike' as NodeVariant,
      analysis: {
        positioning: "This is where Alex's interests connect to a problem that genuinely matters.",
        title: 'Profile Blueprint',
        description:
          "Alex's research focuses on a question that affects millions of families: why do most people with Alzheimer's only get diagnosed after years of progression? His work explores whether subtle changes in how people speak — the words they choose, the pauses they take, the fluency of their sentences — can serve as early signals of cognitive change.",
        advisorNote:
          "This type of project is rare at the high school level — not because it's technically out of reach, but because most students are never guided toward it. It sits exactly at the intersection of everything Alex already cares about. The research exists. The dataset is accessible. The path forward is clear.",
        themes: ["Alzheimer's Research", 'Early Detection', 'Speech & Language', 'Health Access'],
        direction: [
          'Access the DementiaBank Pitt Corpus at Carnegie Mellon — this is the primary dataset for this research',
          'Connect with a university lab working on aging, cognition, or language — many welcome motivated high school researchers',
          "Submit your findings to a high school science competition or peer journal — this project is competition-ready",
        ],
        projectAngles: [
          "Study whether pause frequency and duration in speech predicts early cognitive decline — using Carnegie Mellon's DementiaBank dataset",
          "Compare how healthy adults and those with early Alzheimer's describe a standard picture prompt — a simple, replicable study design",
          'Develop a lightweight screening tool that flags speech changes worth discussing with a physician — designed for primary care use',
          'Conduct a literature review and original analysis on linguistic markers of cognitive decline — a strong entry for Regeneron STS or JSHS',
        ],
      },
    },
  },
];

// ── Edges ────────────────────────────────────────────────────────────────────

const s = (color: string, width = 1.5) => ({ stroke: color, strokeWidth: width });

export const demoEdges = [
  { id: 'e-s-n', source: 'student', target: 'interest-neuroscience', type: 'smoothstep', style: s('rgba(245,158,11,0.5)') },
  { id: 'e-s-t', source: 'student', target: 'interest-technology',   type: 'smoothstep', style: s('rgba(245,158,11,0.5)') },
  { id: 'e-s-a', source: 'student', target: 'interest-aging',         type: 'smoothstep', style: s('rgba(245,158,11,0.5)') },
  { id: 'e-s-b', source: 'student', target: 'interest-behavioral',    type: 'smoothstep', style: s('rgba(245,158,11,0.5)') },

  { id: 'e-n-np', source: 'interest-neuroscience', target: 'sub-neural-plasticity', type: 'smoothstep', style: s('rgba(99,102,241,0.45)') },
  { id: 'e-n-bm', source: 'interest-neuroscience', target: 'sub-biomarkers',         type: 'smoothstep', style: s('rgba(99,102,241,0.45)') },
  { id: 'e-t-ml', source: 'interest-technology',   target: 'sub-ml',                type: 'smoothstep', style: s('rgba(99,102,241,0.45)') },
  { id: 'e-t-v',  source: 'interest-technology',   target: 'sub-voice',             type: 'smoothstep', style: s('rgba(99,102,241,0.45)') },
  { id: 'e-a-cd', source: 'interest-aging',         target: 'sub-cognitive-decline', type: 'smoothstep', style: s('rgba(99,102,241,0.45)') },

  { id: 'e-bm-ld',  source: 'sub-biomarkers',       target: 'problem-late-diagnosis', type: 'smoothstep', style: s('rgba(244,63,94,0.4)') },
  { id: 'e-v-ld',   source: 'sub-voice',             target: 'problem-late-diagnosis', type: 'smoothstep', style: s('rgba(244,63,94,0.4)') },
  { id: 'e-cd-ld',  source: 'sub-cognitive-decline', target: 'problem-late-diagnosis', type: 'smoothstep', style: s('rgba(244,63,94,0.4)') },
  { id: 'e-ml-ia',  source: 'sub-ml',                target: 'problem-inaccessible',   type: 'smoothstep', style: s('rgba(244,63,94,0.4)') },
  { id: 'e-b-cost', source: 'interest-behavioral',   target: 'problem-cost',           type: 'smoothstep', style: s('rgba(244,63,94,0.4)') },

  { id: 'e-ld-speech',  source: 'problem-late-diagnosis', target: 'niche-speech',  type: 'smoothstep', style: s('rgba(20,184,166,0.5)') },
  { id: 'e-ld-passive', source: 'problem-late-diagnosis', target: 'niche-passive', type: 'smoothstep', style: s('rgba(20,184,166,0.5)') },
  { id: 'e-ia-passive', source: 'problem-inaccessible',   target: 'niche-passive', type: 'smoothstep', style: s('rgba(20,184,166,0.5)') },
  { id: 'e-ia-lc',      source: 'problem-inaccessible',   target: 'niche-lowcost', type: 'smoothstep', style: s('rgba(20,184,166,0.5)') },
  { id: 'e-cost-lc',    source: 'problem-cost',           target: 'niche-lowcost', type: 'smoothstep', style: s('rgba(20,184,166,0.5)') },

  { id: 'e-speech-spike',  source: 'niche-speech',  target: 'spike', type: 'smoothstep', style: s('rgba(251,191,36,0.7)', 2) },
  { id: 'e-passive-spike', source: 'niche-passive', target: 'spike', type: 'smoothstep', style: s('rgba(251,191,36,0.7)', 2) },
  { id: 'e-lc-spike',      source: 'niche-lowcost', target: 'spike', type: 'smoothstep', style: s('rgba(251,191,36,0.7)', 2) },
];
