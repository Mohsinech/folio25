"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/app/data";
import sheet from "@/components/Contact/contact.module.css";
import rows from "@/components/About/about.module.css";
import styles from "./latest.module.css";

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** "Latest project" panel: same slide-up sheet as contact and about, showing the newest project. */
export default function LatestSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const project = projects[0];
  const [cover, ...rest] = project.images;
  const ref = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Lock page scroll, start at the top, focus Close, restore focus afterwards.
  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    bodyRef.current?.scrollTo({ top: 0 });
    const id = setTimeout(() => ref.current?.querySelector<HTMLElement>("[data-close]")?.focus(), 60);
    return () => {
      clearTimeout(id);
      html.style.overflow = prev;
      lastFocus.current?.focus?.();
    };
  }, [isOpen]);

  // Escape closes; Tab stays inside the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const f = [...ref.current.querySelectorAll<HTMLElement>("button, a[href]")].filter(
        (el) => el.offsetParent !== null && el.tabIndex !== -1,
      );
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault();
        f[0].focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <>
      <div className={sheet.scrim} data-open={isOpen} onClick={onClose} aria-hidden="true" data-lenis-prevent />
      <section
        ref={ref}
        className={sheet.sheet}
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="latest-title"
        inert={!isOpen}
      >
        <div className={sheet.bar}>
          <p className={sheet.label}>Latest project</p>
          <button type="button" className={sheet.close} onClick={onClose} data-close>
            Close
          </button>
        </div>

        <div className={sheet.body} ref={bodyRef} data-lenis-prevent>
          <div className={sheet.intro}>
            <h2 id="latest-title">{project.title.toLowerCase()}</h2>
            <div className={sheet.aside}>
              <p>{project.summary}</p>
              <p>
                {project.category}, {project.year}
              </p>
            </div>
          </div>

          <div className={styles.cover}>
            <div className={styles.shot}>
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 980px) 100vw, 900px" />
            </div>
          </div>

          {rest.length > 0 && (
            <div className={styles.strip}>
              {rest.map((img) => (
                <div key={img.src} className={styles.shot}>
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 980px) 50vw, 450px" />
                </div>
              ))}
            </div>
          )}

          <div className={`${rows.rows} ${styles.rows}`}>
            {project.details.map(([label, value]) => (
              <section key={label} className={rows.row}>
                <h3>{label}</h3>
                <p>{value}</p>
              </section>
            ))}
          </div>

          <div className={styles.end}>
            {project.preview ? (
              <a className={styles.live} href={project.preview} target="_blank" rel="noopener noreferrer">
                Visit {host(project.preview)}
              </a>
            ) : (
              <span />
            )}
            <Link href={`/work/${project.slug}`} data-vt="true" className={sheet.send}>
              Read the case study
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
