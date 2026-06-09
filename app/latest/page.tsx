"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./latest.module.css";

const images = [
  {
    src: "/media/bentofolio/hero.jpg",
    alt: "Bentofolio hero dashboard",
  },
  {
    src: "/media/bentofolio/login.jpg",
    alt: "Bentofolio login screen",
  },
  {
    src: "/media/bentofolio/pricing.jpg",
    alt: "Bentofolio pricing screen",
  },
];

const details = [
  ["Role", "Product design, frontend"],
  ["Stack", "Next.js, Framer Motion, modular UI"],
  ["Focus", "Minimal portfolio publishing"],
  ["Year", "2026"],
];

const reveal = {
  hidden: { y: 32, opacity: 0, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay,
      ease: [0.65, 0.05, 0, 1] as const,
    },
  }),
};

export default function LatestPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div
          className={styles.kicker}
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <p>Latest project</p>
          <p>Case study</p>
        </motion.div>

        <div className={styles.heroContent}>
          <motion.h1
            variants={reveal}
            initial="hidden"
            animate="visible"
            custom={0.08}
            style={{ viewTransitionName: "read-more" }}
          >
            Bentofolio
          </motion.h1>
          <motion.p
            variants={reveal}
            initial="hidden"
            animate="visible"
            custom={0.16}
          >
            A restrained portfolio builder shaped around bento sections, quiet
            motion, and clean product screens for creatives who want their work
            to feel curated without feeling over-designed.
          </motion.p>
        </div>
      </section>

      <section className={styles.cover}>
        <motion.div
          className={styles.coverImage}
          variants={reveal}
          initial="hidden"
          animate="visible"
          custom={0.22}
        >
          <Image
            src="/media/bentofolio/hero.jpg"
            alt="Bentofolio hero screen"
            fill
            priority
            sizes="100vw"
          />
        </motion.div>
      </section>

      <section className={styles.info}>
        <div className={styles.details}>
          {details.map(([label, value], index) => (
            <motion.div
              className={styles.detail}
              key={label}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={index * 0.05}
            >
              <p>{label}</p>
              <h2>{value}</h2>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.statement}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p>
            Bentofolio was built to make a personal site feel like a product:
            structured enough to ship fast, flexible enough to make each
            portfolio distinct, and minimal enough that the work stays in front.
          </p>
        </motion.div>
      </section>

      <section className={styles.gallery}>
        {images.map((image, index) => (
          <motion.div
            className={styles.galleryItem}
            key={image.src}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={index * 0.08}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={index === 0 ? "100vw" : "(min-width: 900px) 50vw, 100vw"}
            />
          </motion.div>
        ))}
      </section>

      <section className={styles.notes}>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p>Design direction</p>
          <h2>
            Sharp typography, generous whitespace, compact controls, and motion
            that reveals hierarchy instead of decorating it.
          </h2>
        </motion.div>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0.08}
        >
          <p>Build direction</p>
          <h2>
            Component-first sections, responsive image systems, and reusable
            animation timing so the experience feels consistent across the app.
          </h2>
        </motion.div>
      </section>
    </main>
  );
}
