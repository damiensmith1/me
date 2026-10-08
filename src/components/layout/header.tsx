"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { NavLink } from "@/components/ui/nav-link";

export function Header() {
  const pathname = usePathname();

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background/88 backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-3">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="font-display text-base font-bold tracking-[-0.01em]"
        >
          damiensmith<span className="font-medium text-muted">.dev</span>
        </Link>

        <nav className="flex flex-wrap gap-5 font-mono text-[0.8rem] font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  );
}
