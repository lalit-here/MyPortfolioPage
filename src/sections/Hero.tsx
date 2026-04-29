"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const NAME = "Lalit";
const TITLE = "Aspiring AI Engineer";
const TAGLINE = "Making AI do the heavy lifting since day one.";
const CHAR_DELAY = 0.08;
const TITLE_DELAY = NAME.length * CHAR_DELAY + 0.2;
const TAGLINE_DELAY = TITLE_DELAY + TITLE.length * CHAR_DELAY + 0.25;
const CTA_DELAY = TAGLINE_DELAY + 0.45;
const POP_INTERVAL_MS = 2500;
const BASE_POP_INTENSITY = 0.45;

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isHeroActive, setIsHeroActive] = useState(true);
  const [popTick, setPopTick] = useState(0);
  const [popIntensity, setPopIntensity] = useState(BASE_POP_INTENSITY);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode) return;

    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let lastTriggerTime = 0;

    const triggerPop = (intensity = BASE_POP_INTENSITY) => {
      setPopIntensity(Math.max(0.3, Math.min(1, intensity)));
      setPopTick((prev) => prev + 1);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroActive(entry.isIntersecting && entry.intersectionRatio > 0.55);
      },
      {
        threshold: [0.2, 0.4, 0.55, 0.75, 1],
      },
    );
    observer.observe(sectionNode);

    const handleScroll = () => {
      if (!isHeroActive) return;

      const now = performance.now();
      const deltaY = Math.abs(window.scrollY - lastScrollY);
      const deltaT = Math.max(16, now - lastScrollTime);
      const speed = deltaY / deltaT;
      const sinceLastTrigger = now - lastTriggerTime;

      if (speed > 0.45 && sinceLastTrigger > 280) {
        const intensity = BASE_POP_INTENSITY + Math.min(0.5, speed * 0.22);
        triggerPop(intensity);
        lastTriggerTime = now;
      }

      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };

    // Initial hero landing pulse.
    const initialPulse = window.setTimeout(() => triggerPop(BASE_POP_INTENSITY), 350);
    const intervalId = window.setInterval(() => {
      if (isHeroActive) triggerPop(BASE_POP_INTENSITY);
    }, POP_INTERVAL_MS);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(initialPulse);
      window.clearInterval(intervalId);
    };
  }, [isHeroActive]);

  return (
    <section ref={sectionRef} id="top" className="relative isolate flex h-screen overflow-hidden px-6 text-left sm:px-10 lg:px-16">
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

      <motion.div
        key={popTick}
        aria-hidden="true"
        initial={{ opacity: 0, x: "58%", y: "72%", scale: 0.8, rotate: -22 }}
        animate={
          isHeroActive
            ? {
                opacity: [0, 1, 1, 0.15, 0],
                x: ["58%", "12%", "12%", "34%", "58%"],
                y: ["72%", "8%", "8%", "42%", "72%"],
                scale: [0.8, 1.14 + popIntensity * 0.12, 1.12 + popIntensity * 0.1, 0.92, 0.8],
                rotate: [-24, -7, -7, -14, -22],
              }
            : { opacity: 0, x: "58%", y: "72%", scale: 0.8, rotate: -22 }
        }
        transition={{
          duration: 3.4,
          times: [0, 0.26, 0.62, 0.82, 1],
          ease: ["easeOut", "easeInOut", "easeIn"],
        }}
        className="pointer-events-none absolute bottom-0 right-0 z-20 origin-bottom-right select-none [perspective:1000px]"
      >
        <Image
          src="/hero-photo.png"
          alt="Portrait of Lalit"
          width={640}
          height={640}
          priority
          className="h-auto w-[clamp(360px,48vw,820px)] mix-blend-screen"
        />
      </motion.div>
    </section>
  );
}
