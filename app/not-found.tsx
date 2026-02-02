import Galaxy from "@/components/Galaxy";
import styles from "./not.module.css";
import { ScrambleLink } from "@/utils";

export default function NotFound() {
  return (
    <main className={styles.notFoundContainer}>
      <div className={styles.centeredText}>
        <h1>Houston, we have a problem.</h1>
        <h3>(And by problem, I mean this page doesn&apos;t exist.)</h3>

        <div className={styles.teleportBtn}>
          <ScrambleLink
            className={styles.teleportLink}
            href="/"
            label="INITIATE TELEPORT"
          />
        </div>
      </div>
      <div style={{ width: "100%", height: "100dvh", position: "relative" }}>
        <Galaxy
          starSpeed={0.5}
          density={1}
          hueShift={140}
          speed={1}
          glowIntensity={0.3}
          saturation={0}
          mouseRepulsion
          repulsionStrength={2}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          transparent
        />
      </div>
    </main>
  );
}
