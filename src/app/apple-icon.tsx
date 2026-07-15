import { ImageResponse } from "next/og";
import { palette } from "@/lib/palette";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: palette.background,
          color: palette.accent,
          fontSize: 96,
          fontWeight: 700,
        }}
      >
        D
      </div>
    ),
    { ...size },
  );
}
