"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { projects } from "./data";

// --- NEW COMPONENT: Scrambles text when it enters the viewport ---
const ScrambleText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [display, setDisplay] = useState(text);
  const [trigger, setTrigger] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(() =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3; // Speed: Higher denominator = slower scramble
    }, 30);

    return () => clearInterval(interval);
  }, [trigger, text]);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => setTrigger(true)} // Triggers when scrolled into view
      viewport={{ once: true }} // Only runs once
    >
      {display}
    </motion.span>
  );
};

const Work = () => {
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

  const text = "WORK(10)";

  return (
    <main className={styles.main}>
      <section className={styles.work}>
        <div className={styles.content}>
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
        </div>

        {/* Latest Project */}
        <section className={styles.latest}>
          <div className={styles.latestProject}></div>
        </section>

        <section className={styles.desc}>
          <h1>
            <span> I truly</span> believe that good work needs a dedicated team,
            less talking and more doing. Good research leads to effective
            design, better tech stacks and tailor-made outcomes. The importance
            of daring, innovative and unique projects is at the heart of our
            client collaboration process. That’s why, we’ve said goodbye to
            traditional agency silos to develop the full multidisciplinary
            potential of our teams.
          </h1>
        </section>

        {/* Project Grid */}
        <section className={styles.projectGrid}>
          {projects.map((item, index) => (
            <ProjectCard key={index} {...item} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default Work;
