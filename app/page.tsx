"use client";

import React, { useState } from "react";
import Project from "@/components/Project/Project";
import { projectData } from "./data";
import styles from "./page.module.css";
import ProjectMobile from "@/components/screen/Project/ProjectMobile";

const Home = () => {
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);

  const handleProjectToggle = (id: number) => {
    setOpenProjectId((prev) => (prev === id ? null : id));
  };

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
        {/*  */}
        <div className={styles.space}>
          {projectData.map((data) => (
            <React.Fragment key={data.id}>
              <div className="hidden lg:block">
                <Project
                  key={data.id}
                  {...data}
                  isOpen={openProjectId === data.id}
                  hasActive={openProjectId !== null}
                  onToggle={handleProjectToggle}
                />
              </div>
              <div className="block lg:hidden">
                <ProjectMobile
                  key={data.id}
                  {...data}
                  isOpen={openProjectId === data.id}
                  hasActive={openProjectId !== null}
                  onToggle={handleProjectToggle}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
