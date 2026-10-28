"use client";

import { useContact } from "@/components/Contact/ContactProvider";
import styles from "./home.module.css";

export default function MoreAboutButton() {
  const { openAbout } = useContact();
  return (
    <button type="button" className={styles.more} onClick={openAbout} aria-haspopup="dialog">
      More about me
      <span className={styles.plus} aria-hidden="true" />
    </button>
  );
}
