import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const viewportFocusY = window.innerHeight * 0.42;
      let nextActiveSection = "";
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const isNearViewport = rect.bottom >= 0 && rect.top <= window.innerHeight;

        if (!isNearViewport) return;

        if (rect.top <= viewportFocusY && rect.bottom >= viewportFocusY) {
          nextActiveSection = id;
          closestDistance = 0;
          return;
        }

        const distance = Math.min(Math.abs(rect.top - viewportFocusY), Math.abs(rect.bottom - viewportFocusY));
        if (distance < closestDistance) {
          nextActiveSection = id;
          closestDistance = distance;
        }
      });

      setActiveSection(nextActiveSection);
    };

    let frameId = 0;
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sectionIds]);

  return activeSection;
}
