import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
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
  title: "Lalit Kumar Vaddina | Aspiring AI Engineer",
  description: "A raw, single-scroll portfolio for Lalit Kumar Vaddina, aspiring AI engineer.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lalit.dev"),
  alternates: {
    canonical: "/",
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
      </body>
    </html>
  );
}
