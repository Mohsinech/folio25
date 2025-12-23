"use client";

import styles from "./page.module.css";
import ScrambleLink from "@/utils/ScrambleText/ScrambleText";
import ProjectMarquee from "@/components/ProjectMarquee/ProjectMarquee";
import { motion } from "framer-motion";

// 1. Same animation settings as your Header
const revealVars = {
  initial: { y: "100%", opacity: 0, skewY: 2 },
  animate: (i: number) => ({
    y: "0%",
    opacity: 1,
    skewY: 0,
    transition: {
      duration: 2,
      ease: [0.87, 0.13, 0, 1],
      delay: i * 0.05 + 0.2, // Base delay of 0.2s so it starts after header
    },
  }),
};

const Home = () => {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <div className={styles.headings}>
            {/* BLOCK ONE (Indices 0-3) */}
            <div className={styles.titlesOne}>
              <div className="overflow-hidden">
                <motion.h1
                  custom={0}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  A versatile web developer and full-
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  custom={1}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  stack creator with a maker’s mindset.
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  custom={2}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  I don’t just build websites—I create
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  custom={3}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  high-performance digital experiences.
                </motion.h1>
              </div>
            </div>

            {/* BLOCK TWO (Indices 4-8) */}
            <div className={styles.titlesTwo}>
              <div className="overflow-hidden">
                <motion.h1
                  custom={4}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  share the journey, and help others
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  custom={5}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  learn along the way. As a solo
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  custom={6}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  entrepreneur, I turn ideas into
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  custom={7}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  <span>
                    <ScrambleLink
                      label="Projects"
                      href="/work"
                      className={styles.link}
                    />
                    <sup>9</sup>
                  </span>{" "}
                  that connect code and{" "}
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  custom={8}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  community.
                </motion.h1>
              </div>
            </div>
          </div>

          {/* LISTS (Indices 9+) */}
          {/* LISTS (Updated Indices for Overlap) */}
          <div className={styles.lists}>
            {/* 1. CLIENTS - Starts at index 2 (Parallel with main text) */}
            <div className={styles.listOne}>
              <div className="overflow-hidden">
                <motion.h3
                  custom={2}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  <div className={styles.dot}></div>
                  CLIENTS
                </motion.h3>
              </div>

              <ul>
                <li>
                  <motion.div
                    custom={3}
                    variants={revealVars}
                    initial="initial"
                    animate="animate"
                  >
                    <ScrambleLink
                      label="Ayourluxe"
                      href="/work/ayourluxe"
                      className={styles.link}
                    />
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    custom={4}
                    variants={revealVars}
                    initial="initial"
                    animate="animate"
                  >
                    <ScrambleLink
                      label="Hyne Ma"
                      href="/work/hynema"
                      className={styles.link}
                    />
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    custom={5}
                    variants={revealVars}
                    initial="initial"
                    animate="animate"
                  >
                    <ScrambleLink
                      label="Afolki Beauty"
                      href="/work/afolkibeauty"
                      className={styles.link}
                    />
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    custom={6}
                    variants={revealVars}
                    initial="initial"
                    animate="animate"
                  >
                    <ScrambleLink
                      label="Lalla Ghzali"
                      href="/work/lallaghzali"
                      className={styles.link}
                    />
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    custom={7}
                    variants={revealVars}
                    initial="initial"
                    animate="animate"
                  >
                    <ScrambleLink
                      label="Mohaba"
                      href="/work/mohaba"
                      className={styles.link}
                    />
                  </motion.div>
                </li>
              </ul>
            </div>

            {/* 2. COLLABORATE - Also starts at index 2 (Flows parallel to Clients) */}
            <div className={styles.listTwo}>
              <div className="overflow-hidden">
                <motion.h3
                  custom={2}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  <div className={styles.dot}></div>
                  Let&apos;s Collaborate
                </motion.h3>
              </div>

              <ul>
                <li>
                  <motion.div
                    custom={3}
                    variants={revealVars}
                    initial="initial"
                    animate="animate"
                  >
                    <ScrambleLink
                      label="LinkedIn"
                      href="#linkedin"
                      className={styles.link}
                    />
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    custom={4}
                    variants={revealVars}
                    initial="initial"
                    animate="animate"
                  >
                    <ScrambleLink
                      label="Instagram"
                      href="#instagram"
                      className={styles.link}
                    />
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    custom={5}
                    variants={revealVars}
                    initial="initial"
                    animate="animate"
                  >
                    <ScrambleLink
                      label="Email"
                      href="#email"
                      className={styles.link}
                    />
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    custom={6}
                    variants={revealVars}
                    initial="initial"
                    animate="animate"
                  >
                    <ScrambleLink
                      label="WhatsApp"
                      href="#whatsapp"
                      className={styles.link}
                    />
                  </motion.div>
                </li>
              </ul>

              <div className="overflow-hidden">
                <motion.p
                  custom={7}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  HAVE A PROJECT IN MINDE? <br />
                  BOOK A FREE CONSULTATION.
                </motion.p>
              </div>
            </div>

            {/* 3. CURRENT POSITION - Starts lower (Index 6) to fill the bottom gap */}
            <div className={styles.listTwo}>
              <div className="overflow-hidden">
                <motion.h3
                  custom={6}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  <div className={styles.dot}></div>
                  CURRENT POSITION
                </motion.h3>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  custom={7}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                >
                  Freelance designer & developer <br />
                  Since 2020, content creator <br />
                  Solo entrepreneur.
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        <ProjectMarquee />
      </section>
    </main>
  );
};

export default Home;
