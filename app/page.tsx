"use client";

import Project from "@/components/Project/Project";
import { projectData } from "./data";
import styles from "./page.module.css";
import ScrambleSimple from "@/utils/ScrambleSimple/ScrambleSimple";
import { ScrambleLink } from "@/utils";

const Home = () => {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.content}>
          {/* <h1>
              Hey, I&apos;m mohssine. I&apos;m a fullstack creative engineer who
              builds interfaces so polished they’ll make your retina screen feel
              underqualified. I&apos;m also a basketballer who has yet to meet a
              hoope he can’t disappoint, a content creator capturing the
              cinematic side of my own CHAOS, and a proud product of morocco
              operating internationally but still powered by at least five cups
              of min tea a day.
            </h1> */}

          <div className={styles.par}>
            <p>
              [SYSTEM LOG]: Current rank: Silver in Rocket League (please
              don&apos;t ask).
            </p>
            <p>Current status: $0 in the bank, $1M in the vision.</p>
            <p> Current hunger: 8/10 for seafood and world domination.</p>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section className={styles.projects}>
        <div className={styles.flex}>
          <h3>
            Costum work on request{" "}
            <ScrambleLink
              href="/contact"
              className={styles.emailLink}
              label="email"
            />
          </h3>

          <h3>
            View in{" "}
            <ScrambleLink
              href="/contact"
              className={styles.emailLink}
              label="Grid"
            />{" "}
            mode.
          </h3>
        </div>
        {/*  */}
        <div className={styles.space}>
          {projectData.map((data) => (
            <Project key={data.id} {...data} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
