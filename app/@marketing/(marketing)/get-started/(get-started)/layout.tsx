import * as styles from "./style.css";
import React from "react";

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.centerColumnContainer}>{children}</div>
    </div>
  );
}
