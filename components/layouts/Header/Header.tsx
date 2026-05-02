"use client";

import styles from "./header.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrambleSimple from "@/utils/ScrambleSimple/ScrambleSimple";
import Image from "next/image";
import { ScrambleLink } from "@/utils";

//

const Header = () => {
  const scrollY = useScroll().scrollY;
  const headerY = useTransform(scrollY, [0, 200], [0, -100]);

  // Conditions

  return (
    <motion.header style={{ y: headerY }} className={styles.header}>
      {/* LOGO */}
      <div className={styles.logo}>
        <ScrambleLink className={styles.h1} href="/" label="MOHSSINE" />
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
