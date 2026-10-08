import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center gap-2 rounded-md border px-4 py-3 font-mono text-sm font-medium transition-colors duration-150";

const variants = {
  primary:
    "border-foreground bg-foreground text-background hover:border-accent hover:bg-accent hover:text-white",
  secondary: "border-rule text-foreground hover:border-foreground",
};

export function Button({
  href,
  variant = "primary",
  download,
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  download?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(base, variants[variant], className);
  const isExternal = href.startsWith("http");

  // Downloads, hash anchors, and external links are plain <a>: Next's <Link>
  // client-side routing doesn't reliably scroll for same-page hash changes,
  // and a static PDF isn't a route.
  if (download || isExternal || href.includes("#")) {
    return (
      <a
        href={href}
        download={download || undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
