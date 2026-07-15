import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

/**
 * Like next/link, but renders a plain <a> for in-page hash anchors — Link's
 * client-side routing doesn't reliably scroll for same-page hash changes.
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
