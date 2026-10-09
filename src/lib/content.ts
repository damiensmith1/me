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
    before: "Full-stack engineer. Lately, building ",
    emphasis: "the tools and context AI agents need",
    after: " to do real work.",
  },
  meta: ["TypeScript · React · Node · AWS", "EN / FR"],
};

export const aboutContent = {
  title: "How I got here.",
  paragraphs: [
    "I didn't grow up coding. I picked Computer Engineering at Queen's because I liked math and software seemed cool, and it didn't really click until my first job in software, when I saw code I'd written turn into something people could use. I've been hooked since.",
    "That job was at Console One, a startup founded by ex-Amazon engineering leaders. I was one of its first two developers, and we were building a browser IDE on the idea that configuring the cloud, not writing code, was the real bottleneck. I built the first prototype and the multiplayer version control underneath it, and kept working part-time through school.",
    "In between, I spent a year at Moves Financial, a fintech for gig workers, working full-stack on their app in React Native, Node.js and MongoDB. It was my first time on an established engineering team, shipping to thousands of users.",
    "After graduating I went back to Console One and became Head of Product Engineering six months later. I led a small team of interns on the IDE, then became the main engineer on StoryLens, a local-first desktop app that connects to a team's tools and writes their reports. Most of my recent work is the layer that helps AI agents use tools well: connectors, context management and workflows. I'm still pushing StoryLens forward.",
    "Now I'm looking for a hands-on engineering role on a product team I can grow with.",
    "Outside of work I play sports and run. I'm also the kind of person who builds something when I want it to exist, which is where most of the projects on this site came from.",
  ],
  experience: [
    { when: "2024 – Present", role: "Head of Product Engineering", org: "Console One · StoryLens · Shared Office" },
    { when: "2022 – 2023", role: "Software Engineer Intern", org: "Moves Financial" },
    { when: "2021 – 2022", role: "Software Developer", org: "Console One" },
    { when: "2019 – 2024", role: "B.A.Sc. Computer Engineering", org: "Queen's University" },
  ] as ExperienceItem[],
};

export const projectsContent = {
  title: "Things I've built on my own time.",
  allLabel: "See all projects",
  pageTitle: "Projects",
  pageIntro:
    "Libraries, experiments, and small apps I've built outside of work just for fun.",
};

export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: siteConfig.links.resume },
];
