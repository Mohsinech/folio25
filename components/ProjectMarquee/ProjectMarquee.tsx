"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./projectMarquee.module.css";
import { motion } from "framer-motion";

// --- PHYSICS SETTINGS ---
const BASE_SPEED = 0.08; // The slow, constant drift speed
const DRAG_SENSITIVITY = 0.001; // Lower = Heavier to push. Higher = lighter.
const LERP_EASE = 1; // Lower (0.01 - 0.05) = More "lag/weight". Higher = Snappy.
const FRICTION = 0.99; // How fast it slows down (0.9 = fast stop, 0.99 = ice slide)

export default function ProjectMarquee() {
  const firstStrip = useRef<HTMLDivElement>(null);
  const secondStrip = useRef<HTMLDivElement>(null);

  const xPercent = useRef(0);
  const direction = useRef(-1);
  const currentSpeed = useRef(BASE_SPEED);
  const targetSpeed = useRef(BASE_SPEED);

  useEffect(() => {
    const animate = () => {
      // 1. Smoothly interpolate current speed towards target speed
      // This "lag" creates the heavy drag feel
      currentSpeed.current +=
        (targetSpeed.current - currentSpeed.current) * LERP_EASE;

      // 2. Apply Friction to Target Speed
      // Slowly decay the boost back down to the BASE_SPEED
      if (Math.abs(targetSpeed.current) > BASE_SPEED) {
        targetSpeed.current *= FRICTION;
      }

      // Ensure we never go below the base speed (keep it drifting)
      if (Math.abs(targetSpeed.current) < BASE_SPEED) {
        targetSpeed.current = BASE_SPEED;
      }

      // 3. Move Position
      if (xPercent.current <= -100) {
        xPercent.current = 0;
      }
      if (xPercent.current > 0) {
        xPercent.current = -100;
      }

      xPercent.current += currentSpeed.current * direction.current;

      if (firstStrip.current && secondStrip.current) {
        gsap.set(firstStrip.current, { xPercent: xPercent.current });
        gsap.set(secondStrip.current, { xPercent: xPercent.current });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // 4. Boost the speed based on scroll
      // We use Math.abs because we want speed, not direction change (unless you want that)
      const scrollForce = Math.abs(e.deltaY);

      // Add to the target, but capped by sensitivity
      targetSpeed.current += scrollForce * DRAG_SENSITIVITY;
    };

    window.addEventListener("wheel", handleWheel);
    gsap.ticker.add(animate);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      gsap.ticker.remove(animate);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.2,
        duration: 2,
        ease: [0.65, 0.05, 0, 1],
      }}
      className={styles.sliderContainer}
    >
      <div className={styles.slider}>
        <div ref={firstStrip} className={styles.wrapper}>
          <ProjectCard /> <ProjectCard /> <ProjectCard /> <ProjectCard />
        </div>
        <div ref={secondStrip} className={styles.wrapper}>
          <ProjectCard /> <ProjectCard /> <ProjectCard /> <ProjectCard />
        </div>
      </div>
    </motion.div>
  );
}

const ProjectCard = () => <div className={styles.project}></div>;
