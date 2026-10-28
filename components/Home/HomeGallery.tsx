"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ProjectInfo } from "@/app/data";
import styles from "./home.module.css";

type Tile = { project: ProjectInfo; src: string };

/**
 * Endless horizontal strip of project images. Drag, scroll or use the arrow
 * keys; it glides with momentum and loops by keeping the view inside the
 * middle of three identical copies.
 */
export default function HomeGallery({ projects }: { projects: ProjectInfo[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // Interleave every project's images so the strip reads like an archive.
  const tiles: Tile[] = [0, 1, 2].flatMap((i) =>
    projects.filter((p) => p.images[i]).map((p) => ({ project: p, src: p.images[i].src })),
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const strip = stripRef.current;
    if (!wrap || !strip) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let setW = strip.scrollWidth / 3;
    let x = -setW;
    let target = -setW;
    let down = false;
    let startX = 0;
    let startT = 0;
    let lastX = 0;
    let vel = 0;
    let moved = 0;
    let raf = 0;

    const ro = new ResizeObserver(() => {
      const ratio = (x % setW) / setW || 0;
      setW = strip.scrollWidth / 3;
      x = target = -setW + ratio * setW;
    });
    ro.observe(strip);

    const onDown = (e: PointerEvent) => {
      down = true;
      moved = 0;
      startX = lastX = e.clientX;
      startT = target;
      vel = 0;
      wrap.dataset.dragging = "true";
      wrap.dataset.suppressClick = "false";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      vel = e.clientX - lastX;
      lastX = e.clientX;
      target = startT + dx * 1.2;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      wrap.dataset.dragging = "false";
      // Mark a real drag so the click that follows doesn't open a project.
      if (moved > 6) wrap.dataset.suppressClick = "true";
      target += vel * 14;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target -= (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 1.1;
    };
    // A drag should never count as a click on a tile.
    const onClick = (e: MouseEvent) => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
      wrap.dataset.suppressClick = "false";
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [role='dialog']")) return;
      if (e.key === "ArrowRight") target -= 320;
      if (e.key === "ArrowLeft") target += 320;
    };

    wrap.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    wrap.addEventListener("wheel", onWheel, { passive: false });
    wrap.addEventListener("click", onClick, true);
    window.addEventListener("keydown", onKey);

    const imgs = [...strip.querySelectorAll<HTMLElement>("[data-parallax]")];
    const loop = () => {
      x += (target - x) * (reduced ? 1 : 0.085);
      if (x > 0) {
        x -= setW;
        target -= setW;
      }
      if (x < -2 * setW) {
        x += setW;
        target += setW;
      }
      strip.style.transform = `translate3d(${x}px, 0, 0)`;

      if (!reduced) {
        const vw = window.innerWidth;
        for (const img of imgs) {
          const r = img.parentElement!.getBoundingClientRect();
          if (r.right < 0 || r.left > vw) continue;
          const c = (r.left + r.width / 2 - vw / 2) / vw;
          img.style.transform = `translate3d(${c * -8}%, 0, 0)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      wrap.removeEventListener("wheel", onWheel);
      wrap.removeEventListener("click", onClick, true);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={styles.stripWrap}
      data-dragging="false"
      data-suppress-click="false"
      data-lenis-prevent
      aria-label="Selected work"
      role="region"
    >
      <div ref={stripRef} className={styles.strip}>
        {[0, 1, 2].map((copy) =>
          tiles.map((t, i) => (
            <Link
              key={`${copy}-${i}`}
              href={`/work/${t.project.slug}`}
              data-vt="true"
              className={styles.tile}
              draggable={false}
              aria-hidden={copy !== 1 || undefined}
              tabIndex={copy !== 1 ? -1 : undefined}
            >
              <span className={styles.label}>
                <span>{t.project.title}</span>
                <span>{t.project.year}</span>
              </span>
              <span className={styles.frame}>
                <Image
                  src={t.src}
                  alt={copy === 1 ? t.project.title : ""}
                  fill
                  sizes="(max-width: 600px) 76vw, 380px"
                  draggable={false}
                  data-parallax
                  priority={copy === 1 && i < 4}
                />
              </span>
            </Link>
          )),
        )}
      </div>
    </div>
  );
}
