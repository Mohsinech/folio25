"use client";

import ProjectCard from "@/components/ProjectCard/ProjectCard";
import styles from "./page.module.css";
import { motion, useTransform, useScroll } from "framer-motion";
import { projects } from "./data";

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

  //
  const scrollYProgress = useScroll().scrollYProgress;
  const fadeOut = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className={styles.main}>
      <section className={styles.work}>
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

        <section className={styles.desc}>
          <h1>
            <span>I’m a </span> developer who values shipping code over sitting
            in meetings. I combine deep technical research with an agile,
            multidisciplinary approach to build unique digital products. I’ve
            moved away from rigid structures to offer a more direct, innovative
            way of working. If you’re looking for a dedicated partner to turn
            complex problems into clean, effective code, let’s build something.
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
