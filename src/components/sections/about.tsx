import { aboutContent } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              kicker={aboutContent.kicker}
              title={aboutContent.title}
              emphasis={aboutContent.emphasis}
            />
          </Reveal>
          <div className="mt-8 flex flex-col gap-5 lg:pl-10">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 60}>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:pt-2">
          <Reveal delay={60}>
            <div className="border border-border p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {aboutContent.focusAreas.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-foreground">
                {aboutContent.focusAreas.items.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-border p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {aboutContent.availability.heading}
              </p>
              <dl className="mt-4 flex flex-col divide-y divide-border text-sm">
                {aboutContent.availability.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <dt className="text-muted">{row.label}</dt>
                    <dd className="text-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
