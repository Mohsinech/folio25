"use client";

import React, { useRef } from "react";
import Image from "next/image";
import styles from "@/app/work/[slug]/slug.module.css";
import { useScroll, useTransform, motion } from "framer-motion";

interface ParallaxImagesProps {
  parallaxImages: string[];
  title?: string;
}

const ParallaxImages = ({ parallaxImages, title }: ParallaxImagesProps) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Parallax movement
  const yMiddle = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const ySides = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  if (!parallaxImages || parallaxImages.length < 3) return null;

  return (
    <section className={styles.parallaxContainer} ref={container}>
      <div className={styles.mobileGrid}>
        {/* IMAGE 1 (Left) */}
        <motion.div className={styles.mobileWrapper} style={{ y: ySides }}>
          {/* Note: We removed 'fill'. We use standard img behavior now. */}
          <img
            src={parallaxImages[0]}
            alt={title ?? ""}
            className={styles.projectImg}
          />
        </motion.div>

        {/* IMAGE 2 (Middle) */}
        <motion.div className={styles.mobileWrapper} style={{ y: yMiddle }}>
          <img
            src={parallaxImages[1]}
            alt={title ?? ""}
            className={styles.projectImg}
          />
        </motion.div>

        {/* IMAGE 3 (Right) */}
        <motion.div className={styles.mobileWrapper} style={{ y: ySides }}>
          <img
            src={parallaxImages[2]}
            alt={title ?? ""}
            className={styles.projectImg}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxImages;
