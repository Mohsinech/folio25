import HomeGallery from "@/components/Home/HomeGallery";
import { projects } from "./data";
import styles from "@/components/Home/home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <h1 className="sr-only">Mohssine Chedgane, freelance designer and developer</h1>
      <HomeGallery projects={projects} />
      <div className={styles.foot}>
        <p className={styles.intro}>
          I&apos;m Mohssine, a freelance designer and developer in Rabat, Morocco.{" "}
          <span>
            I design and build fast websites, online stores and product interfaces for brands and
            founders worldwide.
          </span>
        </p>
        <p className={styles.hint}>
          <i aria-hidden="true" />
          Drag or scroll
        </p>
      </div>
    </main>
  );
}
