"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, socialLinks } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLink } from "@/components/ui/nav-link";

const headerIconLinks = socialLinks.filter(
  (link) => link.id === "github" || link.id === "linkedin",
);

export function Header() {
  const pathname = usePathname();

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="font-serif text-xl text-foreground"
        >
          Damien Smith
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {headerIconLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              className="hidden h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-hover hover:text-foreground sm:inline-flex"
            >
              <link.icon className="h-[18px] w-[18px]" />
            </Link>
          ))}
          <MobileNav navItems={navItems} />
        </div>
      </Container>
    </header>
  );
}
