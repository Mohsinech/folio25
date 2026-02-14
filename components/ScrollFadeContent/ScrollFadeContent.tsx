"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./fade.module.css";

interface ScrollFadeContentProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollFadeContent({
  children,
  className,
}: ScrollFadeContentProps) {
  const { scrollYProgress } = useScroll();

  // Fade text from opacity 0.6 at top to 1 as you scroll (more dramatic)
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);

  return (
    <motion.div
      className={`${className} ${styles.scrollFadeContent}`}
      style={{ opacity }}
    >
      {children}
    </motion.div>
  );
}
