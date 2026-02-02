import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import ScrambleLink from "@/utils/ScrambleText/ScrambleText";

const About = () => {
  return (
    <section className={styles.about}>
      {/* left */}
      <div className={styles.introInfo}>
        <h4>(Yuup, That&apos;s me)</h4>
        <div className={styles.imgWrapper}>
          <Image src="/assets/images/me.png" fill alt="about image" />
        </div>
        <div className={styles.socials}>
          <ul>
            <Link href="ig">Instagram/</Link>{" "}
            <Link href="ig"> Twitter(x)/</Link>
            <Link href="ig"> LinkedIn/</Link>
          </ul>
        </div>
      </div>

      {/* About Content */}
      <div className={styles.aboutContent}>
        <div className={styles.firstList}>
          <h3>(01) Biography</h3>
          <p>
            I’m Mohssine Chedgane, a front-end and <span>SaaS</span> developer
            specializing in high-end, performance-driven web experiences. I
            build elegant, scalable interfaces using modern technologies like{" "}
            <span>React</span>, <span>Next.js,</span> and{" "}
            <span>Tailwind CSS</span>, with a strong focus on{" "}
            <span>animation.</span>, usability, and product clarity. With a
            product-first mindset and a background that blends design
            sensibility with <span>engineering discipline,</span> I create
            digital products that are fast, refined, and built to scale—where
            every detail serves both the user and the business.
          </p>
        </div>

        <div className={styles.firstList}>
          <h3>(02) Field of Practice</h3>
          <ul>
            <li>Front-End & Backend Development,</li> <li>Saas Solutions,</li>
            <li>CMS & WordPress,</li>
            <li>Interactive Development,</li>
            <li>Ecommerce Solutions.</li>
          </ul>
        </div>

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
            learning independently through <span>Udemy</span>,<span>edX</span>,{" "}
            <span>YouTube</span>, and by studying high-quality web experiences
            on{" "}
            <Link
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.awwwards.com/"
            >
              <span>Awwwards</span>
            </Link>
            , shaping a product-focused and detail-driven approach to front-end
            and SaaS development.
          </p>
        </div>

        <div className={styles.firstList}>
          <h3>(04) Collaborations</h3>
          <div className={styles.dividers}>
            <div className={styles.divider}>
              <div className={styles.topInfo}>
                <h3>Brand</h3>
                <h3>Category</h3>
                <h3 className={styles.span}>Year</h3>
              </div>
              <div className={styles.line}></div>
            </div>
            {/*  */}
            <div className={styles.divider}>
              <div className={styles.topInfo}>
                <h4>Bentofolio</h4>
                <h4>Social media Brand</h4>
                <span>26&apos;</span>
              </div>
              <div className={styles.line}></div>
            </div>
            {/*  */}
            <div className={styles.divider}>
              <div className={styles.topInfo}>
                <h4>Ayourluxe</h4>
                <h4>Accessory Brand</h4>
                <span>25&apos;</span>
              </div>
              <div className={styles.line}></div>
            </div>
            {/*  */}
            <div className={styles.divider}>
              <div className={styles.topInfo}>
                <h4>Afolki Beauty</h4>
                <h4>Cosmetics Brand</h4>
                <span>24&apos;</span>
              </div>
              <div className={styles.line}></div>
            </div>
            {/*  */}
            <div className={styles.divider}>
              <div className={styles.topInfo}>
                <h4>Hyne Ma</h4>
                <h4>Watches Brand</h4>
                <span>24&apos;</span>
              </div>
              <div className={styles.line}></div>
            </div>
            {/*  */}
            <div className={styles.divider}>
              <div className={styles.topInfo}>
                <h4>Mohaba</h4>
                <h4>Hijab Brand</h4>
                <span>24&apos;</span>
              </div>
              <div className={styles.line}></div>
            </div>
            {/*  */}
          </div>
        </div>

        <div className={styles.firstList}>
          <h3>(05) Me on socials</h3>
          <ul className="flex flex-wrap gap-2">
            <li>Youtube,</li> <li>Medium,</li>
            <li>LinkedIn,</li>
            <li>Twitter(X),</li>
            <a href="mailto:chedganemouhssine@gmail.com">
              <li>Email,</li>
            </a>
            <li>Instagram,</li>
            <li>Discord.</li>
          </ul>
        </div>

        <div className={styles.firstList}>
          <h3>(06) Availabilties</h3>
          <p className="w-lg">
            &bull; Open to freelance projects, SaaS collaborations, and
            long-term opportunities.{" "}
            <ScrambleLink label="Let's Collaborate" href="/contact" /> ,I swear
            I check my emails :).
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
