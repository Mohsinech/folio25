"use client";

import React, { useRef, useState } from "react";
import { Link, useTransitionRouter } from "next-view-transitions";

// Scramble Config
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 25;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

interface ScrambleLinkMobileProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  onNavigate?: () => void;
}

const ScrambleLinkMobile = ({
  href,
  label,
  className,
  style,
  onNavigate,
  ...props
}: ScrambleLinkMobileProps) => {
  const router = useTransitionRouter();
  const [text, setText] = useState(label);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Custom Mobile Page Transition
  function mobilePageTransition() {
    // Exit: Fade out and scale down
    document.documentElement.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.95)" },
      ],
      {
        duration: 600,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      },
    );

    // Enter: Slide up with fade
    document.documentElement.animate(
      [
        { opacity: 0, transform: "translateY(20px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 800,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }

  // Scramble Logic
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

  // Click Handler with menu close callback
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Trigger menu close if callback provided
    if (onNavigate) {
      onNavigate();
    }

    // Wait for menu animation, then navigate
    setTimeout(() => {
      router.push(href, {
        onTransitionReady: mobilePageTransition,
      });
    }, 800);
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

export default ScrambleLinkMobile;
