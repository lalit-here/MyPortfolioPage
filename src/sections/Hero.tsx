"use client";

import { motion } from "framer-motion";

const NAME = "Lalit";
const TITLE = "Aspiring AI Engineer";
const TAGLINE = "Making AI do the heavy lifting since day one.";
const CHAR_DELAY = 0.08;
const TITLE_DELAY = NAME.length * CHAR_DELAY + 0.2;
const TAGLINE_DELAY = TITLE_DELAY + TITLE.length * CHAR_DELAY + 0.25;
const CTA_DELAY = TAGLINE_DELAY + 0.45;

type TypewriterLineProps = {
  text: string;
  delay?: number;
  className?: string;
};

function TypewriterLine({ text, delay = 0, className }: TypewriterLineProps) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * CHAR_DELAY, duration: 0.01 }}
          className="inline-block"
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate flex h-screen overflow-hidden px-6 text-left sm:px-10 lg:px-16">
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.16]"
      >
        <filter id="hero-noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise-filter)" />
      </svg>

      <div className="flex w-full max-w-[1200px] flex-col justify-center pt-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.45em] text-text-muted"
        >
          Portfolio / AI Engineering
        </motion.p>

        <h1 className="font-heading text-[clamp(4rem,12vw,10rem)] font-black leading-[0.85] tracking-[-0.06em]">
          <TypewriterLine
            text={NAME}
            className="bg-[linear-gradient(to_right,#4ade80_0%,#facc15_100%)] bg-clip-text text-transparent"
          />
        </h1>

        <h2 className="mt-6 max-w-5xl font-heading text-[clamp(2rem,5vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.05em] text-text-main">
          <TypewriterLine text={TITLE} delay={TITLE_DELAY} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: TAGLINE_DELAY, duration: 0.5, ease: "easeOut" }}
          className="mt-8 max-w-2xl font-mono text-[clamp(1rem,1.6vw,1.125rem)] leading-8 text-text-muted"
        >
          {TAGLINE}
        </motion.p>

        <motion.a
          href="#work"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: CTA_DELAY, duration: 0.45, ease: "easeOut" }}
          className="mt-10 inline-flex w-fit rounded-[2px] border-[1.5px] border-primary bg-transparent px-7 py-4 font-heading text-sm font-bold uppercase tracking-[0.28em] text-primary transition-colors duration-200 hover:bg-primary hover:text-background focus-visible:bg-primary focus-visible:text-background"
        >
          View My Work
        </motion.a>
      </div>
    </section>
  );
}
