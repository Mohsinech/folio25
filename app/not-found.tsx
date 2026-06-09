import styles from "./not.module.css";
import { ScrambleLink } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oops! someone is lost • Mohssine Chedgane",
};

export default function NotFound() {
  return (
    <main className={styles.notFoundContainer}>
      <div className={styles.grid}>
        <p>404</p>
        <p>Route not found</p>
        <p>Mohssine Chedgane</p>
        <p>Morocco / Worldwide</p>
      </div>

      <section className={styles.centeredText}>
        <p className={styles.eyebrow}>Lost page</p>
        <h1>This page left the portfolio.</h1>
        <h3>
          The work is still here, the link just needs a cleaner direction.
        </h3>

        <div className={styles.teleportBtn}>
          <ScrambleLink
            className={styles.teleportLink}
            href="/"
            label="Back home"
          />
        </div>
      </section>

      <div className={styles.index}>
        <span>Selected systems</span>
        <span>Fast websites</span>
        <span>Creative frontend</span>
        <span>SEO foundations</span>
      </div>
    </main>
  );
}
