"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./projectMarquee.module.css";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { projectMarqueeData } from "./data";

// --- PHYSICS SETTINGS ---
const BASE_SPEED = 0.02;
const DRAG_SENSITIVITY = 0.0002;
const LERP_EASE = 0.1;
const FRICTION = 0.9;

export default function ProjectMarquee() {
  const firstStrip = useRef<HTMLDivElement>(null);
  const secondStrip = useRef<HTMLDivElement>(null);

  // --- MOUSE PHYSICS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // --- STATE FOR CURSOR ---
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const xPercent = useRef(0);
  const direction = useRef(-1);
  const currentSpeed = useRef(BASE_SPEED);
  const targetSpeed = useRef(BASE_SPEED);

  useEffect(() => {
    const animate = () => {
      currentSpeed.current +=
        (targetSpeed.current - currentSpeed.current) * LERP_EASE;
      if (Math.abs(targetSpeed.current) > BASE_SPEED)
        targetSpeed.current *= FRICTION;
      if (Math.abs(targetSpeed.current) < BASE_SPEED)
        targetSpeed.current = BASE_SPEED;

      if (xPercent.current <= -100) xPercent.current = 0;
      else if (xPercent.current > 0) xPercent.current = -100;

      xPercent.current += currentSpeed.current * direction.current;

      if (firstStrip.current && secondStrip.current) {
        gsap.set(firstStrip.current, { xPercent: xPercent.current });
        gsap.set(secondStrip.current, { xPercent: xPercent.current });
      }
    };

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleWheel = (e: WheelEvent) => {
      const scrollForce = Math.abs(e.deltaY);
      targetSpeed.current += scrollForce * DRAG_SENSITIVITY;
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("wheel", handleWheel, { passive: true });
    gsap.ticker.add(animate);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("wheel", handleWheel);
      gsap.ticker.remove(animate);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 2,
        ease: [0.87, 0.13, 0, 1],
        delay: 0.7,
      }}
      className={styles.sliderContainer}
    >
      <div className={styles.slider}>
        <div ref={firstStrip} className={styles.wrapper}>
          {projectMarqueeData.map((project, i) => (
            <ProjectCard
              key={`a-${project.id}-${i}`}
              project={project}
              index={i}
              hoveredIndex={hoveredIndex}
              onEnter={() => {
                setIsHovering(true);
                setActiveTitle(project.title);
                setHoveredIndex(i);
              }}
              onLeave={() => {
                setIsHovering(false);
                setActiveTitle(null);
                setHoveredIndex(null);
              }}
            />
          ))}
        </div>
        <motion.div ref={secondStrip} className={styles.wrapper}>
          {projectMarqueeData.map((project, i) => (
            <ProjectCard
              key={`b-${project.id}-${i}`}
              project={project}
              index={i + projectMarqueeData.length}
              hoveredIndex={hoveredIndex}
              onEnter={() => {
                setIsHovering(true);
                setActiveTitle(project.title);
                setHoveredIndex(i + projectMarqueeData.length);
              }}
              onLeave={() => {
                setIsHovering(false);
                setActiveTitle(null);
                setHoveredIndex(null);
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* --- FLOATING CURSOR --- */}
      <motion.div
        className={styles.cursor}
        style={{
          left: cursorX,
          top: cursorY,
          pointerEvents: "none",
          position: "fixed",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: isHovering ? 1 : 0 }}
      >
        <div className={styles.cursorInner}>
          <div className={styles.marquee}>
            <motion.div
              className={styles.track}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
            >
              <span>
                {activeTitle} ⟶ {activeTitle} ⟶{" "}
              </span>
              <span>
                {activeTitle} ⟶ {activeTitle} ⟶{" "}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const ProjectCard = ({
  project,
  index,
  hoveredIndex,
  onEnter,
  onLeave,
}: any) => {
  const calculateScale = () => {
    if (hoveredIndex === null) return 1;

    const distance = Math.abs(index - hoveredIndex);

    if (distance === 0) return 1.5; // Hovered card
    if (distance === 1) return 1.3; // Adjacent cards
    if (distance === 2) return 1.15; // Two cards away

    return 1; // Default scale
  };

  return (
    <motion.div
      className={styles.project}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={{ scale: calculateScale() }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Image
        src={project.img}
        alt={project.title || "Project"}
        fill
        priority
        style={{ objectFit: "cover" }}
      />
    </motion.div>
  );
};
