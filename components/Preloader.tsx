"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./preloader.module.css";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.body.style.overflow = "hidden";

    const holdTime = prefersReducedMotion ? 200 : 1600;
    const exitTime = prefersReducedMotion ? 0 : 900;
    const markDone = () => {
      (
        window as Window & {
          __portfolioIntroDone?: boolean;
        }
      ).__portfolioIntroDone = true;
      window.dispatchEvent(new Event("portfolio-preloader-done"));
    };

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
      markDone();

      window.setTimeout(() => {
        document.body.style.overflow = "";
      }, exitTime);
    }, holdTime);

    return () => {
      window.clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.preloader}
          initial={{
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 12%)",
          }}
          transition={{ duration: 0.9, ease: [0.65, 0.05, 0, 1] }}
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <span className={styles.srOnly}>Loading portfolio</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
