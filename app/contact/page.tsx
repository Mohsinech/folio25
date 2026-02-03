"use client";

import React, { useState, useEffect } from "react";
import styles from "./contact.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { sendEmail } from "@/app/actions";

const Contact = () => {
  // 1. STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    service: "Get in touch",
    budget: "",
    message: "",
  });

  const [isValid, setIsValid] = useState(false);
  // Track status: 'idle', 'error' (fields missing), or 'success' (sent)
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  // 2. LOGIC: Check validity
  useEffect(() => {
    const { name, email, org, service, budget, message } = formData;
    const isFilled =
      name.trim() !== "" &&
      email.trim() !== "" &&
      org.trim() !== "" &&
      service.trim() !== "" &&
      budget.trim() !== "" &&
      message.trim() !== "";

    setIsValid(isFilled);
    // Clear error if user starts typing again
    if (isFilled && status === "error") setStatus("idle");
  }, [formData, status]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. LOGIC: Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      setStatus("error");
      return;
    }

    // 2. Call the Server Action
    const result = await sendEmail(formData);

    if (result.success) {
      setStatus("success");
      // Optional: Reset form
      setFormData({
        name: "",
        email: "",
        org: "",
        service: "Get in touch",
        budget: "",
        message: "",
      });
    } else {
      alert("Something went wrong. Please try again.");
    }
  };
  // Animation variants
  const revealVars = {
    initial: { y: "120%", opacity: 0, skewY: 5 },
    animate: (i: number) => ({
      y: "0%",
      opacity: 1,
      skewY: 0,
      transition: {
        duration: 2,
        ease: [0.87, 0.13, 0, 1],
        delay: i * 0.05,
      },
    }),
  };

  const phone = "+212 713 086047";
  const emailAddr = "chedganemouhssine@gmail.com";
  const call = "Schedule Free 45min Call .";

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <motion.div
          variants={revealVars}
          initial="initial"
          animate="animate"
          className={styles.centerContent}
        >
          <motion.div className={styles.content}>
            <motion.div
              className="overflow-hidden"
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`tel:${phone}`}
              >
                <h1>
                  {phone.split("").map((char, index) => (
                    <span
                      key={index}
                      style={{ display: "inline-block", overflow: "hidden" }}
                    >
                      <motion.span style={{ display: "inline-block" }}>
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    </span>
                  ))}
                </h1>
              </Link>
            </motion.div>

            <motion.div className="overflow-hidden">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`mailto:${emailAddr}`}
              >
                <h1>
                  {emailAddr.split("").map((char, index) => (
                    <span
                      key={index}
                      style={{ display: "inline-block", overflow: "hidden" }}
                    >
                      <motion.span style={{ display: "inline-block" }}>
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    </span>
                  ))}
                </h1>
              </Link>
            </motion.div>

            <motion.div className="overflow-hidden">
              <Link
                href="https://cal.com/muhsench/45minconsultation?duration=45&overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1>
                  {call.split("").map((char, index) => (
                    <span
                      key={index}
                      style={{ display: "inline-block", overflow: "hidden" }}
                    >
                      <motion.span style={{ display: "inline-block" }}>
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    </span>
                  ))}
                </h1>
              </Link>
            </motion.div>
            <motion.p className={styles.fillForm}>
              Or fill the quick form.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.65, 0.05, 0, 1], delay: 1 }}
            className={styles.formWrapper}
          >
            <motion.form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.formText}>
                Hi there, my name is{" "}
                <input
                  type="text"
                  name="name"
                  placeholder="john doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                , my email
                <input
                  type="text"
                  name="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                , my project is{" "}
                <input
                  type="text"
                  name="org"
                  placeholder="John Doe Inc."
                  value={formData.org}
                  onChange={handleChange}
                />
                , and I would like to{" "}
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="Get in touch">Get in touch</option>
                  <option value="Hire you">Hire you</option>
                  <option value="Work together">Work together</option>
                  <option value="Other">Other</option>
                </select>{" "}
                .
                <br /> My budget is{" "}
                <input
                  type="text"
                  name="budget"
                  placeholder="1500$"
                  value={formData.budget}
                  onChange={handleChange}
                />
                . My idea/project is about
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {/* SUBMIT AREA */}
                <div className={styles.submitArea}>
                  <input
                    type="submit" // Changed to type="submit" for proper form handling
                    value={
                      status === "success"
                        ? "Message Sent!"
                        : isValid
                          ? "That's it, submit"
                          : "That's it, send"
                    }
                    className={styles.submitButton}
                    style={{
                      color: isValid ? "#ffffff" : "#444444",
                      cursor: isValid ? "pointer" : "default",
                    }}
                  />

                  {/* ERROR / SUCCESS MESSAGE BELOW BUTTON */}
                  <AnimatePresence mode="wait">
                    {status === "error" && (
                      <motion.p
                        style={{
                          marginTop: "2rem",
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={styles.errorMessage}
                      >
                        * Please fill in all the blanks first.
                      </motion.p>
                    )}
                    {status === "success" && (
                      <motion.p
                        style={{
                          marginTop: "2rem",
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.successMessage}
                      >
                        Thanks! I&apos;ll get back to you shortly.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </h1>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Footer Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.65, 0.05, 0, 1] }}
          className={styles.footerContent}
        >
          <p>All rights reserved &copy; 2026</p>
          <div className={styles.socials}>
            <ul>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/mohssine-chedgane/"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://x.com/muhsench"
                >
                  /Twitter(x)
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/milcodestudio/"
                >
                  /Instagram
                </Link>
              </li>
            </ul>
          </div>
          <p>Site by Mohssine Chedgane</p>
        </motion.div>
      </section>
    </main>
  );
};

export default Contact;
