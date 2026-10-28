"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, type ProjectInfo } from "@/app/data";
import styles from "./case.module.css";

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

const inView = {
  variants: reveal,
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
} as const;

/** One case study page, laid out like the original /latest page, for any project. */
export default function CaseStudy({ project }: { project: ProjectInfo }) {
  const [cover, ...rest] = project.images;
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div className={styles.kicker} variants={reveal} initial="hidden" animate="visible">
          <p>{project.category}</p>
          <p>Case study, {project.year}</p>
        </motion.div>

        <div className={styles.heroContent}>
          <motion.h1
            variants={reveal}
            initial="hidden"
            animate="visible"
            custom={0.08}
            style={{ viewTransitionName: "read-more" }}
          >
            {project.title}
          </motion.h1>
          <motion.p variants={reveal} initial="hidden" animate="visible" custom={0.16}>
            {project.summary}
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
          <Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" />
        </motion.div>
      </section>

      <section className={styles.info}>
        <div className={styles.details}>
          {project.details.map(([label, value], i) => (
            <motion.div className={styles.detail} key={label} {...inView} custom={i * 0.05}>
              <p>{label}</p>
              <h2>{value}</h2>
            </motion.div>
          ))}
        </div>

        <motion.div className={styles.statement} {...inView}>
          <p>{project.description}</p>
          {project.preview && (
            <a
              className={styles.visit}
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit live site
            </a>
          )}
        </motion.div>
      </section>

      <section className={styles.gallery}>
        <motion.div className={styles.galleryItem} {...inView}>
          <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 900px) 66vw, 100vw" />
        </motion.div>
        <div className={styles.galleryStack}>
          {rest.map((image, i) => (
            <motion.div className={styles.galleryItem} key={image.src} {...inView} custom={0.08 + i * 0.08}>
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 900px) 34vw, 100vw" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.notes}>
        {project.notes.map(([label, text], i) => (
          <motion.div key={label} {...inView} custom={i * 0.08}>
            <p>{label}</p>
            <h2>{text}</h2>
          </motion.div>
        ))}
      </section>

      <nav className={styles.next} aria-label="Next project">
        <p>Next project</p>
        <Link href={`/work/${next.slug}`} data-vt="true" className={styles.nextLink}>
          {next.title}
        </Link>
        <Link href="/" data-vt="true" className={styles.allWork}>
          All work
        </Link>
      </nav>
    </main>
  );
}
