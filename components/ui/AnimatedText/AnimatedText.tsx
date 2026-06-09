"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  //
  const revealVars: Variants = {
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
        ease: [0.87, 0.13, 0, 1] as const,
        delay: i * 0.05,
      },
    }),
  };

  return (
    <h1 className={className}>
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
  );
};

export default AnimatedText;
