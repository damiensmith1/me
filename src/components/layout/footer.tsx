import { siteConfig, socialLinks } from "@/lib/content";
import { Container } from "@/components/ui/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Container className="flex flex-wrap justify-between gap-4 pt-10 pb-16 font-mono text-xs text-muted">
        <span>
          &copy; {year} {siteConfig.name}
        </span>
        <div className="flex gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
