"use client";

import * as styles from "./style.css";

export function NothingHere({
  children = "Nothing here yet.",
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.orbField}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
        <div className={styles.orb4} />
        <div className={styles.orb5} />
      </div>
      <span className={styles.text}>{children}</span>
    </div>
  );
}
