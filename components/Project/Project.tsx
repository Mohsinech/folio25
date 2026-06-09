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
    duration: 1,
    ease: [0.65, 0.05, 0, 1] as const,
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
            initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={contentTransition}
          >
            <h1>{description}</h1>

            <div className={styles.btn}>
              <ScrambleLink label="Live site" href={preview} />
            </div>

            <div className={styles.imageGallery}>
              <div className={styles.wrapper}>
                <Image src={images[0]} alt={title} fill sizes="33vw" />
              </div>
              <div className={styles.wrapper}>
                <Image src={images[1]} alt={title} fill sizes="33vw" />
              </div>
              <div className={styles.wrapper}>
                <Image src={images[2]} alt={title} fill sizes="33vw" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Project;
