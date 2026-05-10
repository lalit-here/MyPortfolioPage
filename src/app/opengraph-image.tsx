import { ImageResponse } from "next/og";
import { getSiteHostnameLabel } from "@/lib/site-config";

export const runtime = "edge";
export const alt = "Lalit Kumar Vaddina portfolio preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  const siteLabel = getSiteHostnameLabel();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#f0fdf4",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 24%, rgba(74,222,128,0.24), transparent 34%), radial-gradient(circle at 78% 70%, rgba(250,204,21,0.18), transparent 34%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              color: "#6b7280",
              fontSize: 24,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            Portfolio / AI Engineering
          </div>
          <div
            style={{
              fontSize: 108,
              lineHeight: 0.88,
              fontWeight: 900,
              letterSpacing: "-0.06em",
              background: "linear-gradient(90deg, #4ade80 0%, #facc15 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Lalit Kumar Vaddina
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#f0fdf4" }}>Aspiring AI Engineer</div>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(240,253,244,0.16)",
            paddingTop: "28px",
            color: "#6b7280",
            fontSize: 26,
          }}
        >
          <span>Agentic AI / LLMs / Frontend</span>
          <span style={{ color: "#4ade80" }}>{siteLabel}</span>
        </div>
      </div>
    ),
    size,
  );
}
