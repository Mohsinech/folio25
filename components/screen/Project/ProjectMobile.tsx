"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./mobile.module.css";
import ScrambleSimple from "@/utils/ScrambleSimple/ScrambleSimple";

interface projectProps {
  id: number;
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  preview: string;
  isOpen: boolean;
  hasActive: boolean;
  onToggle: (id: number) => void;
}

const ProjectMobile = ({
  id,
  title,
  category,
  client,
  year,
  description,
  isOpen,
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

            <button className={styles.btn}>
              <ScrambleSimple label="Live site" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectMobile;
