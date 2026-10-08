import { resumeContent, siteConfig } from "@/lib/content";
import { Row } from "@/components/ui/row";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@/components/icons";

export function Resume() {
  return (
    <Row id="resume" rail="Résumé" last>
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-[10px] border border-rule p-7">
        <p className="text-muted">
          <strong className="mb-1 block font-display text-xl font-bold text-foreground">
            {resumeContent.title}
          </strong>
          {resumeContent.detail}
        </p>
        <Button href={siteConfig.links.resume} download>
          <DownloadIcon className="h-4 w-4" />
          {resumeContent.cta}
        </Button>
      </div>
    </Row>
  );
}
