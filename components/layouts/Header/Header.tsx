"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrambleSimple from "@/utils/ScrambleSimple/ScrambleSimple";
import { useState } from "react";
import Image from "next/image";

// 2. Define the animation once
const revealVars = {
  initial: {
    y: "120%",
    opacity: 0,
    skewY: 5,
  },
  animate: (i: number) => ({
    y: "0%",
    opacity: 1,
    skewY: 0,
    transition: {
      duration: 2,
      ease: [0.87, 0.13, 0, 1],
      delay: i * 0.2,
    },
  }),
};

//

const Header = () => {
  const scrollY = useScroll().scrollY;
  const headerY = useTransform(scrollY, [0, 200], [0, -100]);

  // Conditions

  return (
    <motion.header style={{ y: headerY }} className={styles.header}>
      {/* LOGO */}
      <div className={styles.logo}>
        <motion.h1
        // initial="initial"
        // whileInView="animate"
        // viewport={{ once: true }}
        // custom={0} // Pass index for staggered animation
        // variants={revealVars}
        >
          MOHSSINE
        </motion.h1>
      </div>

      {/* NAV BUTTONS */}
      <nav className={styles.nav}>
        {/* latest project */}
        <div className={styles.latest}>
          <button className={styles.btn}>
            <ScrambleSimple label="Latest Project" />
          </button>
        </div>
        {/* Let's talk */}
        <div className={styles.talk}>
          <button className={styles.btn}>
            <ScrambleSimple label="Let's talk" />
          </button>
        </div>
        {/* Socials */}
        <div className={styles.socials}>
          <button className={styles.btn}>
            <Image
              src="/assets/icons/plus.svg"
              alt="svg"
              height={15}
              width={15}
              className="object-cover"
            />
            <ScrambleSimple label="Socials" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
