"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useState } from "react";

const links = [
  { id: "work", href: "#work", label: "Work" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "education", href: "#education", label: "Education" },
  { id: "blog", href: "#blog", label: "Blog" },
  { id: "about", href: "#about", label: "About" },
  { id: "contact", href: "#contact", label: "Contact" },
];

const sectionIds = links.map((link) => link.id);

export function Navbar() {
  const activeSection = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

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

        <div className="hidden items-center gap-6 text-text-muted lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={activeSection === link.id ? "text-accent" : "transition-colors duration-200 hover:text-primary"}
            >
              {link.label}
            </a>
          ))}
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
