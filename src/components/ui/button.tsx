import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

const sizes = {
  default: "px-5 py-2.5 text-sm",
  sm: "px-4 py-2 text-sm",
};

const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary:
    "border border-border-strong text-foreground hover:bg-surface-hover",
  ghost: "text-foreground hover:bg-surface-hover",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  children?: React.ReactNode;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "default", className } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (typeof props.href === "string") {
    const { href, target, rel, download, children } = props;
    const isExternal = href.startsWith("http");
    const isHashLink = href.includes("#");

    // Next.js's <Link> intercepts clicks for client-side routing, which
    // doesn't reliably scroll for same-page hash navigation. A plain <a>
    // lets the browser (plus scroll-behavior: smooth in globals.css)
    // handle in-page anchors natively, on this page or after navigating
    // to another page's anchor.
    if (isHashLink) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        download={download}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _variant, size: _size, className: _className, ...rest } =
    props as ButtonAsButton;
  return <button className={classes} {...rest} />;
}
