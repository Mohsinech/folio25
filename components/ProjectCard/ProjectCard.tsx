"use client";

import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import ScrambleLink from "@/utils/ScrambleText/ScrambleText";
import { Link } from "next-view-transitions";
// 1. IMPORT THE HOOK
import { useTransitionRouter } from "next-view-transitions";

interface ProjectProps {
  id: number;
  title: string;
  imageUrl: string;
  projectUrl: string;
}

const ProjectCard = ({ id, title, imageUrl, projectUrl }: ProjectProps) => {
  // 2. INITIALIZE ROUTER
  const router = useTransitionRouter();

  // --- 1. MOUSE PHYSICS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
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

  // --- TRANSITION LOGIC ---
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

  return (
    <>
      <div className={styles.imageWrapper}>
        <Link
          key={id}
          href={projectUrl}
          onClick={(e) => {
            e.preventDefault();
            // 3. USE ROUTER.PUSH WITH CALLBACK
            router.push(projectUrl, {
              onTransitionReady: slideInOut,
            });
          }}
          className={styles.projectLink}
          onMouseEnter={() => {
            setIsHovering(true);
            setActiveProject(title);
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
        </Link>

        {/* Project Content */}
        <div className={styles.projectContent}>
          <ScrambleLink
            href={projectUrl}
            className={styles.projectTitle}
            label={title}
          />
        </div>
      </div>

      {/* --- CURSOR --- */}
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
            <motion.div
              className={styles.track}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              <span>
                {activeProject} ⟶ {activeProject} ⟶ {activeProject} ⟶{" "}
                {activeProject} ⟶ {activeProject} ⟶ {activeProject} ⟶{" "}
                {activeProject} ⟶ {activeProject} ⟶ {activeProject} ⟶{" "}
                {activeProject} ⟶ {activeProject} ⟶ {activeProject} ⟶{" "}
              </span>
              <span>
                {activeProject} ⟶ {activeProject} ⟶ {activeProject} ⟶{" "}
                {activeProject} ⟶ {activeProject} ⟶ {activeProject} ⟶{" "}
                {activeProject} ⟶ {activeProject} ⟶ {activeProject} ⟶{" "}
                {activeProject} ⟶ {activeProject} ⟶ {activeProject} ⟶{" "}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCard;
