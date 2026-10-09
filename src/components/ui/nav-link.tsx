import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

/**
 * Like next/link, but renders a plain <a> for in-page hash anchors — Link's
 * client-side routing doesn't reliably scroll for same-page hash changes —
 * and for static files such as the resume PDF, which open in a new tab.
 */
export function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: MouseEventHandler;
  children: ReactNode;
}) {
  if (/\.\w+$/.test(href)) {
    return (
      <a href={href} className={className} onClick={onClick} target="_blank" rel="noopener">
        {children}
      </a>
    );
  }

  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
