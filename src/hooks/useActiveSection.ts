import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const visibleSections = new Map<string, number>();

    const updateActiveSection = () => {
      let mostVisibleId = "";
      let highestRatio = 0;

      visibleSections.forEach((ratio, id) => {
        if (ratio > highestRatio) {
          mostVisibleId = id;
          highestRatio = ratio;
        }
      });

      setActiveSection(mostVisibleId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        updateActiveSection();
      },
      { threshold: 0.4 },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      visibleSections.clear();
    };
  }, [sectionIds]);

  return activeSection;
}
