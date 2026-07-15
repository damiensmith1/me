import { heroContent } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { NavLink } from "@/components/ui/nav-link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <Container className="relative py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {heroContent.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
          {heroContent.headline.before}
          <br />
          <em className="italic">{heroContent.headline.emphasis}</em>
          <br />
          {heroContent.headline.after}
        </h1>

        <div className="mt-10 flex items-end justify-between gap-8">
          <span className="vertical-label hidden font-mono text-[11px] uppercase text-muted lg:block">
            {heroContent.est}
          </span>

          <div className="max-w-md border-l border-border pl-6">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {heroContent.description}
            </p>
            <div className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
              <NavLink
                href={heroContent.ctaPrimary.href}
                className="text-foreground transition-colors hover:text-accent"
              >
                {heroContent.ctaPrimary.label}
              </NavLink>
              <span className="text-border-strong">—</span>
              <NavLink
                href={heroContent.ctaSecondary.href}
                className="text-foreground transition-colors hover:text-accent"
              >
                {heroContent.ctaSecondary.label}
              </NavLink>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 font-mono text-xs uppercase tracking-widest text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>{heroContent.availabilityNote}</span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 bg-foreground" />
            {heroContent.location}
          </span>
        </Container>
      </div>
    </section>
  );
}
