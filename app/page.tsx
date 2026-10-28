import HomeGallery from "@/components/Home/HomeGallery";
import MoreAboutButton from "@/components/Home/MoreAboutButton";
import { projects } from "./data";
import styles from "@/components/Home/home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <h1 className="sr-only">Mohssine Chedgane, freelance designer and developer</h1>
      <HomeGallery projects={projects} />
      <div className={styles.foot}>
        <MoreAboutButton />
        <p className={styles.hint}>
          <i aria-hidden="true" />
          Drag or scroll
        </p>
      </div>
    </main>
  );
}
