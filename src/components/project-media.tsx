import Image from "next/image";
import type { Project, ProjectMedia } from "@/lib/projects";
import { cn } from "@/lib/utils";

// A 16:10 frame that shows one screenshot or video, or a hatched placeholder
// until media is added for the project.
export function MediaFrame({
  media,
  project,
  className,
  sizes = "(min-width: 768px) 40rem, 100vw",
  priority,
}: {
  media?: ProjectMedia;
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const frame = "relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-rule bg-surface";

  if (!media) {
    return (
      <div
        className={cn(frame, "grid place-items-center", className)}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--rule) 0 1px, transparent 1px 12px)",
        }}
      >
        <span className="rounded bg-background px-2.5 py-1 font-mono text-xs text-muted">
          {project.name} · screenshot coming soon
        </span>
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <video
        className={cn(frame, "object-cover", className)}
        src={media.src}
        width={media.width}
        height={media.height}
        aria-label={media.alt}
        controls
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <div className={cn(frame, className)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
    </div>
  );
}

// Full gallery for a project page: the first item large, the rest in a grid.
export function MediaGallery({ project }: { project: Project }) {
  const [first, ...rest] = project.media;

  return (
    <div className="grid gap-4">
      <figure className="grid gap-2">
        <MediaFrame media={first} project={project} priority sizes="(min-width: 1024px) 60rem, 100vw" />
        {first?.caption ? (
          <figcaption className="font-mono text-xs text-muted">{first.caption}</figcaption>
        ) : null}
      </figure>
      {rest.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {rest.map((media) => (
            <figure key={media.src} className="grid gap-2">
              <MediaFrame media={media} project={project} sizes="(min-width: 768px) 30rem, 100vw" />
              {media.caption ? (
                <figcaption className="font-mono text-xs text-muted">{media.caption}</figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
