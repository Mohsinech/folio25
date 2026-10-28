"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects, type ProjectInfo } from "@/app/data";
import styles from "./case.module.css";

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/**
 * Case study page.
 * Scroll effects (all driven from one rAF loop, off for reduced motion):
 * - cover and detail images drift at their own speed ([data-par])
 * - the overview statement darkens word by word
 * - the showcase is a fixed window whose screenshot slides up and down
 */
export default function CaseStudy({ project }: { project: ProjectInfo }) {
  const [cover, second, third] = project.images;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const role = project.details.find(([l]) => l === "Role")?.[1] ?? project.category;
  const words = project.description.split(" ");

  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const statementWords = [...root.querySelectorAll<HTMLElement>("[data-word]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      statementWords.forEach((w) => (w.dataset.on = "true"));
      return;
    }
    const pars = [...root.querySelectorAll<HTMLElement>("[data-par]")];
    const statement = root.querySelector<HTMLElement>("[data-statement]");
    const windowEl = root.querySelector<HTMLElement>("[data-window]");
    const slide = root.querySelector<HTMLElement>("[data-slide]");
    let raf = 0;

    const loop = () => {
      const vh = window.innerHeight;

      for (const el of pars) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const prog = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${prog * -100 * Number(el.dataset.par)}%, 0)`;
      }

      if (statement) {
        const r = statement.getBoundingClientRect();
        const k = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
        const lit = Math.round(k * statementWords.length);
        statementWords.forEach((w, i) => (w.dataset.on = String(i < lit)));
      }

      if (windowEl && slide) {
        // 0 when the window enters at the bottom, 1 when it leaves at the top.
        const r = windowEl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        const travel = slide.offsetHeight - windowEl.offsetHeight;
        slide.style.transform = `translate3d(0, ${-p * travel}px, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [project.slug]);

  return (
    <article ref={rootRef} className={styles.cs}>
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>
            <span>{project.category}</span>
            <span>Case study</span>
          </p>
          <h1 className={styles.title} style={{ viewTransitionName: "read-more" }}>
            <span className={styles.line}>
              <span>{project.title}</span>
            </span>
          </h1>
          <dl className={styles.meta}>
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Live site</dt>
              <dd>
                {project.preview ? (
                  <a href={project.preview} target="_blank" rel="noopener noreferrer">
                    {host(project.preview)}
                  </a>
                ) : (
                  "Private"
                )}
              </dd>
            </div>
          </dl>
        </div>
        <div className={styles.cover}>
          <Image src={cover.src} alt={cover.alt} fill priority sizes="(max-width: 800px) 100vw, 32vw" data-par="0.12" />
        </div>
      </header>

      <section className={styles.statement}>
        <p className={styles.label}>Overview</p>
        <p className={styles.big} data-statement>
          {words.map((w, i) => (
            <span key={i} data-word data-on="false">
              {w}{" "}
            </span>
          ))}
        </p>
      </section>

      <section className={styles.show}>
        <div className={styles.mat}>
          <div className={styles.window} data-window>
            <div className={styles.slide} data-slide>
              <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 800px) 100vw, 90vw" />
            </div>
          </div>
        </div>
      </section>

      <dl className={styles.details}>
        {project.details.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <section className={styles.pair}>
        {[second, third].filter(Boolean).map((img, i) => (
          <figure key={img.src}>
            <div className={styles.shot}>
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 800px) 100vw, 48vw" data-par={i ? "0.16" : "0.08"} />
            </div>
            <figcaption>{img.alt}</figcaption>
          </figure>
        ))}
      </section>

      <section className={styles.notes}>
        <p className={styles.label}>Approach</p>
        <div className={styles.noteList}>
          {project.notes.map(([label, text]) => (
            <div key={label}>
              <p className={styles.label}>{label}</p>
              <p className={styles.noteText}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className={styles.next} aria-label="Next case">
        <p className={styles.nextLabel}>
          <span>Next case</span>
          <span>{next.year}</span>
        </p>
        <Link href={`/work/${next.slug}`} data-vt="true" className={styles.nextTitle}>
          {next.title}
        </Link>
        <Link
          href={`/work/${next.slug}`}
          data-vt="true"
          className={styles.nextThumb}
          aria-hidden="true"
          tabIndex={-1}
        >
          <Image src={next.images[0].src} alt="" fill sizes="260px" />
        </Link>
      </nav>
    </article>
  );
}
