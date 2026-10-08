// Every piece of text on the site lives in this one file. Edit the values
// below to update copy anywhere it appears — components just read from here.
//
// Privacy: no email, phone, or street address belongs anywhere on this site.
// The only ways to reach Damien are GitHub and LinkedIn.

export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  when: string;
  role: string;
  org: string;
};

export type Post = {
  date: string; // YYYY-MM-DD
  title: string;
  href: string;
  readingTime: string;
};

export const siteConfig = {
  name: "Damien Smith",
  role: "Software Engineer",
  description:
    "Damien Smith is a software engineer who builds products end to end, from React front ends to AWS back ends, plus AI agents and developer tools. Open to full-time roles in Toronto or remote.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://damiensmith.dev",
  links: {
    github: "https://github.com/damiensmith1",
    linkedin: "https://www.linkedin.com/in/damien-smith-683732206",
    resume: "/resume.pdf",
  },
  locale: "en_US",
} as const;

export const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
] as const;

export const heroContent = {
  rail: ["Software engineer", "Toronto · Remote"],
  status: "Open to full-time roles",
  lede: {
    before: "I build products end to end, from React front ends to AWS back ends, and lately ",
    emphasis: "the AI agents and dev tools",
    after: " that sit between them.",
  },
  meta: ["TypeScript · React · Node · AWS", "EN / FR"],
};

export const aboutContent = {
  title: "Engineer first, with a habit of owning the product too.",
  // Paragraphs render in order; the pull quote is inserted after `pullQuoteAfter`.
  paragraphs: [
    "I studied Computer Engineering at Queen's University, where I spent my spare hours teaching: as a TA I graded and gave feedback on code from more than forty students. Explaining why a piece of code is good turned out to be the fastest way to learn it myself.",
    "In 2021 I joined Console One as one of its first two engineers. We were building a deployment framework that could change itself, on an event-driven stack with Lambda auto-deployment and a custom authorization model. I led the early UI work and wrote the algorithms behind a version-controlled live code editor that shared markup across distributed source files.",
    "At Moves Financial I worked across a fintech platform for gig workers, shipping React Native features and Node and MongoDB services used by thousands of people. That job taught me to treat money-adjacent software with care: plan it, review it, then ship it.",
    "I went back to Console One in 2024 to lead product engineering. I set priorities with the founders, mentored four engineering interns, and designed an agentic workflow that pulled live API data with context-aware decisions and a flexible schema.",
    "Since then I've been building Clance, my own developer tool on top of Claude Code, and I took on one freelance client. Now I'm looking for a full-time team where I can do the same kind of work: ship quickly and own what I build.",
  ],
  pullQuote:
    "The work I enjoy most is turning a vague idea into something people actually use.",
  pullQuoteAfter: 3,
  experience: [
    { when: "2024 – 2026", role: "Head of Product Engineering", org: "Console One" },
    { when: "2022 – 2023", role: "Software Engineer", org: "Moves Financial" },
    { when: "2021 – 2022", role: "Software Engineer", org: "Console One" },
    { when: "2019 – 2024", role: "B.A.Sc. Computer Engineering", org: "Queen's University" },
  ] as ExperienceItem[],
};

export const projectsContent = {
  title: "Things I've built on my own time.",
  allLabel: "See all projects",
  pageTitle: "Projects",
  pageIntro:
    "Libraries, experiments, and small apps I've built outside of work. Most are open source on GitHub.",
};

// The Writing section and its nav link stay hidden while this list is empty.
export const writingContent = {
  title: "Notes on building with agents.",
  posts: [
    // { date: "2026-09-18", title: "What I learned building a dev tool on Claude Code", href: "/blog/...", readingTime: "8 min" },
    // { date: "2026-08-02", title: "Giving an agent your screen without giving it your screen", href: "/blog/...", readingTime: "6 min" },
    // { date: "2026-06-21", title: "Lessons from leading interns at a four-person startup", href: "/blog/...", readingTime: "5 min" },
  ] as Post[],
};

export const resumeContent = {
  title: "Damien Smith — Résumé",
  detail: "PDF · one page",
  cta: "Download PDF",
};

export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  ...(writingContent.posts.length > 0
    ? [{ label: "Writing", href: "/#writing" }]
    : []),
  { label: "Résumé", href: "/#resume" },
];
