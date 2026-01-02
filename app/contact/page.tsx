"use client";

import React, { useState } from "react";
import styles from "./contact.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Contact = () => {
  const [formOpen, setFormOpen] = useState(false);

  // Text Reveal Variants (Letters appearing)
  const revealVars = {
    initial: { opacity: 0, skewY: 5 },
    animate: (i: number) => ({
      opacity: 1,
      skewY: 0,
      transition: {
        duration: 2,
        ease: [0.87, 0.13, 0, 1],
        delay: i * 0.05,
      },
    }),
  };

  // 1. Container Variants (Opening the space)
  const formContainerVars = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // 2. Form Inner Variants (Wiping the content)
  const formInnerVars = {
    hidden: { clipPath: "inset(0 100% 0 0)", x: 20 },
    show: {
      clipPath: "inset(0 0 0 0)",
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1,
      },
    },
    exit: {
      clipPath: "inset(0 100% 0 0)",
      x: 20,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const phone = "+212 713 086047";
  const email = "chedganemouhssine@gmail.com";

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.centerContent}>
          {/* PARENT CONTAINER 
              Controls the alignment switch (Center vs Flex-Start)
          */}
          <motion.div
            layout
            // This transition handles the general container movement
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className={styles.content}
            style={{
              alignItems: formOpen ? "flex-start" : "center",
              textAlign: formOpen ? "left" : "center",
            }}
          >
            {/* --- PHONE NUMBER WRAPPER --- 
                Changed to motion.div + added layout
                This makes the text itself slide smoothly to the new position
            */}
            <motion.div
              className="overflow-hidden"
              layout
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <h1>
                {phone.split("").map((char, index) => (
                  <span
                    key={index}
                    style={{ display: "inline-block", overflow: "hidden" }}
                  >
                    <motion.span
                      custom={index}
                      variants={revealVars}
                      initial="initial"
                      animate="animate"
                      style={{ display: "inline-block" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </motion.div>

            {/* --- EMAIL WRAPPER --- 
                Changed to motion.div + added layout
            */}
            <motion.div
              className="overflow-hidden"
              layout
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <h1>
                {email.split("").map((char, index) => (
                  <span
                    key={index}
                    style={{ display: "inline-block", overflow: "hidden" }}
                  >
                    <motion.span
                      custom={index}
                      variants={revealVars}
                      initial="initial"
                      animate="animate"
                      style={{ display: "inline-block" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </motion.div>

            {/* Toggle Button */}
            <motion.p
              className={styles.fillForm}
              onClick={() => setFormOpen(!formOpen)}
              layout
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              {formOpen ? "close form" : "or fill the quick form"}
            </motion.p>
          </motion.div>

          {/* THE FORM */}
          <AnimatePresence>
            {formOpen && (
              <motion.div
                className={styles.formWrapper}
                variants={formContainerVars}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.form className={styles.form} variants={formInnerVars}>
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                  <textarea
                    placeholder="Your Message"
                    required
                    rows={4}
                  ></textarea>
                  <button type="submit">Send Message</button>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.footerContent}>
          <p>All rights reserved &copy; 2026</p>
          <div className={styles.socials}>
            <ul>
              <li>
                <Link href="#li">LinkedIn</Link>
              </li>
              <li>
                <Link href="#tw">/Twitter(x)</Link>
              </li>
              <li>
                <Link href="#ig">/Instagram</Link>
              </li>
            </ul>
          </div>
          <p>Site by Mohssine Chedgane</p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
