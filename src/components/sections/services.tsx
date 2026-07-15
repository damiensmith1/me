import { servicesContent } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Services() {
  return (
    <Section id="services" surface>
      <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16 lg:items-start">
        <Reveal>
          <SectionHeading
            kicker={servicesContent.kicker}
            title={servicesContent.title}
            emphasis={servicesContent.emphasis}
            description={servicesContent.description}
          />
        </Reveal>
        <div>
          {servicesContent.items.map((service, index) => (
            <Reveal key={service.title} delay={(index % 5) * 40}>
              <div className="group border-t border-border py-6 last:border-b">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {service.tag}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">
                  {service.title}
                </h3>
                <div className="row-detail">
                  <div>
                    <p className="mt-3 max-w-xl pb-1 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
