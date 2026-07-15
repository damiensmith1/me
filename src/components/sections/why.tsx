import { whyContent } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Why() {
  return (
    <Section id="why">
      <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16 lg:items-start">
        <Reveal>
          <SectionHeading
            kicker={whyContent.kicker}
            title={whyContent.title}
            emphasis={whyContent.emphasis}
          />
        </Reveal>
        <div>
          {whyContent.items.map((point, index) => (
            <Reveal key={point.title} delay={(index % 6) * 40}>
              <div className="border-t border-border py-6 last:border-b">
                <h3 className="font-serif text-2xl text-foreground sm:text-3xl">
                  {point.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
