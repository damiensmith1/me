import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/content";
import { palette } from "@/lib/palette";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: palette.background,
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: palette.accent,
          }}
        >
          damiensmith.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 600,
              color: palette.foreground,
              letterSpacing: -2,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 34,
              color: palette.muted,
            }}
          >
            Backend & Full-Stack Software Engineer
          </div>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <div
            style={{
              display: "flex",
              width: 48,
              height: 4,
              background: palette.accent,
            }}
          />
          <div style={{ display: "flex", fontSize: 24, color: palette.muted }}>
            Distributed systems · Cloud infrastructure · AI-powered software
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
