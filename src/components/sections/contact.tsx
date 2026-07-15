import Link from "next/link";
import { contactContent, socialLinks } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <Section id="contact" surface>
      <div className="relative">
        <span className="vertical-label absolute left-0 top-0 hidden font-mono text-[11px] uppercase text-muted lg:block">
          {contactContent.kicker}
        </span>

        <Reveal>
          <div className="mx-auto max-w-2xl text-center lg:px-10">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {contactContent.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
              {contactContent.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {contactContent.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <Reveal delay={60}>
            <ul className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    download={link.download}
                    className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
