"use client";

import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import ScrambleLink from "@/utils/ScrambleText/ScrambleText";
import ScrambleText from "@/utils/ScrambleSimple/ScrambleText";
import ScrollBlurOverlay from "@/components/ScrollBlurOverlay/ScrollBlurOverlay";
import ScrollFadeContent from "@/components/ScrollFadeContent/ScrollFadeContent";
import { FadeInUp } from "@/components/ui/ui";
import { motion } from "framer-motion";

const About = () => {
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
            <Image src="/assets/images/me.png" fill alt="about image" />
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
              <h3>(05) Me on socials</h3>
              <ul className="flex flex-wrap gap-2">
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
              <h3>(06) Availabilties</h3>
              <p className="w-lg">
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
