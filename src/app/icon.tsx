import { ImageResponse } from "next/og";
import { palette } from "@/lib/palette";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        D
      </div>
    ),
    { ...size },
  );
}
