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

export const siteConfig = {
  name: "Damien Smith",
  role: "Software Engineer",
  description:
    "Damien Smith is a software engineer who builds products end to end, from React front ends to AWS back ends, plus AI agents and developer tools. Open to full-time roles in Toronto or remote.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://damiensmith.dev",
  links: {
    github: "https://github.com/damiensmith1",
    linkedin: "https://www.linkedin.com/in/damien-smith-dev",
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
  paragraphs: [
    "I studied Computer Engineering at Queen's University, where I also worked as a TA for a programming course, grading and giving feedback on code from more than forty students. Explaining why a piece of code is good turned out to be the fastest way to learn it myself.",
    "In 2021 I joined Console One as one of its first two developers. We were building a deployment framework that could change itself, on an event-driven stack with Lambda auto-deployment and a custom authorization model. I led the early UI work and wrote the algorithms behind a version-controlled live code editor that shared markup across distributed source files.",
    "At Moves Financial I worked across a fintech platform for gig workers, shipping React Native features and Node and MongoDB services used by thousands of people. That job taught me to treat money-adjacent software with care: plan it, review it, then ship it.",
    "I went back to Console One in 2024 to lead product engineering. I set priorities with the founders, mentored four engineering interns, and designed an agentic workflow that pulled live API data with context-aware decisions and a flexible schema.",
    "Since then I've been building Clance, my own developer tool on top of Claude Code, and I took on one freelance client. Now I'm looking for a full-time team where I can do the same kind of work: ship quickly and own what I build.",
    "Outside of work I love playing sports and running. I also love building things just for fun, which is how most of the projects on this site started.",
  ],
  experience: [
    { when: "2024 – 2026", role: "Head of Product Engineering", org: "Console One" },
    { when: "2022 – 2023", role: "Software Engineer", org: "Moves Financial" },
    { when: "2021 – 2022", role: "Software Developer", org: "Console One" },
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

// Posts themselves are Markdown files in content/blog/ (see src/lib/blog.ts).
// The Writing section and its nav link stay hidden until one is published.
export const writingContent = {
  title: "Notes on building with agents.",
  allLabel: "All writing",
  pageTitle: "Writing",
  pageIntro: "Notes on building software, mostly with and for AI agents.",
};

export const resumeContent = {
  title: "Damien Smith — Résumé",
  detail: "PDF · one page",
  cta: "Download PDF",
};

export function getNavItems(hasPosts: boolean): NavItem[] {
  return [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/projects" },
    ...(hasPosts ? [{ label: "Writing", href: "/blog" }] : []),
    { label: "Résumé", href: "/#resume" },
  ];
}
