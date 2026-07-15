"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { NavLink } from "@/components/ui/nav-link";
import type { NavItem } from "@/lib/content";

export function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {open
        ? createPortal(
            <div className="fixed inset-0 z-50 bg-background">
              <div className="flex h-16 items-center justify-between px-6">
                <span className="font-mono text-sm text-muted">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-6 pt-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-4 text-lg font-medium text-foreground"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
