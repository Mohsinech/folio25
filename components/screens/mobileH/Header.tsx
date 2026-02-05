"use client";

import React, { useState } from "react";
import styles from "./mobile.module.css";
import ScrambleLinkMobile from "./ScrambleLinkMobile";
import ScrambleLink from "@/utils/ScrambleText/ScrambleText";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { NAV_LINKS } from "./data";
import Curve from "./Curve";
import Link from "next/link";
import ScrambleText from "@/utils/ScrambleSimple/ScrambleText";

const MobileHeader = () => {
  //
  const revealVars = {
    initial: {
      y: "120%",
      opacity: 0,
      skewY: -5, // A slightly stronger skew looks more "premium"
    },
    animate: (i: number) => ({
      y: "0%",
      opacity: 1,
      skewY: 0,
      transition: {
        duration: 1,
        ease: [0.87, 0.13, 0, 1],
        delay: i * 0.2, // Automatic stagger based on index
      },
    }),
  };

  //
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

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
        <div className={styles.menu} onClick={() => setIsOpen(!isOpen)}>
          <ScrambleText
            label={isOpen ? "CLOSE" : "MENU"}
            className={styles.menuText}
          />
        </div>

        {/* Menu Overlay */}
        <AnimatePresence>
          {isOpen && <NavLinks revealVars={revealVars} closeMenu={closeMenu} />}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default MobileHeader;

const NavLinks = ({
  revealVars,
  closeMenu,
}: {
  revealVars: unknown;
  closeMenu: () => void;
}) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.5,
          transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "#000",
          zIndex: 997,
        }}
      />

      {/* Menu Panel */}
      <motion.div
        initial={{ x: "calc(100% + 100px)" }}
        animate={{
          x: "0",
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        exit={{
          x: "calc(100% + 100px)",
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        className={styles.navList}
      >
        <Curve />

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.8,
              delay: 0.4,
              ease: [0.65, 0.05, 0, 1],
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: [0.65, 0.05, 0, 1],
            },
          }}
        >
          <h3>index</h3>
          {NAV_LINKS.map((link, i) => (
            <li key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 1,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.05 * i,
                  },
                }}
                exit={{
                  y: 100,
                  opacity: 0,
                  transition: {
                    duration: 1,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.05 * i,
                  },
                }}
              >
                <ScrambleLinkMobile
                  label={link.label}
                  href={link.href}
                  className={styles.link}
                  onNavigate={closeMenu}
                />
              </motion.div>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.65, 0.05, 0, 1] }}
          className={styles.footerContent}
        >
          <div className={styles.socials}>
            <ul>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/mohssine-chedgane/"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://x.com/muhsench"
                >
                  /Twitter(x)
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/milcodestudio/"
                >
                  /Instagram
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
