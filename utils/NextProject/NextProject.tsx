"use client";

import React, { useRef } from "react";
import Image from "next/image";
import styles from "@/app/work/[slug]/slug.module.css";
import ScrambleLink from "../ScrambleText/ScrambleText";
import { useScroll, useTransform, motion } from "framer-motion";

interface NextProjectProps {
  title: string;
  image: string;
  url: string; // Added url prop
}

const NextProject = ({ title, image, url }: NextProjectProps) => {
  const container = useRef(null);

  // Track scroll progress relative to this specific section
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // PARALLAX MATH:
  const yImage = useTransform(scrollYProgress, [0, 1], [50, -50]); // Image moves against scroll

  return (
    <section className={styles.nextProject} ref={container}>
      <h4>
        Next Project{" "}
        <ScrambleLink className={styles.link} label={title} href={url} />
      </h4>

      {/* Text Content */}
      <div className={styles.nextContent}>
        <div className={styles.nextImageContainer}>
          {/* Use motion.div to animate the y position */}
          <motion.div
            style={{
              y: yImage,
              position: "absolute",
              top: "-5%",
              left: 0,
              width: "100%",
              height: "120%",
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className={styles.nextImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </motion.div>
        </div>
        <h1>{title}</h1>
      </div>
    </section>
  );
};

export default NextProject;
