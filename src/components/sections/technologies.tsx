import { technologiesContent } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

export function Technologies() {
  return (
    <Section id="technologies">
      <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16 lg:items-start">
        <Reveal>
          <SectionHeading
            kicker={technologiesContent.kicker}
            title={technologiesContent.title}
            emphasis={technologiesContent.emphasis}
            description={technologiesContent.description}
          />
        </Reveal>
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {technologiesContent.items.map((group, index) => (
            <Reveal key={group.category} delay={(index % 2) * 60}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
