import { ImageResponse } from "next/og";

export const alt = "B&JEvents — Events & Conference Hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#123F37",
          color: "#FAFAF7",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4 }}>B&J EVENTS</div>
        <div style={{ fontSize: 68, lineHeight: 1.05, maxWidth: 900 }}>
          Where great ideas become extraordinary experiences.
        </div>
        <div style={{ fontSize: 28, color: "#E5EFE4" }}>Events & Conference Hub</div>
      </div>
    ),
    size,
  );
}
