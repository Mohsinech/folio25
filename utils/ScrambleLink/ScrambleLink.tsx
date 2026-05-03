"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

// 1. Scramble Config
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 25;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

interface ScrambleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
}

const ScrambleLink = ({
  href,
  label,
  className,
  style,
  ...props
}: ScrambleLinkProps) => {
  const [text, setText] = useState(label);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 3. The Scramble Logic (Hover Effect)
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
    <Link
      href={href}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={className}
      style={style}
      {...props}
    >
      <h2>{text}</h2>
    </Link>
  );
};

export default ScrambleLink;
