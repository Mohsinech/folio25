"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ScrambleSimple from "@/utils/ScrambleSimple/ScrambleSimple";
import { ScrambleLink } from "@/utils";
import { useContact } from "@/components/Contact/ContactProvider";
import { site } from "@/app/data";
import LocalTime from "./LocalTime";
import styles from "./header.module.css";

const EASE = [0.65, 0.05, 0, 1] as const;

const dropMotion = {
  initial: { clipPath: "inset(0% 0% 100% 0% round 10px)", opacity: 0 },
  animate: { clipPath: "inset(0% 0% 0% 0% round 10px)", opacity: 1 },
  exit: { clipPath: "inset(0% 0% 100% 0% round 10px)", opacity: 0 },
  transition: { duration: 0.6, ease: EASE },
};

type Drop = "socials" | "menu" | null;

const Header = () => {
  const pathname = usePathname();
  const contact = useContact();
  const [drop, setDrop] = useState<Drop>(null);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Hide on scroll down, show again as soon as the visitor scrolls up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns and the modal on route change.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setDrop(null);
      setHidden(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  // Click outside or Escape closes the open dropdown.
  useEffect(() => {
    if (!drop) return;
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setDrop(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrop(null);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [drop]);

  const openLatest = () => {
    setDrop(null);
    contact.openLatest();
  };

  const openContact = () => {
    setDrop(null);
    contact.open("project");
  };

  const toggle = (d: Exclude<Drop, null>) => setDrop((cur) => (cur === d ? null : d));

  return (
    <>
      <header
        ref={headerRef}
        className={styles.header}
        data-hidden={hidden && !drop}
      >
        <div className={styles.logo}>
          <ScrambleLink
            data-vt="true"
            view-transition-name="logo"
            className={styles.h1}
            href="/"
            label="MOHSSINE"
          />
          <span className={styles.role}>Designer &amp; developer</span>
        </div>

        <p className={styles.status}>
          <span className={styles.avail}>
            <span className={styles.dot} aria-hidden="true" />
            Available for work
          </span>
          <LocalTime />
        </p>

        <nav className={styles.nav} aria-label="Main">
          <button
            type="button"
            className={`${styles.btn} ${styles.hideSm}`}
            onClick={openLatest}
            aria-haspopup="dialog"
          >
            <ScrambleSimple label="Latest project" />
          </button>

          <div className={`${styles.drop} ${styles.hideSm}`}>
            <button
              type="button"
              className={`${styles.btn} ${drop === "socials" ? styles.btnActive : ""}`}
              aria-expanded={drop === "socials"}
              aria-controls="header-socials"
              onClick={() => toggle("socials")}
            >
              <ScrambleSimple label="Socials" />
              <span className={styles.plus} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {drop === "socials" && (
                <motion.ul id="header-socials" className={styles.dropList} {...dropMotion}>
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.label}
                        <span className={styles.tag}>{s.tag}</span>
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            aria-haspopup="dialog"
            onClick={openContact}
          >
            <ScrambleSimple label="Let's talk" />
          </button>

          <div className={`${styles.drop} ${styles.showSm}`}>
            <button
              type="button"
              className={`${styles.btn} ${drop === "menu" ? styles.btnActive : ""}`}
              aria-expanded={drop === "menu"}
              aria-controls="header-menu"
              onClick={() => toggle("menu")}
            >
              <ScrambleSimple label="Menu" />
              <span className={styles.plus} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {drop === "menu" && (
                <motion.ul id="header-menu" className={styles.dropList} {...dropMotion}>
                  <li>
                    <button type="button" onClick={openLatest}>
                      Latest project
                    </button>
                  </li>
                  <li>
                    <a href="/" data-vt="true">
                      All work
                    </a>
                  </li>
                  <li>
                    <hr />
                  </li>
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <hr />
                  </li>
                  <li className={styles.meta}>
                    <span>Available for work</span>
                    <LocalTime />
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </header>

    </>
  );
};

export default Header;
