"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";

const depthTicks = ["01", "02", "03", "04", "05", "06"];
const sections = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "blog", label: "Blog" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
const sectionIds = sections.map((section) => section.id);

export function ScrollChoreography() {
  const activeSection = useActiveSection(sectionIds);
  const activeLabel = sections.find((section) => section.id === activeSection)?.label ?? "Intro";
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.7,
  });
  const glowOpacity = useTransform(progress, [0, 0.12, 0.9, 1], [0, 0.5, 0.5, 0]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] hidden 2xl:block">
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute right-14 top-[11vh] font-mono text-[10px] uppercase tracking-[0.24em] text-text-muted/55"
      >
        Scroll / {activeLabel}
      </motion.div>
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute right-10 top-[18vh] h-[64vh] w-px bg-[linear-gradient(to_bottom,transparent,rgba(74,222,128,0.2),rgba(250,204,21,0.18),transparent)]"
      />
      <div className="absolute right-10 top-[18vh] h-[64vh] w-px bg-[rgba(240,253,244,0.06)]">
        <motion.div
          style={{ scaleY: progress }}
          className="h-full origin-top bg-[linear-gradient(to_bottom,#4ade80,#facc15)] shadow-[0_0_18px_rgba(74,222,128,0.28)]"
        />
      </div>
      <div className="absolute right-14 top-[18vh] flex h-[64vh] flex-col justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted/45">
        {depthTicks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </div>
  );
}
