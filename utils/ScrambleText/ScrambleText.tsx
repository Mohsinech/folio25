"use client";

import React, { useRef, useState } from "react";
import { Link, useTransitionRouter } from "next-view-transitions";

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
  const router = useTransitionRouter();
  const [text, setText] = useState(label);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 2. The View Transition Logic (Your Code)
  function slideInOut() {
    document.documentElement.animate(
      [
        { transform: "translateY(0)", opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.8, transform: "translateY(-35%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      },
    );

    document.documentElement.animate(
      [
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }

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

  // 4. Click Handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href, {
      onTransitionReady: slideInOut,
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={className}
      style={style}
      {...props}
    >
      <span>{text}</span>
    </Link>
  );
};

export default ScrambleLink;
