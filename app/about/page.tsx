"use client";

import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import ScrambleLink from "@/utils/ScrambleText/ScrambleText";
import ScrambleText from "@/utils/ScrambleSimple/ScrambleText";
import ScrollBlurOverlay from "@/components/ScrollBlurOverlay/ScrollBlurOverlay";
import ScrollFadeContent from "@/components/ScrollFadeContent/ScrollFadeContent";
import { FadeInUp } from "@/components/ui/ui";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const About = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const services = [
    {
      number: "01",
      title: "Design & Strategy",
      description:
        "I craft user-centric designs that balance aesthetics with functionality. From wireframes to high-fidelity prototypes, I ensure every pixel serves a purpose—delivering interfaces that are not only beautiful but intuitive and conversion-focused.",
    },
    {
      number: "02",
      title: "Development & Engineering",
      description:
        "I build performant, scalable websites and SaaS products from the ground up. Specializing in React, Next.js, and modern web technologies, I focus on seamless micro-interactions, smooth animations, and responsive design—bringing ideas to life with clean, maintainable code.",
    },
    {
      number: "03",
      title: "End-to-End Solutions",
      description:
        "From concept to launch, I handle the full spectrum—design, development, and deployment. My hybrid skill set allows me to bridge the gap between creativity and engineering, delivering polished, production-ready products that perform at scale.",
    },
  ];
  return (
    <section className={styles.about}>
      <ScrollBlurOverlay />
      <div className={styles.introInfo}>
        <div style={{ overflow: "hidden" }}>
          <FadeInUp delay={0.2}>
            <h4>(Yuup, That&apos;s me)</h4>
          </FadeInUp>
        </div>
        <div className={styles.imgWrapper}>
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{
              duration: 1.2,
              ease: [0.87, 0.13, 0, 1],
              delay: 0.8,
            }}
          >
            <Image src="/assets/images/me.webp" fill alt="about image" />
          </motion.div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <FadeInUp delay={0.4}>
            <div className={styles.socials}>
              <ul>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/muhsench/"
                >
                  Instagram/
                </Link>{" "}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://x.com/muhsench"
                >
                  {" "}
                  Twitter(x)/
                </Link>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/mohssine-chedgane/"
                >
                  {" "}
                  LinkedIn/
                </Link>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </div>

      <ScrollFadeContent className={styles.aboutContent}>
        <div style={{ overflow: "hidden" }}>
          <FadeInUp delay={0.6}>
            <div className={styles.firstList}>
              <h3>(01) Biography</h3>
              <p>
                I’m Mohssine Chedgane, a front-end and{" "}
                <Link className={styles.link} href="https://bentofolio.dev">
                  <span>SaaS</span>
                </Link>{" "}
                developer specializing in high-end, performance-driven web
                experiences. I build elegant, scalable interfaces using modern
                technologies like <span>React</span>, <span>Next.js,</span> and{" "}
                <span>Tailwind CSS</span>, with a strong focus on{" "}
                <span>animation.</span>, usability, and product clarity. With a
                product-first mindset and a background that blends design
                sensibility with <span>engineering discipline,</span> I create
                digital products that are fast, refined, and built to
                scale—where every detail serves both the user and the business.
              </p>
            </div>
          </FadeInUp>
        </div>

        <div style={{ overflow: "hidden" }}>
          <FadeInUp delay={0.8}>
            <div className={styles.firstList}>
              <h3>(02) Field of Practice</h3>
              <ul>
                <li>Front-End & Backend Development,</li>{" "}
                <li>Saas Solutions,</li>
                <li>CMS & WordPress,</li>
                <li>Interactive Development,</li>
                <li>Ecommerce Solutions.</li>
              </ul>
            </div>
          </FadeInUp>
        </div>

        <div style={{ overflow: "hidden" }}>
          <FadeInUp delay={1.0}>
            <div className={styles.firstList}>
              <h3>(03) Background</h3>
              <p>
                I began my software engineering journey in 2023 through the{" "}
                <Link
                  className={styles.link}
                  href="https://www.alxafrica.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <span>ALX Africa</span>
                </Link>{" "}
                program, building a strong technical foundation. I continued
                learning independently through <span>Udemy</span>,
                <span>edX</span>, <span>YouTube</span>, and by studying
                high-quality web experiences on{" "}
                <Link
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.awwwards.com/"
                >
                  <span>Awwwards</span>
                </Link>
                , shaping a product-focused and detail-driven approach to
                front-end and SaaS development.
              </p>
            </div>
          </FadeInUp>
        </div>

        <div style={{ overflow: "hidden" }}>
          <FadeInUp delay={1.2}>
            <div className={styles.firstList}>
              <h3>(04) Collaborations</h3>
              <div className={styles.dividers}>
                <div className={styles.divider}>
                  <div className={styles.topInfo}>
                    <h3>Brand</h3>
                    <h3>Location</h3>
                    <h3 className={styles.span}>Year</h3>
                  </div>
                  <div className={styles.line}></div>
                </div>

                <div className={styles.divider}>
                  <div className={styles.topInfo}>
                    <ScrambleLink
                      label="ayourluxe"
                      href="https://www.ayourluxe.com/"
                    />

                    <ScrambleText label="Morocco" />

                    <span>25&apos;</span>
                  </div>
                  <div className={styles.line}></div>
                </div>

                <div className={styles.divider}>
                  <div className={styles.topInfo}>
                    <ScrambleLink
                      label="Afolki Beauty"
                      href="https://www.afolki.store/"
                    />

                    <ScrambleText label="Morocco" />

                    <span>25&apos;</span>
                  </div>
                  <div className={styles.line}></div>
                </div>

                <div className={styles.divider}>
                  <div className={styles.topInfo}>
                    <ScrambleLink label="iohah" href="https://iohah.io/" />

                    <ScrambleText label="Indonesia, Bali" />

                    <span>25&apos;</span>
                  </div>
                  <div className={styles.line}></div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>

        <div style={{ overflow: "hidden" }}>
          <FadeInUp delay={1.4}>
            <div className={styles.firstList}>
              <h3>(05) I can help you with</h3>
              <div className={styles.accordion}>
                {services.map((service, index) => (
                  <div key={index} className={styles.accordionItem}>
                    <button
                      className={styles.accordionHeader}
                      onClick={() => toggleAccordion(index)}
                    >
                      <div className={styles.accordionTitle}>
                        <h4 className={styles.title}>{service.number}</h4>
                        <h4>{service.title}</h4>
                      </div>
                      <motion.span
                        className={styles.accordionIcon}
                        animate={{ rotate: openAccordion === index ? 45 : 0 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.65, 0.05, 0, 1],
                        }}
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openAccordion === index && (
                        <motion.div
                          className={styles.accordionContent}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: {
                              duration: 0.6,
                              ease: [0.65, 0.05, 0, 1],
                            },
                            opacity: {
                              duration: 0.4,
                              ease: [0.65, 0.05, 0, 1],
                            },
                          }}
                        >
                          <h5 className={styles.accordionDes}>
                            {service.description}
                          </h5>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>

        <div style={{ overflow: "hidden" }}>
          <FadeInUp delay={1.6}>
            <div className={styles.firstList}>
              <h3>(06) Me on socials</h3>
              <ul className="flex flex-wrap">
                <Link
                  href="https://www.youtube.com/@itsmuhsen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li>Youtube,</li>
                </Link>
                <Link
                  href="https://medium.com/@chedganemouhssine"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li>Medium,</li>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/mohssine-chedgane/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li>LinkedIn,</li>
                </Link>

                <Link
                  href="https://x.com/muhsench"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li>Twitter(X),</li>
                </Link>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:chedganemouhssine@gmail.com"
                >
                  <li>Email,</li>
                </Link>

                <Link
                  href="https://www.instagram.com/milcodestudio/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <li>Instagram.</li>
                </Link>

                {/* <li>Discord.</li> */}
              </ul>
            </div>
          </FadeInUp>
        </div>

        <div style={{ overflow: "hidden" }}>
          <FadeInUp delay={1.6}>
            <div className={styles.firstList}>
              <h3>(07) Availabilties</h3>
              <p>
                &bull; Open to freelance projects, SaaS collaborations, and
                long-term opportunities.{" "}
                <ScrambleLink label="Let's Collaborate" href="/contact" /> ,I
                swear I check my emails :).
              </p>
            </div>
          </FadeInUp>
        </div>
      </ScrollFadeContent>
    </section>
  );
};

export default About;
