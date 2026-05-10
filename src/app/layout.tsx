import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { getCanonicalSiteUrl } from "@/lib/site-config";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: getCanonicalSiteUrl(),
  title: "Lalit Kumar Vaddina | Aspiring AI Engineer",
  description: "Portfolio of Lalit Kumar Vaddina, an aspiring AI engineer building practical AI systems and frontend experiences.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lalit Kumar Vaddina | Aspiring AI Engineer",
    description: "Building practical AI systems, agentic workflows, and sharp frontend experiences.",
    url: "/",
    siteName: "Lalit Kumar Vaddina Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lalit Kumar Vaddina portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lalit Kumar Vaddina | Aspiring AI Engineer",
    description: "Building practical AI systems, agentic workflows, and sharp frontend experiences.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
