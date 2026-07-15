import Link from "next/link";
import {
  footerContent,
  navItems,
  siteConfig,
  socialLinks,
} from "@/lib/content";
import { Container } from "@/components/ui/container";
import { NavLink } from "@/components/ui/nav-link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-10 py-12 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <p className="font-serif text-xl text-foreground">Damien Smith</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {siteConfig.description}
          </p>
          <p className="mt-6 text-xs text-muted">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {footerContent.siteHeading}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {footerContent.elsewhereHeading}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    download={link.download}
                    className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.id === "email" ? "Email" : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
