import { heroContent, siteConfig, socialLinks } from "@/lib/content";
import { Row } from "@/components/ui/row";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@/components/icons";

export function Hero() {
  return (
    <Row
      className="md:pt-22 md:pb-16"
      rail={heroContent.rail.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 font-mono text-xs font-medium">
        <span className="h-2 w-2 rounded-full bg-accent" />
        {heroContent.status}
      </span>

      <h1 className="mt-6 mb-6 font-display text-[clamp(3rem,9vw,6.2rem)] leading-[0.92] font-bold tracking-[-0.045em] text-balance">
        {siteConfig.name}
      </h1>

      <p className="mb-8 max-w-[34rem] text-[1.4rem] leading-[1.45] text-pretty">
        {heroContent.lede.before}
        <em className="text-accent">{heroContent.lede.emphasis}</em>
        {heroContent.lede.after}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button href={siteConfig.links.resume} download>
          <DownloadIcon className="h-4 w-4" />
          Download résumé
        </Button>
        {socialLinks.map((link) => (
          <Button key={link.label} href={link.href} variant="secondary">
            {link.label} ↗
          </Button>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap gap-6 font-mono text-xs text-muted">
        {heroContent.meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </Row>
  );
}
