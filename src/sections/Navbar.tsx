"use client";

import { useActiveSection } from "@/hooks/useActiveSection";

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.08)] bg-background/90 backdrop-blur-md">
      <nav className="flex w-full items-center justify-between px-6 py-4 font-mono text-xs uppercase tracking-[0.22em] sm:px-10 lg:px-16">
        <a href="#" className="text-text-main transition-colors duration-200 hover:text-primary">
          Lalit Kumar Vaddina
        </a>

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
    </header>
  );
}
