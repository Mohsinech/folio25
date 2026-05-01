"use client";

import React from "react";
import styles from "./archive.module.css";
import ScrambleText from "@/utils/ScrambleSimple/ScrambleSimple";
import Link from "next/link";

interface ArchiveProps {
  id: number;
  title: string;
  client: string;
  category: string;
  local: string;
  year: number;
  projectUrl: string;
  num: string;
}

const ArchiveList = ({
  id,
  title,
  client,
  category,
  local,
  year,
  num,

  projectUrl,
}: ArchiveProps) => {
  return (
    <div className={styles.archive}>
      <Link href={projectUrl} target="_blank" rel="noopener noreferrer">
        <div key={id} className={styles.archiveItem}>
          <div className="flex items-center gap-2">
            <ScrambleText className={styles.h2} label={num} />
            <ScrambleText className={styles.h2} label={title} />
          </div>
          <ScrambleText className={styles.h2} label={client} />
          <ScrambleText className={styles.h2} label={category} />
          <ScrambleText className={styles.h2} label={local} />
          <ScrambleText className={styles.h2} label={year.toString()} />
        </div>
      </Link>
    </div>
  );
};

export default ArchiveList;
