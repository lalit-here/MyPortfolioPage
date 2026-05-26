"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useEffect, useRef, useState } from "react";

const links = [
  { id: "work", href: "#work", label: "Work" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "education", href: "#education", label: "Education" },
  { id: "blog", href: "#blog", label: "Blog" },
  { id: "about", href: "#about", label: "About" },
  { id: "contact", href: "#contact", label: "Contact" },
];

const sectionIds = links.map((link) => link.id);

type ActiveHue = {
  opacity: number;
  width: number;
  x: number;
};

export function Navbar() {
  const activeSection = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const desktopLinksRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [activeHue, setActiveHue] = useState<ActiveHue>({ opacity: 0, width: 0, x: 0 });

  useEffect(() => {
    const desktopLinks = desktopLinksRef.current;
    const activeLink = linkRefs.current[activeSection];

    if (!desktopLinks || !activeLink) {
      setActiveHue((current) => ({ ...current, opacity: 0 }));
      return;
    }

    const updateHuePosition = () => {
      const containerRect = desktopLinks.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const width = Math.max(28, Math.min(54, linkRect.width + 12));

      setActiveHue({
        opacity: 1,
        width,
        x: linkRect.left - containerRect.left + linkRect.width / 2 - width / 2,
      });
    };

    updateHuePosition();

    const frameId = window.requestAnimationFrame(updateHuePosition);
    window.addEventListener("resize", updateHuePosition);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateHuePosition);
    };
  }, [activeSection]);

  return (
    <header className="sticky top-0 z-50 w-full max-w-[100vw] overflow-x-hidden border-b border-[rgba(255,255,255,0.08)] bg-background/90 backdrop-blur-md">
      <nav className="flex w-full min-w-0 max-w-full items-center justify-between gap-3 px-6 py-4 font-mono text-xs uppercase tracking-[0.22em] sm:px-10 lg:px-16">
        <a
          href="#"
          className="min-w-0 max-w-[58%] truncate text-text-main transition-colors duration-200 hover:text-primary sm:max-w-none"
        >
          Lalit Kumar Vaddina
        </a>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="inline-flex items-center gap-2 border border-[rgba(240,253,244,0.15)] px-3 py-2 text-text-main transition-colors duration-200 hover:border-primary hover:text-primary lg:hidden"
        >
          Menu
        </button>

        <div ref={desktopLinksRef} className="relative hidden items-center gap-6 text-text-muted lg:flex">
          <motion.span
            aria-hidden="true"
            animate={activeHue}
            transition={{ type: "spring", stiffness: 155, damping: 28, mass: 0.9 }}
            className="pointer-events-none absolute -bottom-2 left-0 h-px bg-[linear-gradient(90deg,transparent,#facc15,transparent)] shadow-[0_0_16px_rgba(250,204,21,0.38)]"
          />
          {links.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                ref={(node) => {
                  linkRefs.current[link.id] = node;
                }}
                href={link.href}
                className={`relative transition-colors duration-300 ${isActive ? "text-accent" : "hover:text-primary"}`}
              >
                {link.label}
              </a>
            );
          })}
          </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto border-t border-[rgba(240,253,244,0.08)] bg-[rgba(5,5,5,0.96)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] backdrop-blur-md sm:px-10 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-2 text-text-muted sm:gap-3">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    activeSection === link.id
                      ? "border border-[rgba(250,204,21,0.45)] px-2 py-2.5 text-center text-accent"
                      : "border border-transparent px-2 py-2.5 text-center transition-colors duration-200 hover:text-primary"
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
