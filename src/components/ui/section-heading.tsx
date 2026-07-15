import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  emphasis,
  description,
  className,
}: {
  kicker?: string;
  title: string;
  emphasis?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative lg:pl-10", className)}>
      {kicker ? (
        <span className="vertical-label absolute left-0 top-0 hidden font-mono text-[11px] uppercase text-muted lg:block">
          {kicker}
        </span>
      ) : null}
      {kicker ? (
        <p className="font-mono text-xs uppercase tracking-widest text-muted lg:hidden">
          {kicker}
        </p>
      ) : null}
      <h2 className="mt-3 font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:mt-0">
        {title}
        {emphasis ? (
          <>
            <br />
            <em className="italic">{emphasis}</em>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
