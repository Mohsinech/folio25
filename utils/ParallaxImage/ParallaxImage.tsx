"use client";

import styles from "@/app/work/[slug]/slug.module.css";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface ParallaxImageProps {
  parallaxImage: string;
  title: string;
}

const ParallaxImage = ({ parallaxImage, title }: ParallaxImageProps) => {
  const container = useRef(null);

  // Track scroll progress relative to this specific section
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // PARALLAX MATH:
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Image moves against scroll

  return (
    <section ref={container} className={styles.parallax}>
      <motion.div
        style={{
          y: yImage,
          position: "absolute",
          top: "-10%",
          left: 0,
          width: "100%",
          height: "120%",
        }}
      >
        <Image
          src={parallaxImage}
          alt={title}
          style={{
            objectFit: "cover",
          }}
          priority
          fill
        />
      </motion.div>
    </section>
  );
};

export default ParallaxImage;
