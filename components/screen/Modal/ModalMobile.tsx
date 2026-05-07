"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./modal.module.css";
import Image from "next/image";
import { ScrambleLink } from "@/utils";
import BlurText from "@/components/BlurText";

interface LatestProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LatestProjectModal = ({ isOpen, onClose }: LatestProjectModalProps) => {
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className={styles.popup}
            initial={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.3, ease: [0.65, 0.05, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
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
              <h1>
                <BlurText
                  text="Project Title"
                  delay={100}
                  stepDuration={0.4}
                  animateBy="words"
                  direction="top"
                />
              </h1>
              <div className={styles.details}>
                <p>Project detail part HHHHHHHHHHH</p>
                <p>Project detail part two</p>
                <p>Project detail part three</p>
              </div>

              <p className={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                incidunt temporibus assumenda quibusdam minus veritatis, est
                impedit qui asperiores harum omnis nobis corrupti et tempore
                fugiat hic quam alias aspernatur perferendis esse debitis eius
                culpa. Esse, eveniet suscipit! Culpa, atque!
                <br />
                <br />
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
                porro non mollitia illo voluptatem, perferendis minima sapiente
                aut consectetur repellendus!
              </p>

              <div className={styles.readMore}>
                <button>
                  <ScrambleLink
                    data-vt="true"
                    view-transition-name="read-more"
                    href="/latest"
                    label="Read more"
                  />
                </button>
              </div>
            </div>

            <div className={styles.images}>
              <div className={styles.imagePlaceholder}>
                <Image
                  src="/assets/images/placeholder.jpeg"
                  alt="Project Image"
                  fill
                />
              </div>

              <div className={styles.imagePlaceholder}>
                <Image
                  src="/assets/images/placeholder.jpeg"
                  alt="Project Image"
                  fill
                />
              </div>

              <div className={styles.imagePlaceholder}>
                <Image
                  src="/assets/images/placeholder.jpeg"
                  alt="Project Image"
                  fill
                />
              </div>

              <div className={styles.imagePlaceholder}>
                <Image
                  src="/assets/images/placeholder.jpeg"
                  alt="Project Image"
                  fill
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LatestProjectModal;
