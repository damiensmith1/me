import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function ComingSoon({
  kicker,
  title,
  description,
  bullets,
}: {
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-24">
      <Reveal>
        <SectionHeading kicker={kicker} title={title} description={description} />
        <ul className="mt-8 flex flex-col gap-2">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2 text-sm text-muted"
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              {bullet}
            </li>
          ))}
        </ul>
        <Button href="/#contact" className="mt-10">
          Get in touch in the meantime
        </Button>
      </Reveal>
    </Container>
  );
}
