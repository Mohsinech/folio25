"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  useEffect(() => {
    // Dennis Snellenberg's exact Lenis configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    const onTick = (time: number) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    };

    gsap.ticker.add(onTick);

    // Disable lag smoothing in GSAP to match the smooth scroll
    gsap.ticker.lagSmoothing(0);

    // Optional: Add window resize listener for ScrollTrigger refresh
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      lenis.destroy();
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(onTick);
    };
  }, []);

  return null;
}
