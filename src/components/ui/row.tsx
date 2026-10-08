import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

// The page's one layout: a mono label rail on the left, a reading column on
// the right. Stacks to a single column on small screens.
export function Row({
  id,
  rail,
  children,
  className,
  last = false,
}: {
  id?: string;
  rail: ReactNode;
  children: ReactNode;
  className?: string;
  last?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-16">
      <Container>
        <div
          className={cn(
            "grid gap-4 py-13 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 md:py-18",
            !last && "border-b border-rule",
            className,
          )}
        >
          <div className="font-mono text-xs leading-relaxed tracking-[0.08em] text-muted uppercase">
            <div className="md:sticky md:top-20">{rail}</div>
          </div>
          <div className="min-w-0 max-w-[40rem]">{children}</div>
        </div>
      </Container>
    </section>
  );
}

export function RowTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 font-display text-[2rem] leading-[1.1] font-bold tracking-[-0.025em] text-balance">
      {children}
    </h2>
  );
}
