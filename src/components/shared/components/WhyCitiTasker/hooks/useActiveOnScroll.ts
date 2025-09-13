import { useState, useEffect } from "react";

export const useActiveOnScroll = (selector: string, offset = 0) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll(selector));
      const scrollPos = window.scrollY + offset + window.innerHeight / 2;

      const currentIndex = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const bottom = top + rect.height;
        return scrollPos >= top && scrollPos < bottom;
      });

      if (currentIndex !== -1) {
        setActiveIndex(currentIndex);
      }
    };

    handleScroll(); // run on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selector, offset]);

  return activeIndex;
};
