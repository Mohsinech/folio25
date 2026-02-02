"use client";

import React from "react";
import styles from "@/app/work/[slug]/slug.module.css";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import Image from "next/image";

interface ProjectMarqueeProps {
  ProjectUrl: string;
  image?: string;
}

const ProjectMarquee: React.FC<ProjectMarqueeProps> = ({
  ProjectUrl,
  image,
}) => {
  return (
    <section className={styles.projectUrl}>
      <motion.a
        className={styles.projectUrlLink}
        href={ProjectUrl}
        initial={{ y: -100, skewY: 2 }}
        whileInView={{
          y: 0,
          skewY: 0,
        }}
        transition={{ duration: 2, ease: [0.65, 0.05, 0, 1] }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.motionMarquee}>
          <Marquee className={styles.marquee} gradient={false} speed={60}>
            Browse Project{" "}
            <div className={styles.imgWrapper}>
              <Image
                src={image ?? "/placeholder.png"}
                alt="Project Intro"
                fill
              />
            </div>{" "}
            Browse Project{" "}
            <div className={styles.imgWrapper}>
              <Image
                src={image ?? "/placeholder.png"}
                alt="Project Intro"
                fill
              />
            </div>{" "}
            Browse Project{" "}
            <div className={styles.imgWrapper}>
              <Image
                src={image ?? "/placeholder.png"}
                alt="Project Intro"
                fill
              />
            </div>
            Browse Project{" "}
            <div className={styles.imgWrapper}>
              <Image
                src={image ?? "/placeholder.png"}
                alt="Project Intro"
                fill
              />
            </div>{" "}
            Browse Project{" "}
            <div className={styles.imgWrapper}>
              <Image
                src={image ?? "/placeholder.png"}
                alt="Project Intro"
                fill
              />
            </div>{" "}
            Browse Project{" "}
            <div className={styles.imgWrapper}>
              <Image
                src={image ?? "/placeholder.png"}
                alt="Project Intro"
                fill
              />
            </div>
            Browse Project{" "}
            <div className={styles.imgWrapper}>
              <Image
                src={image ?? "/placeholder.png"}
                alt="Project Intro"
                fill
              />
            </div>{" "}
            Browse Project{" "}
            <div className={styles.imgWrapper}>
              <Image
                src={image ?? "/placeholder.png"}
                alt="Project Intro"
                fill
              />
            </div>{" "}
            Browse Project{" "}
            <div className={styles.imgWrapper}>
              <Image
                src={image ?? "/placeholder.png"}
                alt="Project Intro"
                fill
              />
            </div>
          </Marquee>
        </div>
      </motion.a>
    </section>
  );
};

export default ProjectMarquee;
