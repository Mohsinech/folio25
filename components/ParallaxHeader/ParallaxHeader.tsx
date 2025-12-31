"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "@/app/work/[slug]/slug.module.css";

interface Props {
  imageUrl: string;
  title: string;
  hasCopyright?: boolean;
}

export default function ParallaxHeader({
  imageUrl,
  title,
  hasCopyright,
}: Props) {
  const container = useRef(null);

  // Track scroll progress relative to this specific section
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // PARALLAX MATH:
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]); // Text moves up slightly
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Image moves against scroll

  return (
    <section ref={container} className={styles.sectionTwo}>
      <div className={styles.overflowWrapper}>
        {/* 1. PARALLAX IMAGE */}
        <motion.div
          style={{
            y: yImage,
            position: "absolute",
            top: "-10%", // Start slightly higher to allow movement
            left: 0,
            width: "100%",
            height: "120%", // Taller than container for parallax effect
            zIndex: 0,
          }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          {/* Dark Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
            }}
          />
        </motion.div>

        {/* 2. CENTERED CONTENT + PARALLAX H1 */}
        {/* The div.content handles the CSS centering (top: 50%, left: 50%) */}
        <div className={styles.content}>
          {/* The motion.h1 handles the parallax drift */}
          <motion.h1 style={{ y: yText, color: "white" }}>
            {title}
            {hasCopyright && (
              <sup style={{ fontSize: "0.5em", marginLeft: "4px" }}>©</sup>
            )}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
