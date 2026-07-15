import { processContent } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Process() {
  return (
    <Section id="process">
      <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16 lg:items-start">
        <Reveal>
          <SectionHeading
            kicker={processContent.kicker}
            title={processContent.title}
            emphasis={processContent.emphasis}
            description={processContent.description}
          />
        </Reveal>
        <div>
          {processContent.items.map((step, index) => (
            <Reveal key={step.step} delay={(index % 6) * 40}>
              <div className="flex gap-6 border-t border-border py-6 last:border-b">
                <span className="font-mono text-xs text-muted">{step.step}</span>
                <div>
                  <h3 className="font-serif text-2xl text-foreground sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
