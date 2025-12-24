"use client";

import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

interface ProjectProps {
  id: number;
  title: string;
  imageUrl: string;
  projectUrl: string;
}

const ProjectCard = ({ id, title, imageUrl, projectUrl }: ProjectProps) => {
  // --- 1. MOUSE PHYSICS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the cursor (The "Lag" effect)
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // --- 2. STATE ---
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // --- 3. TRACK MOUSE ---
  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, [mouseX, mouseY]);

  return (
    <>
      <div className={styles.imageWrapper}>
        <a
          key={id}
          href={projectUrl}
          className={styles.projectLink}
          // --- 4. TRIGGERS ---
          onMouseEnter={() => {
            setIsHovering(true);
            setActiveProject(title); // Sets text for marquee
          }}
          onMouseLeave={() => {
            setIsHovering(false);
            setActiveProject(null);
          }}
        >
          <Image
            className={styles.projectImage}
            src={imageUrl}
            alt={title}
            fill
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </a>
      </div>

      {/* --- 5. THE CURSOR --- */}
      <motion.div
        className={styles.cursor}
        style={{
          left: cursorX,
          top: cursorY,
        }}
        initial={{ scale: 0 }}
        animate={{
          scale: isHovering ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div className={styles.cursorInner}>
          <div className={styles.marquee}>
            {/* Infinite Marquee Animation */}
            <motion.div
              className={styles.track}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {/* Duplicate text to create seamless loop */}
              <span>
                {activeProject} — {activeProject} — {activeProject} —{" "}
                {activeProject} — {activeProject} — {activeProject} —{" "}
                {activeProject} — {activeProject} — {activeProject} —{" "}
                {activeProject} — {activeProject} — {activeProject} —{" "}
              </span>
              <span>
                {activeProject} — {activeProject} — {activeProject} —{" "}
                {activeProject} — {activeProject} — {activeProject} —{" "}
                {activeProject} — {activeProject} — {activeProject} —{" "}
                {activeProject} — {activeProject} — {activeProject} —{" "}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCard;
