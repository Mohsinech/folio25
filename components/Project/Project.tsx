import React from "react";
import styles from "./project.module.css";
import ScrambleSimple from "@/utils/ScrambleSimple/ScrambleSimple";

interface projectProps {
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  description: string;
  preview: string;
}

const Project = ({
  title,
  category,
  client,
  year,
  description,
  location,
  preview,
}: projectProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.gridInfo}>
        <ScrambleSimple label={title} />
        <ScrambleSimple label={category} />
        <ScrambleSimple label={client} />
        <ScrambleSimple label={location} />
        <ScrambleSimple label={year} />
      </div>

      {/* <div className={styles.contentData}>
        <h1>{description}</h1>

        <button className={styles.btn}>
          <ScrambleSimple label="Live site" />
        </button>
      </div> */}
    </div>
  );
};

export default Project;
