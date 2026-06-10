"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./latestProjectModal.module.css";
import Image from "next/image";
import { ScrambleLink } from "@/utils";
import BlurText from "./BlurText";

interface LatestProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LatestProjectModal = ({ isOpen, onClose }: LatestProjectModalProps) => {
  const contentItem = {
    hidden: { y: 28, opacity: 0, filter: "blur(8px)" },
    visible: (delay = 0) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay,
        ease: [0.65, 0.05, 0, 1] as const,
      },
    }),
  };

  const imageItem = {
    hidden: { y: 56, opacity: 0, scale: 1.04 },
    visible: (delay = 0) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        delay,
        ease: [0.65, 0.05, 0, 1] as const,
      },
    }),
  };

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousBodyOverscroll;
    };
  }, [isOpen]);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.35, ease: [0.65, 0.05, 0, 1] }}
          />
          <motion.div
            className={styles.popup}
            initial={{
              clipPath: "polygon(0 0, 100% 0, 100% 9%, 0 0)",
              opacity: 0,
              scale: 0.96,
              x: "-50%",
              y: "-48%",
            }}
            animate={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              opacity: 1,
              scale: 1,
              x: "-50%",
              y: "-50%",
            }}
            exit={{
              clipPath: "polygon(0 0, 100% 0, 100% 12%, 0 0)",
              opacity: 0,
              scale: 0.98,
              x: "-50%",
              y: "-48%",
            }}
            transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* LEFT CONTENT */}
            <div className={styles.left}>
              <div className={styles.top}>
                <button
                  className={styles.closeBtn}
                  onClick={onClose}
                  aria-label="Close Modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className={styles.body}>
                <motion.h1
                  variants={contentItem}
                  initial="hidden"
                  animate="visible"
                  custom={0.15}
                >
                  <BlurText
                    text="Bentofolio"
                    delay={100}
                    stepDuration={0.4}
                    animateBy="words"
                    direction="top"
                  />
                </motion.h1>
                <motion.div
                  className={styles.details}
                  variants={contentItem}
                  initial="hidden"
                  animate="visible"
                  custom={0.25}
                >
                  <p>Portfolio builder</p>
                  <p>Product design / frontend</p>
                  <p>Next.js, motion, responsive systems</p>
                </motion.div>

                <motion.p
                  className={styles.description}
                  variants={contentItem}
                  initial="hidden"
                  animate="visible"
                  custom={0.35}
                >
                  Bentofolio is a minimal portfolio experience built around
                  modular blocks, polished motion, and a focused publishing flow
                  for creative developers and designers.
                  <br />
                  <br />
                  The project pairs a clean bento layout with practical screens:
                  a calm hero, authentication, pricing, and project sections
                  that feel sharp without shouting.
                </motion.p>

                <motion.div
                  className={styles.readMore}
                  variants={contentItem}
                  initial="hidden"
                  animate="visible"
                  custom={0.45}
                >
                  <ScrambleLink
                    data-vt="true"
                    style={{ viewTransitionName: "read-more" }}
                    href="/latest"
                    label="Read more"
                  />
                </motion.div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className={styles.right} onWheel={(e) => e.stopPropagation()}>
              <motion.div
                className={styles.imagePlaceholder}
                variants={imageItem}
                initial="hidden"
                animate="visible"
                custom={0.16}
              >
                <Image
                  src="/media/bentofolio/hero.jpg"
                  alt="Bentofolio hero screen"
                  fill
                  sizes="(min-width: 1024px) 55vw, 94vw"
                />
              </motion.div>

              <motion.div
                className={styles.imagePlaceholder}
                variants={imageItem}
                initial="hidden"
                animate="visible"
                custom={0.24}
              >
                <Image
                  src="/media/bentofolio/login.jpg"
                  alt="Bentofolio login screen"
                  fill
                  sizes="(min-width: 1024px) 55vw, 94vw"
                />
              </motion.div>

              <motion.div
                className={styles.imagePlaceholder}
                variants={imageItem}
                initial="hidden"
                animate="visible"
                custom={0.32}
              >
                <Image
                  src="/media/bentofolio/pricing.jpg"
                  alt="Bentofolio pricing screen"
                  fill
                  sizes="(min-width: 1024px) 55vw, 94vw"
                />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LatestProjectModal;
