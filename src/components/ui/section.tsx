import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

export function Section({
  id,
  children,
  className,
  surface = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  surface?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-16 py-14 sm:py-20",
        surface && "border-y border-border bg-surface/40",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
