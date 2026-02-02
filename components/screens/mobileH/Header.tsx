"use client";

import React from "react";
import styles from "./mobile.module.css";
import ScrambleLink from "@/utils/ScrambleText/ScrambleText";
import { motion, useScroll, useTransform } from "framer-motion";
import { NAV_LINKS } from "./data";

const MobileHeader = () => {
  //
  const revealVars = {
    initial: {
      y: "120%",
      opacity: 0,
      skewY: 5, // A slightly stronger skew looks more "premium"
    },
    animate: (i: number) => ({
      y: "0%",
      opacity: 1,
      skewY: 0,
      transition: {
        duration: 2,
        ease: [0.87, 0.13, 0, 1],
        delay: i * 0.2, // Automatic stagger based on index
      },
    }),
  };

  //
  //
  const scrollY = useScroll().scrollY;
  const headerY = useTransform(scrollY, [0, 200], [0, -100]);

  return (
    <motion.header style={{ y: headerY }} className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo (Animate first) */}
        <div className="overflow-hidden">
          {" "}
          {/* Wrapper for clean slide-up */}
          <motion.div
            custom={0} // Index 0 (starts immediately)
            variants={revealVars}
            initial="initial"
            animate="animate"
          >
            <ScrambleLink label="MOHSSINE" href="/" className={styles.logo} />
          </motion.div>
        </div>

        {/* Navigation Links */}
        <ul className={styles.navList}>
          {NAV_LINKS.map((link, i) => (
            <li key={i} className="overflow-hidden">
              {" "}
              {/* Wrapper for clean slide-up */}
              <motion.div
                custom={i + 1} // Start delays after the logo (0.1, 0.2, etc.)
                variants={revealVars}
                initial="initial"
                animate="animate"
              >
                <ScrambleLink
                  label={link.label}
                  href={link.href}
                  className={styles.link}
                />
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default MobileHeader;
