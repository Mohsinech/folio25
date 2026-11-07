"use client";

import { useEffect, useRef } from "react";
import styles from "./eyes.module.css";

const LEFT = 7.5;
const RIGHT = 20.5;
const CY = 10;

/**
 * A pair of outlined eyes that sit inline in text, look toward the cursor and blink.
 * Purely decorative (aria-hidden).
 */
export default function Eyes() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const pupils = [...svg.querySelectorAll<SVGCircleElement>("[data-pupil]")];
    const cur = pupils.map(() => ({ x: 0, y: 0 }));
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      const r = svg.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        const s = r.width / 28;
        pupils.forEach((p, i) => {
          const cx = r.left + (i ? RIGHT : LEFT) * s;
          const cy = r.top + CY * s;
          const dx = mx - cx;
          const dy = my - cy;
          const d = Math.hypot(dx, dy) || 1;
          const k = Math.min(1, d / 120);
          cur[i].x += ((dx / d) * k * 2.6 - cur[i].x) * 0.2;
          cur[i].y += ((dy / d) * k * 4.6 - cur[i].y) * 0.2;
          p.setAttribute("transform", `translate(${cur[i].x.toFixed(2)} ${cur[i].y.toFixed(2)})`);
        });
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <span className={styles.eyes} aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 28 20">
        {[LEFT, RIGHT].map((cx) => (
          <g key={cx} className={styles.lid}>
            <ellipse className={styles.ball} cx={cx} cy={CY} rx="5.6" ry="8.8" />
            <circle className={styles.pupil} cx={cx} cy={CY} r="2.4" data-pupil />
          </g>
        ))}
      </svg>
    </span>
  );
}
