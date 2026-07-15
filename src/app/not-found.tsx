import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        404
      </p>
      <h1 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        The page you&apos;re looking for isn&apos;t here. It might have moved,
        or the URL might be off.
      </p>
      <Button href="/" className="mt-8">
        Back to Home
      </Button>
    </Container>
  );
}
