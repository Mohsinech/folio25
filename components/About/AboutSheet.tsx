"use client";

import { useEffect, useRef } from "react";
import { site } from "@/app/data";
import sheet from "@/components/Contact/contact.module.css";
import styles from "./about.module.css";

const services: [string, string][] = [
  ["Websites and landing pages", "Portfolio, brand and campaign sites"],
  ["E-commerce", "WooCommerce, custom stores, WhatsApp checkout"],
  ["Product interfaces", "Dashboards and SaaS frontends"],
  ["Performance and SEO", "Making existing sites faster and easier to find"],
];

const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "Three.js",
  "WordPress",
  "WooCommerce",
];

/** "More about me" panel: same slide-up sheet as the contact form. */
export default function AboutSheet({
  isOpen,
  onClose,
  onContact,
}: {
  isOpen: boolean;
  onClose: () => void;
  onContact: () => void;
}) {
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
        (el) => el.offsetParent !== null,
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
        aria-labelledby="about-title"
        inert={!isOpen}
      >
        <div className={sheet.bar}>
          <p className={sheet.label}>About</p>
          <button type="button" className={sheet.close} onClick={onClose} data-close>
            Close
          </button>
        </div>

        <div className={sheet.body} ref={bodyRef} data-lenis-prevent>
          <div className={sheet.intro}>
            <h2 id="about-title">a bit more about me</h2>
            <div className={sheet.aside}>
              <p>Freelance designer and developer</p>
              <p>Rabat, Morocco. Working with clients worldwide.</p>
            </div>
          </div>

          <div className={styles.rows}>
            <section className={styles.row}>
              <h3>Background</h3>
              <div>
                <p>
                  I&apos;m Mohssine. I design and build websites end to end, from the first layout
                  to the code that ships, so the design and the engineering never drift apart.
                </p>
                <p>
                  I care about the details people feel without noticing: pages that load fast,
                  motion that explains instead of decorates, and stores that are easy to buy from.
                </p>
              </div>
            </section>

            <section className={styles.row}>
              <h3>What I do</h3>
              <dl className={styles.services}>
                {services.map(([name, text]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd>{text}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className={styles.row}>
              <h3>Tools</h3>
              <ul className={styles.tools}>
                {tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>

            <section className={styles.row}>
              <h3>Teaching</h3>
              <p>
                I run MilcodeUni, a coding academy, and host free live sessions for beginners
                learning React, Next.js, Git and GitHub.
              </p>
            </section>

            <section className={styles.row}>
              <h3>Currently</h3>
              <p>
                Building Bentofolio, a portfolio builder for creatives. Open to freelance projects
                and remote roles.
              </p>
            </section>

            <section className={styles.row}>
              <h3>Elsewhere</h3>
              <p className={styles.links}>
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </p>
            </section>
          </div>

          <div className={sheet.sendRow}>
            <p className={sheet.mono}>Like what you see?</p>
            <button type="button" className={sheet.send} onClick={onContact}>
              Let&apos;s talk
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
