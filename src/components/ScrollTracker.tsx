"use client";

import { useEffect } from "react";
import { gtagEvent } from "@/lib/gtag";

export default function ScrollTracker() {
  useEffect(() => {
    function onScroll() {
      const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (scrolled > 0.5) {
        gtagEvent("scroll_50");
      }
      if (scrolled > 0.9) {
        gtagEvent("scroll_90");
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}