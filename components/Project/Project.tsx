"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./project.module.css";
import ScrambleSimple from "@/utils/ScrambleSimple/ScrambleSimple";
import Image from "next/image";
import { ScrambleLink } from "@/utils";

interface projectProps {
  id: number;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  description: string;
  images: string[];
  preview: string;
  isOpen: boolean;
  hasActive: boolean;
  onToggle: (id: number) => void;
}

const Project = ({
  id,
  title,
  category,
  client,
  year,
  description,
  location,
  preview,
  isOpen,
  images,
  hasActive,
  onToggle,
}: projectProps) => {
  const contentTransition = {
    duration: 0.8,
    ease: [0.65, 0.05, 0, 1] as const,
  };

  const imageReveal = {
    hidden: { y: 28, opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 8%, 0 0)" },
    visible: (delay = 0) => ({
      y: 0,
      opacity: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 0.75,
        delay,
        ease: [0.65, 0.05, 0, 1] as const,
      },
    }),
  };

  const handleToggle = () => {
    onToggle(id);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.gridInfo} ${isOpen ? styles.gridInfoActive : ""} ${
          hasActive && !isOpen ? styles.gridInfoDimmed : ""
        }`}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleToggle();
          }
        }}
      >
        <ScrambleSimple label={title} />
        <ScrambleSimple label={category} />
        <ScrambleSimple label={client} />
        <ScrambleSimple label={location} />
        <ScrambleSimple label={year} />
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={styles.contentData}
            initial={{
              height: 0,
              opacity: 0,
              clipPath: "polygon(0 0, 100% 0, 100% 4%, 0 0)",
            }}
            animate={{
              height: "auto",
              opacity: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
            exit={{
              height: 0,
              opacity: 0,
              clipPath: "polygon(0 0, 100% 0, 100% 4%, 0 0)",
            }}
            transition={contentTransition}
          >
            <h1>{description}</h1>

            <div className={styles.btn}>
              <ScrambleLink label="Live site" href={preview} />
            </div>

            <div className={styles.imageGallery}>
              {images.map((image, index) => (
                <motion.div
                  className={styles.wrapper}
                  variants={imageReveal}
                  initial="hidden"
                  animate="visible"
                  custom={0.12 + index * 0.08}
                  key={image}
                >
                  <Image src={image} alt={title} fill sizes="33vw" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Project;
