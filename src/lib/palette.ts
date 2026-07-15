// Mirrors the theme CSS variables in src/app/globals.css. Next.js's
// ImageResponse (OG image, icon, apple-icon) and the web manifest can't read
// CSS custom properties, so this is the non-CSS source of truth for those
// generators — update both places together if the palette changes.
export const palette = {
  background: "#f7f2e7",
  foreground: "#2b2420",
  muted: "#6e6255",
  accent: "#4a5d3f",
} as const;
