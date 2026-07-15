// Every piece of text on the site lives in this one file. Edit the values
// below to update copy anywhere it appears — components just read from here.

import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  id: "email" | "github" | "linkedin" | "resume";
  label: string;
  href: string;
  icon: typeof MailIcon;
  external: boolean;
  download?: boolean;
};

export type Service = {
  title: string;
  tag: string;
  description: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type WhyPoint = {
  title: string;
  description: string;
};

export type TechCategory = {
  category: string;
  items: string[];
};

export const siteConfig = {
  name: "Damien Smith",
  role: "Full-Stack Software Engineer",
  tagline: "Full-stack apps, AI integrations, and automation.",
  description:
    "Damien Smith is a full-stack software engineer building web applications, AI integrations, and automation — including AI receptionists and agentic tooling — for businesses that need software that just works. Backend and cloud infrastructure experience available for projects that need to scale. Available for freelance and contract work.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://damiensmith.dev",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "smithdamien218@gmail.com",
  links: {
    github: "https://github.com/damiensmith1",
    linkedin: "https://www.linkedin.com/in/damien-smith-683732206",
    resume: "/resume.pdf",
  },
  locale: "en_US",
} as const;

// Anchors resolve on the homepage; /projects and /blog are dedicated routes.
export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  // { label: "Projects", href: "/projects" },
  // { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

// Single source of truth for the GitHub/LinkedIn/Email/Resume links reused
// across the header, footer, hero, and contact sections.
export const socialLinks: SocialLink[] = [
  {
    id: "email",
    label: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: MailIcon,
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    href: siteConfig.links.github,
    icon: GitHubIcon,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    id: "resume",
    label: "Resume",
    href: siteConfig.links.resume,
    icon: DownloadIcon,
    external: false,
    download: true,
  },
];

export const heroContent = {
  eyebrow: "Full-Stack Software Engineer — Freelance Consultant",
  headline: {
    before: "Full-stack apps and AI tools,",
    emphasis: "built to run",
    after: "your business.",
  },
  est: "Est. 2026",
  description:
    "Independent software engineer building full-stack web applications, AI integrations, and automation — from AI receptionists to internal tools that save your team hours every week. Available for select engagements.",
  ctaPrimary: { label: "View Services", href: "/#services" },
  ctaSecondary: { label: "Get in Touch", href: "/#contact" },
  availabilityNote: "Currently available for new projects",
  location: "Remote / Toronto, Canada",
};

export const aboutContent = {
  kicker: "About",
  title: "How I think",
  emphasis: "about software.",
  paragraphs: [
    `I build full-stack web applications and AI-powered tools — from
    customer-facing apps to AI receptionists and automations that take
    repetitive work off your team's plate. I care about software that
    actually ships, holds up under real use, and doesn't need to be rebuilt
    in a year.`,
    `Before I take on a project, I want to understand the actual problem,
    not just the feature request. Underneath the full-stack and AI work is a
    solid backend and infrastructure background — I've built things like
    databases and distributed systems from scratch to understand how they
    really work — so if a project needs to scale or get more technical, that
    depth is there too.`,
  ],
  focusAreas: {
    heading: "Focus Areas",
    items: [
      "Full-Stack Web Apps",
      "AI Integrations & Agents",
      "Automation",
      "Cloud Infrastructure",
    ],
  },
  availability: {
    heading: "Availability",
    rows: [
      { label: "Status", value: "Open to new projects" },
      { label: "Engagement", value: "Freelance & contract" },
      { label: "Location", value: "Remote / Toronto, Canada" },
    ],
  },
};

export const servicesContent = {
  kicker: "Services",
  title: "What I",
  emphasis: "offer",
  description:
    "Focused engagements designed around clarity of outcome. No bloat, no ambiguity.",
  items: [
    {
      title: "Custom Web Applications",
      tag: "Full-Stack",
      description:
        "Full-stack applications built with modern frameworks — from first prototype to a system real users depend on.",
    },
    {
      title: "AI Integrations",
      tag: "AI",
      description:
        "Practical use of AI APIs, agentic workflows, and prompt engineering inside real products, not demos.",
    },
    {
      title: "AI Receptionists & Voice Agents",
      tag: "AI",
      description:
        "AI-powered phone and chat receptionists that answer questions, book appointments, and qualify leads — so nothing falls through the cracks.",
    },
    {
      title: "Automation",
      tag: "Tooling",
      description:
        "Scripts, pipelines, and internal tools that remove repetitive manual work from your team's day.",
    },
    {
      title: "API Design & Development",
      tag: "Systems",
      description:
        "REST APIs that are well-documented, versioned sensibly, and built around the clients that actually consume them.",
    },
    {
      title: "Cloud Infrastructure",
      tag: "Infrastructure",
      description:
        "AWS-based architecture — Lambda, S3, DynamoDB, and the rest — sized to the problem, not over-built for it.",
    },
    {
      title: "Developer Tools",
      tag: "Tooling",
      description:
        "Internal tooling, CLIs, and small platforms that make the engineers around you faster.",
    },
    {
      title: "Technical Consulting",
      tag: "Advisory",
      description:
        "Architecture reviews, technical due diligence, and a second opinion before you commit to a direction.",
    },
    {
      title: "Backend Development",
      tag: "Engineering",
      description:
        "APIs, services, and business logic designed to handle real traffic and change as your product does — for projects that need serious backend depth.",
    },
    {
      title: "Performance Optimization",
      tag: "Optimization",
      description:
        "Finding and fixing the parts of a system that are actually slow — not just the parts that look slow.",
    },
  ] as Service[],
};

export const processContent = {
  kicker: "Process",
  title: "How we'd",
  emphasis: "work together.",
  description:
    "No surprises. You'll know what's happening at every stage, and why.",
  items: [
    {
      step: "01",
      title: "Discovery",
      description:
        "Understand the actual problem, constraints, and goals before any code gets written — what we're solving, and for whom.",
    },
    {
      step: "02",
      title: "Planning",
      description:
        "Define scope, architecture, and milestones so we both know what “done” looks like before we start.",
    },
    {
      step: "03",
      title: "Implementation",
      description:
        "Build in focused, reviewable increments. You see real progress regularly, not just at the end.",
    },
    {
      step: "04",
      title: "Iteration",
      description:
        "Real feedback changes real software. I build in room to adjust as requirements get clearer.",
    },
    {
      step: "05",
      title: "Deployment",
      description:
        "Ship to production with proper testing, monitoring, and a rollback plan — not just “it works on my machine.”",
    },
    {
      step: "06",
      title: "Support",
      description:
        "Software needs maintenance. I stay involved after launch to fix issues, extend features, and keep things running.",
    },
  ] as ProcessStep[],
};

export const whyContent = {
  kicker: "Why work with me",
  title: "What you",
  emphasis: "can expect.",
  items: [
    {
      title: "Full-stack, end to end",
      description:
        "Frontend, backend, and the AI or automation layer in between — one engineer, one point of contact.",
    },
    {
      title: "Clear communication",
      description:
        "You'll always know what's being built, why, and what's left. No jargon without an explanation.",
    },
    {
      title: "Ownership",
      description:
        "I treat your codebase like something I'll have to maintain myself — because often I will.",
    },
    {
      title: "Maintainable by design",
      description:
        "Code the next engineer — or you, in a year — can actually read, understand, and extend.",
    },
    {
      title: "Practical AI, not hype",
      description:
        "AI integrations and agents built to actually save time and money — not bolted on for the sake of it.",
    },
    {
      title: "Depth when you need it",
      description:
        "Backend and infrastructure experience is there for projects that need to scale, not just the ones that show it off.",
    },
  ] as WhyPoint[],
};

export const technologiesContent = {
  kicker: "Technologies",
  title: "Tools I",
  emphasis: "reach for.",
  description:
    "A working set, not an exhaustive list — the tools I use often enough to be genuinely fast with.",
  items: [
    { category: "Languages", items: ["TypeScript", "JavaScript"] },
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    {
      category: "AI",
      items: [
        "AI APIs",
        "AI Agents",
        "Voice AI",
        "Prompt Engineering",
        "Agentic Workflows",
        "Semantic Search",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "REST APIs", "Serverless Architecture"],
    },
    { category: "Cloud", items: ["AWS", "Vercel"] },
    {
      category: "Databases",
      items: ["DynamoDB", "Document Databases", "Storage Engines"],
    },
    {
      category: "Infrastructure",
      items: ["Lambda", "S3", "Load Balancing", "CI/CD"],
    },
    {
      category: "Developer Tools",
      items: ["Git", "CUE", "CLI Tooling", "Automation"],
    },
  ] as TechCategory[],
};

export const contactContent = {
  kicker: "Contact",
  eyebrow: "Available for new engagements",
  heading: "Let's build something.",
  description:
    "Have a project in mind, or just want to talk through an idea? I read every message and respond personally.",
};

export const footerContent = {
  siteHeading: "Site",
  elsewhereHeading: "Elsewhere",
};