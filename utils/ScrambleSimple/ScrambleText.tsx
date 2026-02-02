"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

// 1. Scramble Config
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 25;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

// 2. Extend HTMLMotionProps to support all Framer Motion attributes
interface ScrambleLinkProps extends HTMLMotionProps<"h2"> {
  label: string;
}

const ScrambleText = ({
  label,
  className,
  style,
  ...props // This now captures initial, whileInView, transition, etc.
}: ScrambleLinkProps) => {
  const [text, setText] = useState(label);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(label);
  };

  const scramble = () => {
    stopScramble();
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = label
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= label.length * CYCLES_PER_LETTER) stopScramble();
    }, SHUFFLE_TIME);
  };

  return (
    <motion.h2
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={className}
      style={{ ...style, display: "inline-block", overflow: "hidden" }}
      {...props} // Spreading props applies the Framer Motion logic
    >
      <span>{text}</span>
    </motion.h2>
  );
};

export default ScrambleText;
