// Every project on the site. The home page shows the ones listed in
// `homeProjects`; /projects lists them all, grouped; /projects/[slug] renders
// one in full.
//
// Media: drop screenshots or screen recordings into public/projects/<slug>/
// and list them in `media`. Projects with no media show placeholder frames.

export type ProjectGroup = "ai" | "systems" | "apps";

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Project = {
  slug: string;
  name: string;
  // One or two sentences, shown on cards.
  summary: string;
  // Paragraphs for the project page.
  description: string[];
  highlights: string[];
  tags: string[];
  group: ProjectGroup;
  year: string;
  links: {
    repo?: string;
    live?: string;
    package?: { label: string; href: string };
  };
  media: ProjectMedia[];
  // Optional terminal-style snippet shown on the featured card and project page.
  terminal?: string[];
};

export const projectGroups: { id: ProjectGroup; label: string; blurb: string }[] = [
  {
    id: "ai",
    label: "AI and LLM tools",
    blurb: "Agents, judges, and plain-English interfaces to software.",
  },
  {
    id: "systems",
    label: "Systems",
    blurb: "Servers, routing, and the plumbing under applications.",
  },
  {
    id: "apps",
    label: "Small apps",
    blurb: "Things I built because I wanted them to exist.",
  },
];

const github = (repo: string) => `https://github.com/damiensmith1/${repo}`;

export const projects: Project[] = [
  {
    slug: "clance",
    name: "Clance",
    summary:
      "A desktop developer tool built on Claude Code. It runs agent sessions alongside your other apps and can read what's on your screen, so the agent works from your actual context.",
    description: [
      "Clance is my own developer tool, built on top of Claude Code. It runs several agent sessions side by side and lets each one see the apps around it: the editor, the browser, the terminal.",
      "Instead of copying context into a chat, the agent reads it from the screen through the macOS accessibility tree, so it works from what you're actually looking at.",
    ],
    highlights: [
      "Multiple agent sessions running in parallel, with a view of which ones are waiting on you",
      "Reads other apps' windows as text through the accessibility tree, not screenshots",
      "Built on the Claude Agent SDK and MCP",
    ],
    tags: ["TypeScript", "Electron", "Claude Agent SDK", "MCP"],
    group: "ai",
    year: "2026",
    links: {},
    media: [],
    terminal: [
      "$ clance",
      "  sessions   3 running · 1 waiting on you",
      "  context    reading: VS Code, Chrome, Terminal",
    ],
  },
  {
    slug: "llm-cassette",
    name: "llm-cassette",
    summary:
      "Record and replay OpenAI and Anthropic calls in tests. When you edit a prompt, a judge model decides whether the saved response still fits, so tests survive prompt changes.",
    description: [
      "The first test run calls the real API and saves each response to a cassette file. Later runs, including CI, replay them: no network, no API keys, no cost.",
      "Most cassette tools break the moment you edit a prompt. llm-cassette asks a judge model whether the saved response still answers the new prompt. If it does, the cassette is kept; if not, that call is re-recorded. The verdict is saved in the cassette, so CI stays deterministic.",
      "It needs no changes to app code. Calls to OpenAI, Anthropic and OpenRouter are captured automatically, and each test gets its own cassette next to the test file.",
    ],
    highlights: [
      "Works with Vitest and Jest",
      "Supports the official openai and @anthropic-ai/sdk clients, streaming included",
      "Judge verdicts are stored in the cassette, so replays never call a model",
    ],
    tags: ["TypeScript", "Vitest", "Jest", "LLM-as-judge"],
    group: "ai",
    year: "2026",
    links: {
      repo: github("llm-cassette"),
      package: {
        label: "npm",
        href: "https://www.npmjs.com/package/@damiensmith1/llm-cassette",
      },
    },
    media: [],
    terminal: [
      "$ LLM_CASSETTE_MODE=replay npx vitest",
      "  ✓ classifies receipts        replayed",
      "  ✓ drafts reply               prompt changed · judge: still fits",
    ],
  },
  {
    slug: "semantic-pubsub-jev",
    name: "semantic-pubsub",
    summary:
      "Pub/sub that routes messages by what they mean. Subscribers describe their interests in plain language, and each message is judged once against all of them.",
    description: [
      "Subscribers say what they care about in plain language: \"database and storage problems\", \"network latency\". Every published message is judged once against all of a topic's interests and delivered only to the ones that match.",
      "It runs on TypeSafe's Jev, a model that returns calibrated probabilities instead of text and evaluates every question in parallel. Going from 1 to 100 subscribers in one request moved latency from 193ms to 224ms.",
      "I treated it as an experiment with three measurements. Routing was perfectly reproducible and didn't degrade up to 200 subscribers, but 23.8% of intents routed differently depending only on how they were worded. The engineering works; the hard part is knowing what you asked for. The console exists to show that before you trust a predicate.",
    ],
    highlights: [
      "0.0% flip rate across 20 repeats",
      "200 subscribers judged in 327ms, about $0.81 per 1,000 publishes",
      "Total spend across all experiments: $0.064",
    ],
    tags: ["Go", "Pub/sub", "Jev", "Experiments"],
    group: "ai",
    year: "2026",
    links: { repo: github("semantic-pubsub-jev") },
    media: [
      {
        type: "image",
        src: "/projects/semantic-pubsub-jev/console.png",
        alt: "The console's live view: messages on a deploys topic, each judged against two subscribers, with the match threshold drawn as a line.",
        width: 2936,
        height: 1606,
      },
    ],
  },
  {
    slug: "jevfilter",
    name: "jevfilter",
    summary:
      "A Python library for judging content against plain-English definitions. Describe what you care about in a few words and get typed answers with calibrated probabilities.",
    description: [
      "jevfilter answers questions like which topics match, which category, which company and how urgent, from definitions written in plain English.",
      "It's stateless: no storage, no cache and no network except the model call. You get plain results back and store them however you like. Topics are small YAML files with a name, a description, and optional categories, fields and flags.",
    ],
    highlights: [
      "Published on PyPI",
      "choose, check and rate return typed results with confidence scores",
      "Powers jev-gmail-filter",
    ],
    tags: ["Python", "PyPI", "Jev"],
    group: "ai",
    year: "2026",
    links: {
      repo: github("jevfilter"),
      package: { label: "PyPI", href: "https://pypi.org/project/jevfilter/" },
    },
    media: [],
    terminal: [
      '>>> jf.choose("I was charged twice", ["billing", "bug", "feature request"])',
      "Choice(value='billing', confidence=0.96)",
    ],
  },
  {
    slug: "jev-gmail-filter",
    name: "jev-gmail-filter",
    summary:
      "Filter Gmail with plain-English topics. It labels matching emails, groups them into tracked items like job applications, and flags anything that has gone quiet.",
    description: [
      "Describe what you care about, like \"recruiters contacting me about a role\", and the app labels matching emails, groups them into tracked items with a status, and flags threads that have gone quiet.",
      "It's self-hosted and local: your email, topics and database stay on your machine, and each user creates their own Google OAuth client so no one else's app ever sees the mail. A setup wizard walks through it in about fifteen minutes.",
      "The web UI has an overview, a queue for emails it wasn't sure about, a board of tracked items, and a topic editor where you can try a topic on a real email before saving it.",
    ],
    highlights: [
      "Local-only: SQLite database, OAuth token and topics live in ./data",
      "Low-confidence verdicts go to a review queue instead of being guessed",
      "Spend cap and dry-run mode before labelling anything",
    ],
    tags: ["Python", "Gmail API", "SQLite", "Jev"],
    group: "ai",
    year: "2026",
    links: { repo: github("jev-gmail-filter") },
    media: [],
  },
  {
    slug: "prompt-tuner",
    name: "Prompt Tuner",
    summary:
      "Paste a draft prompt and get it graded on five dimensions, asked only for what's missing, and rewritten with notes on what changed.",
    description: [
      "A small utility I built to write better prompts in my own day-to-day AI use. It grades a draft from 0 to 4 on the ask, background, deliverable, reader and limits, then picks at most four gaps worth closing, each with a suggested answer.",
      "A second step streams back the tuned prompt with a short list of what changed. The draft is always passed as data, never instructions, because a prompt tuner is otherwise an open invitation to prompt injection.",
      "Rate limiting runs on Neon Postgres and fails open: if the database is unreachable the request goes through, because a rate limiter that takes the app down is worse than none.",
    ],
    highlights: [
      "Structured output for the review, so it can't come back unparseable",
      "Streaming rewrite on two edge functions",
      "State survives a refresh",
    ],
    tags: ["TypeScript", "Claude API", "Vercel Edge", "Neon"],
    group: "ai",
    year: "2025",
    links: {
      repo: github("prompt-tuner"),
      live: "https://prompt-tuner.vercel.app",
    },
    media: [
      {
        type: "image",
        src: "/projects/prompt-tuner/review.png",
        alt: "A draft prompt scored on five dimensions, with the gaps worth closing listed beside it as questions.",
        width: 1400,
        height: 769,
      },
      {
        type: "image",
        src: "/projects/prompt-tuner/result.png",
        alt: "The tuned prompt returned by the rewrite, beside the same scorecard.",
        width: 1400,
        height: 766,
      },
    ],
  },
  {
    slug: "go-ws-server",
    name: "go-ws-server",
    summary:
      "A Redis-backed WebSocket server in Go with pub/sub topics and replay, topic locking, per-user broadcast, and a distributed job scheduler.",
    description: [
      "Every instance is stateless and Redis is the only coordination point, so it scales by adding processes behind any load balancer that speaks WebSocket upgrade.",
      "Published messages go to a bounded per-topic Redis Stream for history and to Redis Pub/Sub for live fan-out. Late subscribers replay from a timestamp, a stream ID, or their last acknowledged position.",
      "It runs standalone from environment variables or embeds as a Go package, with pluggable authentication, per-topic authorization, custom protocol verbs and middleware.",
    ],
    highlights: [
      "Distributed scheduler for delayed and recurring HTTP calls, claimed atomically so each job runs once",
      "SSRF protection that gates the TCP connect, not just the URL",
      "Prometheus metrics, health endpoints and log redaction",
    ],
    tags: ["Go", "Redis", "WebSockets", "Docker"],
    group: "systems",
    year: "2026",
    links: { repo: github("go-ws-server") },
    media: [],
  },
  {
    slug: "load-balancer-playground",
    name: "Load Balancer Playground",
    summary:
      "A small load balancer in front of simulated backends that get slow, fail and crash, with a live dashboard comparing routing strategies.",
    description: [
      "A learning project for testing routing strategies (random, round-robin and a scoring balancer) against backends with variable latency, failures under load, failed health checks and the occasional crash.",
      "The compare mode runs all three strategies at once, and a browser dashboard shows success rates, latencies, retries, circuit-breaker state and backend health live. You can change traffic, failure rates and presets from stable to chaos without restarting.",
    ],
    highlights: [
      "Three strategies side by side under the same traffic",
      "Circuit breakers and retries",
      "Terminal and web dashboards",
    ],
    tags: ["TypeScript", "Node", "Networking"],
    group: "systems",
    year: "2025",
    links: { repo: github("load-balancer-playground") },
    media: [],
  },
  {
    slug: "plainlog",
    name: "plainlog",
    summary:
      "A small, predictable logger for Node and the browser, with explicit context, safe transports and first-class testability.",
    description: [
      "Most loggers are either heavy and abstract or fast and rigid. plainlog is small enough to read in one sitting: no global singletons, no hidden async behaviour, and a logging failure never crashes your process.",
      "It supports context inheritance, buffering, and either fire-and-forget or awaitable logging, and it's easy to assert against in tests.",
    ],
    highlights: [
      "Published on npm",
      "Works in Node and the browser",
      "Transport errors are contained instead of thrown",
    ],
    tags: ["TypeScript", "npm", "Logging"],
    group: "systems",
    year: "2026",
    links: {
      repo: github("plainlog"),
      package: { label: "npm", href: "https://www.npmjs.com/package/plainlog" },
    },
    media: [],
  },
  {
    slug: "mp3-compressor",
    name: "MP3 Compressor",
    summary:
      "A bulk audio compressor that runs entirely in your browser. No uploads, no account, no limits.",
    description: [
      "I needed to shrink my music to fit on a smartwatch, and every free online converter came with an account, a limit, or a bad feeling. So I built one.",
      "It uses ffmpeg compiled to WebAssembly, so all encoding happens locally in the tab. Drop in files, pick how much space to save, and download them one by one or as a zip. Up to four files encode at once.",
    ],
    highlights: [
      "Nothing leaves your machine",
      "Parallel encoding with ffmpeg.wasm",
      "Bulk download as a zip",
    ],
    tags: ["Next.js", "TypeScript", "ffmpeg.wasm", "WebAssembly"],
    group: "apps",
    year: "2026",
    links: {
      repo: github("mp3-compressor"),
      live: "https://mp3compressor.vercel.app",
    },
    media: [],
  },
  {
    slug: "broken-calculator",
    name: "Broken Calculator",
    summary:
      "A puzzle game where the calculator doesn't work right. Figure out each level's hidden rule and reach the target number.",
    description: [
      "Each of the 20 levels has a hidden rule that changes your results. Work out the pattern from what the calculator does, then use it to hit the target.",
    ],
    highlights: ["20 levels from easy to hard", "Plays in the browser"],
    tags: ["TypeScript", "Game"],
    group: "apps",
    year: "2026",
    links: {
      repo: github("broken-calculator"),
      live: "https://broken-calculator-tau.vercel.app",
    },
    media: [],
  },
];

// Clance is shown large; the next two sit beside each other below it.
export const homeProjects = ["clance", "llm-cassette", "semantic-pubsub-jev"]
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => p !== undefined);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
