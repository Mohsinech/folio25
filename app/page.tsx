"use client";

import styles from "./page.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h1>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </h1>
          </div>
          {/* */}
          <div className={styles.info}>
            <p>Casablanca, Morocco</p>
            <p>Freelance designer & developer</p>
            <p>13 : 06 PM</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
