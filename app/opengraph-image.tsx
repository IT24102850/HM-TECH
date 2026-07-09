import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HM Tech — Innovate. Build. Transform.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #A78BFA 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 84,
              height: 84,
              borderRadius: 20,
              background: "rgba(255,255,255,0.16)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 700,
              color: "white",
            }}
          >
            HM
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "white" }}>
            HM Tech
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Innovate. Build. Transform.
        </div>
      </div>
    ),
    { ...size }
  );
}
