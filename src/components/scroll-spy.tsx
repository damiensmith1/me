"use client";

import { useEffect } from "react";

const sectionIds = [
  "about",
  "services",
  "technologies",
  "process",
  "why",
  "contact",
];

// Keeps the URL hash in sync with whichever section is actually in view,
// using replaceState so free scrolling never scrolls the page (like a real
// navigation would) or spams the back-button history.
export function ScrollSpy() {
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const headerOffset = 100;
    let settleTimer: number | undefined;

    function updateHash() {
      let activeId: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= headerOffset) {
          activeId = section.id;
        }
      }

      const target = activeId ? `#${activeId}` : window.location.pathname;
      const current = `${window.location.pathname}${window.location.hash}`;
      if (current !== target) {
        window.history.replaceState(null, "", target);
      }
    }

    // Wait for scrolling to settle before updating — otherwise a smooth
    // scroll (e.g. from clicking a nav link) flickers through every section
    // hash it passes on the way to its target.
    function onScroll() {
      if (settleTimer) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(updateHash, 150);
    }

    updateHash();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (settleTimer) window.clearTimeout(settleTimer);
    };
  }, []);

  return null;
}
