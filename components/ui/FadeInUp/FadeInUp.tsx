"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number; // Optional delay
  className?: string;
}

export default function FadeInUp({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 2,
        delay: delay,
        ease: [0.22, 1, 0.36, 1], // "easeOutQuint" - very smooth
      }}
    >
      {children}
    </motion.div>
  );
}
