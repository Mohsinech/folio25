"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // 1. The "Snellenberg" Feel (Heavy & Smooth)
      // Lower values = heavier/slower feel.
      // 0.1 is the sweet spot for that "luxury" web feel.
      lerp: 0.07,

      // Alternative: use duration if you prefer time-based
      // duration: 1.2,

      // 2. Multipliers (Tweak these if it feels too slow on trackpads)
      wheelMultiplier: 1,
      touchMultiplier: 2,

      // 3. Performance & Logic
      infinite: false, // Turn true if you want infinite loop
    });

    // 4. Sync GSAP ScrollTrigger (CRITICAL for animations)
    // Lenis tells ScrollTrigger exactly where the scroll is
    lenis.on("scroll", ScrollTrigger.update);

    // 5. The Animation Loop
    // Instead of using Lenis's own requestAnimationFrame, we plug it
    // into GSAP's ticker. This keeps scroll & animations in perfect sync.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 6. Disable GSAP's lag smoothing
    // This prevents GSAP from "jumping" to catch up, which breaks the smooth feel
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return null; // This component renders nothing visually
}
