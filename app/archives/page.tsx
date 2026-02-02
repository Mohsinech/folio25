"use client";

import React from "react";
import styles from "./page.module.css";
import { ScrambleLink } from "@/utils";
import { archivesData } from "./data";
import { Archive } from "@/components";
import { useScroll, useTransform, motion } from "framer-motion";

const Page = () => {
  const scrollYProgress = useScroll().scrollYProgress;
  const fadeOut = useTransform(scrollYProgress, [0, 1], [1, 0]);

  //
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
        delay: i * 0.05,
      },
    }),
  };

  const text = "ARCHIVES";

  return (
    <main className={styles.main}>
      <section className={styles.archive}>
        <motion.div
          style={{
            opacity: fadeOut,
          }}
          className={styles.content}
        >
          <h1>
            {text.split("").map((char, index) => (
              <span
                key={index}
                style={{ display: "inline-block", overflow: "hidden" }} // THE MASK
              >
                <motion.span
                  custom={index}
                  variants={revealVars}
                  initial="initial"
                  animate="animate"
                  style={{ display: "inline-block" }} // Required for transform to work
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Archives Container */}
        <div className={styles.archivesContainer}>
          <div className="overflow-hidden">
            <motion.h3
              initial={{ y: "140%" }}
              whileInView={{ y: "0%" }}
              transition={{ duration: 1.5, ease: [0.65, 0.05, 0, 1] }}
            >
              Costum work on request{"  "}
              <ScrambleLink
                className={styles.emailLink}
                href="/contact"
                label="email"
              />
            </motion.h3>
          </div>

          {archivesData.map((archive) => (
            <Archive key={archive.id} {...archive} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
