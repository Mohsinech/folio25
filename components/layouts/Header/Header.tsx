"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import ScrambleSimple from "@/utils/ScrambleSimple/ScrambleSimple";
import { ScrambleLink } from "@/utils";
import Link from "next/link";
import LatestProjectModal from "@/components/LatestProjectModal";
import ModalMobile from "@/components/screen/Modal/ModalMobile";
import BlurText from "@/components/BlurText";

//

const Header = () => {
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isLatestProjectModalOpen, setIsLatestProjectModalOpen] =
    useState(false);
  const [latestModalVariant, setLatestModalVariant] = useState<
    "mobile" | "desktop"
  >("desktop");
  const scrollY = useScroll().scrollY;
  const headerY = useTransform(scrollY, [0, 200], [0, -100]);

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      if (isLatestProjectModalOpen) {
        main.style.filter = "blur(8px)";
        main.style.pointerEvents = "none";
      } else {
        main.style.filter = "blur(0px)";
        main.style.pointerEvents = "auto";
      }
    }
  }, [isLatestProjectModalOpen]);

  const pathname = usePathname();

  // Close the modal whenever the route changes (e.g., navigating to /latest)
  useEffect(() => {
    if (!pathname) return;
    const id = window.setTimeout(() => setIsLatestProjectModalOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  const handleSocialsToggle = () => {
    setIsSocialsOpen((prev) => !prev);
  };

  const handleLatestProjectOpen = () => {
    const isTabletOrMobile = window.innerWidth <= 1024;
    setLatestModalVariant(isTabletOrMobile ? "mobile" : "desktop");
    setIsLatestProjectModalOpen(true);
  };

  // Conditions

  return (
    <>
      <motion.header style={{ y: headerY }} className={styles.header}>
        {/* LOGO */}
        <div className={styles.logo}>
          <ScrambleLink
            data-vt="true"
            view-transition-name="logo"
            className={styles.h1}
            href="/"
            label="MOHSSINE"
          />
        </div>

        {/* NAV BUTTONS */}
        <nav className={styles.nav}>
          {/* latest project */}
          <div className={styles.latest}>
            <button className={styles.btn} onClick={handleLatestProjectOpen}>
              <ScrambleSimple label="Latest Project" />
            </button>
          </div>
          {/* Let's talk */}
          <div className={styles.talk}>
            <button className={styles.btn}>
              <ScrambleLink
                data-vt="true"
                view-transition-name="lets-talk"
                href="/contact"
                label="Let's talk"
              />
            </button>
          </div>
          {/* Socials */}
          <div className={styles.socials}>
            <button
              className={`${styles.btn} ${isSocialsOpen ? styles.btnActive : ""}`}
              onClick={handleSocialsToggle}
              aria-expanded={isSocialsOpen}
              aria-haspopup="menu"
              type="button"
            >
              <ScrambleSimple label="Socials Network" />
            </button>

            {/* overlay */}
            <AnimatePresence initial={false}>
              {isSocialsOpen && (
                <motion.div
                  className={styles.btnOverlay}
                  initial={{
                    clipPath: "polygon(0 0, 100% 0, 100% 9%, 0 0)",
                    scale: 0.95,
                    opacity: 0,
                  }}
                  animate={{
                    clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)",
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{
                    clipPath: "polygon(0 0, 100% 0, 100% 9%, 0 0)",
                    scale: 0.95,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
                >
                  <ul>
                    <li>
                      <Link href="/">
                        <BlurText
                          text="Instagram"
                          delay={80}
                          stepDuration={0.5}
                          animateBy="words"
                          direction="bottom"
                        />
                      </Link>
                    </li>
                    <li>
                      <div className="overflow-hidden">
                        <Link href="/">
                          <BlurText
                            text="Twitter"
                            delay={80}
                            stepDuration={0.5}
                            animateBy="words"
                            direction="bottom"
                          />
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="overflow-hidden">
                        <Link href="/">
                          <BlurText
                            text="Github"
                            delay={80}
                            stepDuration={0.5}
                            animateBy="words"
                            direction="bottom"
                          />
                        </Link>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </motion.header>

      {/* Latest Project Modal */}
      {isLatestProjectModalOpen &&
        (latestModalVariant === "mobile" ? (
          <ModalMobile
            isOpen={isLatestProjectModalOpen}
            onClose={() => setIsLatestProjectModalOpen(false)}
          />
        ) : (
          <LatestProjectModal
            isOpen={isLatestProjectModalOpen}
            onClose={() => setIsLatestProjectModalOpen(false)}
          />
        ))}
    </>
  );
};

export default Header;
