// Mirrors the light theme CSS variables in src/app/globals.css. Next.js's
// ImageResponse (OG image, icon, apple-icon) and the web manifest can't read
// CSS custom properties, so this is the non-CSS source of truth for those
// generators — update both places together if the palette changes.
export const palette = {
  background: "#f2f3ef",
  foreground: "#15181b",
  muted: "#5d636a",
  accent: "#2847c9",
} as const;
