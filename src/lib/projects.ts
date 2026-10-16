// Every project on the site, in the order /projects lists them (most
// important first). The home page shows the ones in `homeProjects`;
// /projects/[slug] renders one in full.
//
// Media: drop screenshots or screen recordings into public/projects/<slug>/
// and list them in `media`. Media is optional; libraries can leave it empty.
//
// Learnings: optional "What I learned" notes, one paragraph per entry, shown
// on the project page when present.

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
  learnings?: string[];
  tags: string[];
  year: string;
  links: {
    repo?: string;
    live?: string;
    package?: { label: string; href: string };
  };
  media: ProjectMedia[];
  // Optional terminal-style snippet shown on the project page (and the card, when featured).
  terminal?: string[];
};

const github = (repo: string) => `https://github.com/damiensmith1/${repo}`;

export const projects: Project[] = [
  {
    slug: "clance",
    name: "Clance",
    summary:
      "Claude Code, one hotkey away, anywhere on your Mac. A menu-bar app that pops up the real Claude Code CLI over whatever you're doing, and has grown into my main dev app and agent manager.",
    description: [
      "Press ⌥Space and a small floating terminal opens near the cursor, running the actual claude CLI with my own skills, MCP servers, hooks and plugins. Hide it and the session keeps running in the background.",
      "Clance gives Claude a set of computer-use tools over a local MCP server: look at the screen, read a window's text, read the selection or the focused field, list open windows, click a control by its label, type into a field, or bring an app forward. Other apps are read as text through the macOS Accessibility API, with a screenshot only when a picture is needed. Nothing is captured in the background, password fields can't be read, and every action on another app goes through Claude Code's normal approval prompt.",
      "The main window turns it into a dev app: a list of every Claude Code session on the Mac with search, pinning and split panes, a live git diff with stage, commit and push, and a small CodeMirror editor. Every session is a background claude agent that Clance attaches to, so closing a window never ends the work. ⌥D starts on-device dictation in any app.",
      "Lode tabs bring in lode-graph: a project's code as cards on a canvas, opened from Files or by asking a question with /. Ask Claude opens a session beside the canvas that can read the cards, search the rest of the code, build flows and draw notes with labelled arrows, so an answer can be a picture, like a design laid out next to the code it would change. A lode tab can also follow a session as it writes, in any folder or worktree, putting each edit on the canvas.",
      "Each project's lode runs in its own Electron utility process, because indexing a large repository is seconds of synchronous work that would freeze the app, and the window talks to it over a message port with no server in between. lode-graph's canvas tools are mounted on the same local MCP server sessions already use, so every Claude session can draw on the canvases. Following works through hooks every Clance session gets: after an edit, a prompt or the end of a turn, the session posts to Clance, which updates the canvas. Ask Claude opens at once because a spare session is kept warm in the folder of the lode tab you're on.",
      "Old sessions kept losing their tools. Claude Code saves a session's MCP config when it starts, but my tools server picked a new port and token every time Clance launched, so older sessions pointed at a server that no longer existed. The fix was a fixed port per install, a token read fresh on every request, and returning 404 instead of 400 for unknown sessions, which makes the client reconnect instead of giving up.",
    ],
    highlights: [
      "147 commits and five releases in its first month",
      "Installs with Homebrew: brew install --cask damiensmith1/tap/clance",
      "On-device dictation with whisper.cpp; no telemetry",
    ],
    tags: ["Electron", "TypeScript", "MCP", "Accessibility API", "whisper.cpp"],
    year: "2026",
    links: {
      repo: github("clance"),
      package: { label: "Homebrew", href: github("homebrew-tap") },
    },
    media: [
      { type: "image", src: "/projects/clance/popup.png", alt: "The Clance popup over a browser, explaining highlighted docs after reading the selection.", width: 2960, height: 1840, caption: "The ⌥Space popup reading a highlighted passage in Safari." },
      { type: "image", src: "/projects/clance/sessions.png", alt: "The session list showing working, waiting and finished Claude Code sessions across projects.", width: 2800, height: 1800, caption: "Every Claude Code session on the Mac, with status." },
      { type: "image", src: "/projects/clance/split.png", alt: "Two Claude Code sessions side by side in split panes.", width: 2800, height: 1800, caption: "Two sessions in split panes." },
      { type: "image", src: "/projects/clance/changes.png", alt: "A git diff in the Changes pane with stage and commit controls.", width: 2936, height: 1842, caption: "Live git diff with stage, commit and push." },
      { type: "image", src: "/projects/clance/editor.png", alt: "The built-in editor beside the file explorer.", width: 2932, height: 1840, caption: "The built-in editor." },
      { type: "image", src: "/projects/clance/lode.png", alt: "A lode canvas with a rate-limiter design drawn as notes and arrows beside the real code it would change, next to the Claude session that drew it.", width: 2928, height: 1842, caption: "A Claude session drawing a design on a lode canvas, next to the real code." },
      { type: "image", src: "/projects/clance/dictation.png", alt: "Dictating an email reply in Mail with the Clance dictation pill.", width: 2800, height: 1720, caption: "On-device dictation into any app." },
    ],
  },
  {
    slug: "lode-graph",
    name: "lode-graph",
    summary:
      "Read a codebase as a flow of real code. It builds a live graph of how a project fits together and lays it out as cards of actual code joined by arrows. Ask a question with / and the answer comes back as a flow.",
    description: [
      "Code is stored as text you read top to bottom, but what it describes is a web of functions, types and state with data moving between them, and more and more of it is written by AI and read afterwards. lode builds a live graph of a project (calls, references, shared state, and messages across processes like Electron IPC) and shows it as cards of real code on a canvas. Chips on each line show what it leads to; click one and that code opens beside it with an arrow. Point it at your git changes and it puts the diff on the cards and shows what might break. You can edit right in a card.",
      "TypeScript and JavaScript are read through the TypeScript compiler, and Python and Ruby through tree-sitter, along with their frameworks' conventions: routes, views, templates, jobs and commands become entry points, and the links frameworks make by name (a Rails route to its action, a Django template to its view, a screen name to its React Native screen) become arrows. The graph is incremental: reopening an unchanged project takes 24ms and a changed file re-indexes in about 300ms.",
      "Ask with / in plain words, like \"how do we create the tabs\". It isn't an LLM writing an answer. A text search finds candidate symbols, forgiving typos, then Jev judges in one request what kind of question it is and where to start, and lode follows the graph from there with Jev deciding whether each next step belongs. Every card is real code, usually in under half a second. On an eval of 51 questions over real repos it picked the right starting point 84% of the time.",
      "I also tried letting Jev crawl the project instead of matching words. It did better where the question's words weren't the code's (82% coverage against 68%), but it was slower and picked worse starting points overall, so it's an option rather than the default. Synonyms the code never uses are still the known limit.",
    ],
    highlights: [
      "A library first: graph core, an embeddable canvas built from web components, and an MCP server for agents",
      "Embedded in Clance, where Claude sessions build flows and draw note cards beside the real code",
      "105 commits and five npm releases in its first six days",
    ],
    tags: ["TypeScript", "tree-sitter", "Web Components", "MCP", "Jev"],
    year: "2026",
    links: {
      repo: github("lode-graph"),
      package: { label: "npm", href: "https://www.npmjs.com/package/lode-graph" },
    },
    media: [
      {
        type: "image",
        src: "/projects/lode-graph/ask.png",
        alt: "The answer to \"how do we create the tabs\": six cards of code, starting at addTab, with arrows to closeTab, select and createView and to the tabs state they read and write.",
        width: 3200,
        height: 1920,
        caption: "Asking \"how do we create the tabs\": six cards of real code, built in 0.6s.",
      },
      {
        type: "image",
        src: "/projects/lode-graph/changes.png",
        alt: "The changes sidebar listing the changed declarations in one file, beside two cards showing the diff on askFlow and similar.",
        width: 3200,
        height: 1920,
        caption: "Git changes: the changed declarations in the sidebar, the diff on the cards.",
      },
    ],
  },
  {
    slug: "llm-cassette",
    name: "llm-cassette",
    summary:
      "Record and replay OpenAI and Anthropic calls in tests. When you edit a prompt, a judge model decides whether the saved response still fits, so tests survive prompt changes.",
    description: [
      "The first test run calls the real API and saves each response to a cassette file next to the test. Later runs, including CI, replay them: no network, no API keys, no cost. Calls to OpenAI, Anthropic and OpenRouter are intercepted at the network layer, so app code doesn't change.",
      "Exact-match cassettes break on every prompt edit, and loose matching silently replays stale answers. llm-cassette matches cheapest first: an exact match, then a match with timestamps and IDs scrubbed, then hard checks (a changed model, setting, output format, tool schema or image always re-records). Only when the prompt text alone changed does a judge model decide whether the saved response still answers the new prompt.",
      "The judge only runs while recording, and its verdict is saved in the cassette, so replay stays deterministic and keyless. Jev is the default judge; Respan's span-01 or your own can be swapped in.",
    ],
    highlights: [
      "Works with Vitest and Jest, streaming included",
      "Supports OpenAI Chat Completions and Responses, Anthropic Messages and OpenRouter",
      "Published on npm as @damiensmith1/llm-cassette",
    ],
    tags: ["TypeScript", "Vitest", "Jest", "LLM-as-judge"],
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
      "llm-cassette: 38 exact, 4 judged, 1 recorded",
      "  summarizes (test/summary.test.ts)",
      "    judged p=0.96: POST /v1/messages",
      "    recorded: POST /v1/messages — no longer fits (p=0.04 < 0.85)",
    ],
  },
  {
    slug: "semantic-pubsub-jev",
    name: "semantic-pubsub",
    summary:
      "Pub/sub that routes messages by what they mean. Subscribers describe their interests in plain language, and each message is judged once against all of them. Built as an experiment, with the results published.",
    description: [
      "Subscribers say what they care about in plain language, like \"database and storage problems\" or \"network latency\". Every published message is judged once against all of a topic's interests in a single request, and delivered only to the ones that match. The decision is made at publish time and travels with the message.",
      "It runs on my go-ws-server broker through its extension points, with TypeSafe's Jev as the judge. Jev returns calibrated probabilities instead of text and evaluates every question in parallel, so going from 1 to 100 subscribers moved latency only from 193ms to 224ms. If the judge is unavailable, it falls back to ordinary topic delivery.",
      "The question was whether semantic routing is reliable enough to depend on, and \"no\" was an allowed answer. Two of three measurements passed: routing was perfectly reproducible, and decisions didn't change from 6 to 200 subscribers. The third failed: 23.8% of intents routed differently depending only on how they were worded. So the routing itself is dependable, but what a subscriber receives depends heavily on how they word their interest. The console exists to show what a description actually catches before you rely on it.",
    ],
    highlights: [
      "Stability: 0.0% flip rate across 20 repeats",
      "200 subscribers judged in 327ms, about $0.81 per 1,000 publishes",
      "Wording sensitivity failed: 5 of 21 cases changed with phrasing alone",
      "Total spend across all experiments: $0.064",
    ],
    tags: ["Go", "Redis", "WebSockets", "Jev", "Experiments"],
    year: "2026",
    links: { repo: github("semantic-pubsub-jev") },
    media: [
      {
        type: "image",
        src: "/projects/semantic-pubsub-jev/console.png",
        alt: "The console's live view: messages on a deploys topic, each judged against two subscribers, with the match threshold drawn as a line.",
        width: 2936,
        height: 1606,
        caption: "The live console: each message scored against every subscriber, with the threshold drawn in.",
      },
    ],
  },
  {
    slug: "go-ws-server",
    name: "go-ws-server",
    summary:
      "A stateless WebSocket server in Go with Redis as its only coordination point: pub/sub topics with replay, topic locks, per-user broadcast and a distributed job scheduler.",
    description: [
      "It grew out of the WebSocket server I built at Console One. Every publish goes to a capped per-topic Redis Stream for history and to Redis Pub/Sub for live fan-out, so you scale by adding instances behind any load balancer. Late subscribers replay what they missed from a timestamp, a stream ID or their last acknowledged position, deduplicated against live traffic.",
      "It runs as a standalone server or embeds as a Go package, with pluggable authentication and per-topic authorization, a Judge hook that makes a routing decision per message at publish time (which semantic-pubsub uses), custom protocol verbs and middleware. A distributed scheduler runs delayed and recurring HTTP calls, claimed atomically so each job runs once, with SSRF protection checked when the connection is dialled rather than only on the URL.",
      "On one instance, 500 subscribers at 200 publishes a second took 250,000 deliveries with none lost, at a p50 of 2.5ms. An unthrottled burst of a million deliveries lost nothing: latency degraded, not data. The limit at scale is Redis's outbound bandwidth, about 10 instances at 10,800 messages a second on a 1 Gbps link. That's far beyond what it needs, so I measured it and chose not to add sharded pub/sub yet.",
    ],
    highlights: [
      "Token expiry enforced for the life of the socket",
      "Prometheus metrics, a Grafana dashboard and slow-consumer eviction",
      "Redis single node, Cluster or Sentinel",
    ],
    tags: ["Go", "Redis", "WebSockets", "Prometheus", "Docker"],
    year: "2026",
    links: { repo: github("go-ws-server") },
    media: [],
  },
  {
    slug: "jevfilter",
    name: "jevfilter",
    summary:
      "A Python library for judging content against plain-English topic definitions. Each topic comes back as a match, a review or a no, with the cost of every call attached.",
    description: [
      "Describe what you care about in a small YAML file: a name and a description, plus optional exclusions, categories, fields, flags and scores. Each topic comes back as match, review or no. Field values like a company name are picked from candidates you pass in, never generated.",
      "It's stateless: no storage and no network except the model call, and every result serialises to plain JSON with its cost. There's an async batch filter with a budget that refuses rather than overspends, tracked-item matching with status rules, and a CLI to try topics, explain results, lint definitions and evaluate them on labelled data with per-topic threshold sweeps.",
      "By default it asks every question about a piece of content in one request: does it match, which category, which company. When most content matches nothing, that pays for details nobody needs, so there's also a staged mode that first asks only whether each topic could match, then asks the details for the ones that might. It takes two round trips instead of one, and on a test mix of emails it cut token costs by 31% with the same results.",
      "I pulled it out of two other projects, semantic-pubsub and jev-gmail-filter, which had each rebuilt the same layer.",
    ],
    highlights: [
      "Fake, recording and fallback judges for testing",
      "Published on PyPI (pre-alpha)",
    ],
    tags: ["Python", "PyPI", "Jev"],
    year: "2026",
    links: {
      repo: github("jevfilter"),
      package: { label: "PyPI", href: "https://pypi.org/project/jevfilter/" },
    },
    media: [],
    terminal: [
      '>>> jf.choose("I was charged twice", ["billing", "bug", "feature request"])',
      "Choice(value='billing', confidence=0.96, ...)",
    ],
  },
  {
    slug: "jev-gmail-filter",
    name: "jev-gmail-filter",
    summary:
      "Filter Gmail with plain-English topics. It labels matching emails, groups them into tracked items like job applications, and flags anything that has gone quiet.",
    description: [
      "Gmail filters are keyword rules: they can't tell a recruiter reaching out from a job alert, and nothing notices when a thread goes quiet. Describe a topic like \"recruiters contacting me about a role\" and this app labels matching emails, groups them into tracked items with a status that only moves forward, and flags items that have gone stale.",
      "It's self-hosted and local. Your email, topics and SQLite database stay on your machine, and each user brings their own Google OAuth client so no one else's app ever sees the mail. A setup wizard walks through it, with a dry run and a spend cap per sync.",
      "The web UI has an overview, a \"Needs you\" queue for emails it wasn't sure about, a list of every judged email with one-click corrections, a board of tracked items, and a topic editor where you can try a topic on a real email before saving it. Job search was the first use case.",
    ],
    highlights: [
      "Built on jevfilter",
      "Uncertain emails go to a review queue instead of being guessed",
      "Reads only the Primary tab by default",
    ],
    tags: ["Python", "FastAPI", "Gmail API", "SQLite", "Jev"],
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
      "A small utility I built to write better prompts in my own day-to-day AI use. It grades a draft from 0 to 4 on the ask, background, the deliverable, reader and voice, and limits, writes a note on each, and picks at most four gaps worth closing, each with a suggested answer you can accept instead of writing your own.",
      "A second step streams back the tuned prompt with a short list of what changed. The review runs on Claude Haiku 4.5 with a structured output schema, and the rewrite on Claude Sonnet 5. The draft is always passed as data inside tags, never as instructions, because a prompt tuner is otherwise an open invitation to prompt injection.",
      "I first built it in 2025 on GPT-4o and rebuilt it in 2026. Rate limiting moved from Upstash Redis, whose idle free-tier databases kept getting deleted, to Neon Postgres, and it fails open: if the database is unreachable the request goes through.",
    ],
    highlights: [
      "Your review and result survive a refresh",
      "15 reviews and 15 rewrites per IP per hour",
    ],
    tags: ["React", "TypeScript", "Claude API", "Vercel", "Neon"],
    year: "2025 – 2026",
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
        caption: "The review: a scorecard and the gaps worth closing.",
      },
      {
        type: "image",
        src: "/projects/prompt-tuner/result.png",
        alt: "The tuned prompt returned by the rewrite, beside the same scorecard.",
        width: 1400,
        height: 766,
        caption: "The tuned prompt.",
      },
    ],
  },
  {
    slug: "plainlog",
    name: "plainlog",
    summary:
      "A small, predictable logger for Node and the browser, with explicit context, safe transports and first-class testability.",
    description: [
      "Winston felt too abstract to reason about and Pino too rigid for testing, so I wrote a logger small enough to read in one sitting: no global singletons, no hidden async behaviour, and a logging failure never crashes your process.",
      "Context is passed down explicitly with withContext and child. Logging is fire-and-forget by default with awaitable variants, every transport call has a timeout and is isolated, and errors go to a handler instead of being thrown. Buffer mode, an in-memory test mode and a sanitizer hook round it out.",
      "Browser-safe transports (console, JSON, HTTP, in-memory) ship separately from Node-only ones (file, stream, IPC), as both ESM and CommonJS.",
    ],
    highlights: [
      "Published on npm, now at 1.0.2",
      "One runtime dependency",
      "Works in Node 18+ and the browser",
    ],
    tags: ["TypeScript", "npm", "Logging"],
    year: "2026",
    links: {
      repo: github("plainlog"),
      package: { label: "npm", href: "https://www.npmjs.com/package/plainlog" },
    },
    media: [],
  },
  {
    slug: "load-balancer-playground",
    name: "Load Balancer Playground",
    summary:
      "A small load balancer in front of simulated backends that slow down, fail and crash, with a live dashboard comparing random, round-robin and a scoring strategy.",
    description: [
      "A learning project. Three simulated backends have load-driven CPU, memory and latency, failure rates that climb under load, flaky health checks and the occasional crash. The balancer retries across backends, times out slow requests, and has a per-backend circuit breaker.",
      "A browser dashboard runs all three strategies side by side and lets you change traffic, failure rates and presets from stable to chaos live, without restarting. There's a terminal view too.",
      "The finding I didn't expect: my scoring balancer did consistently worse than round-robin and random. Traffic herded onto whichever backend looked best, it reacted to load it had caused itself, and its metrics lagged by two seconds. Power-of-two-choices is the fix I'd try next.",
    ],
    highlights: [
      "Three strategies under identical traffic",
      "Circuit breakers, retries and timeouts",
      "Terminal and web dashboards",
    ],
    tags: ["TypeScript", "Node.js", "Networking"],
    year: "2025 – 2026",
    links: { repo: github("load-balancer-playground") },
    media: [
      {
        type: "image",
        src: "/projects/load-balancer-playground/dashboard.png",
        alt: "The web dashboard: traffic, failure and crash controls, three simulated backends with CPU, memory, latency and error rate, and success rates for the scoring, random and round-robin strategies.",
        width: 2938,
        height: 1604,
        caption: "Same traffic, three strategies: scoring 97.5%, random 99.3%, round-robin 100%.",
      },
    ],
  },
  {
    slug: "mp3-compressor",
    name: "MP3 Compressor",
    summary:
      "A bulk audio compressor that runs entirely in your browser. No uploads, no account, no limits.",
    description: [
      "I needed to shrink my music to fit on a smartwatch, and every free online converter came with an account or a limit. So I built one.",
      "It uses ffmpeg compiled to WebAssembly, so all encoding happens locally in the tab. Drop in MP3, WAV, M4A, FLAC, OGG or AAC files, pick how much space to save on a slider that maps to a bitrate from 320 down to 32 kbps, and download them one by one or as a zip. A pool of four ffmpeg instances encodes files in parallel.",
    ],
    highlights: [
      "Nothing leaves your machine",
      "Four files encode at once",
      "Bulk download as a zip",
    ],
    tags: ["Next.js", "TypeScript", "ffmpeg.wasm", "WebAssembly"],
    year: "2026",
    links: {
      repo: github("mp3-compressor"),
      live: "https://mp3compressor.vercel.app",
    },
    media: [
      {
        type: "image",
        src: "/projects/mp3-compressor/compressor.png",
        alt: "The MP3 Compressor page: a drop zone for audio files, a target space saving slider at 50% (about 128 kbps), and a Compress All button.",
        width: 2330,
        height: 1342,
        caption: "Drop in files, pick how much space to save, compress.",
      },
    ],
  },
  {
    slug: "broken-calculator",
    name: "Broken Calculator",
    summary:
      "A puzzle game where the calculator doesn't work right. Figure out each level's hidden rule and reach the target number.",
    description: [
      "Each of the 20 levels quietly changes your results with a hidden rule, from off-by-one and reversed digits to swapping + and ×, digital roots, Collatz steps and Kaprekar's routine. Work out the pattern from what the calculator does, then use it to hit the target. Levels unlock in order and your progress is saved.",
    ],
    highlights: ["20 levels from easy to hard", "Plays in the browser"],
    tags: ["React", "TypeScript", "Game"],
    year: "2026",
    links: {
      repo: github("broken-calculator"),
      live: "https://broken-calculator-tau.vercel.app",
    },
    media: [
      {
        type: "image",
        src: "/projects/broken-calculator/level-1.png",
        alt: "Level 1 of Broken Calculator: a target of 50, a Show Hint button, and the calculator keypad.",
        width: 1198,
        height: 1604,
        caption: "Level 1: reach 50 with a calculator that doesn't quite work.",
      },
    ],
  },
];

// Clance is shown large; the next two sit beside each other below it.
export const homeProjects = ["clance", "lode-graph", "llm-cassette"]
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => p !== undefined);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
