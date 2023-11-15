import React from "react";
import * as styles from "./style.css";

interface Props {
  title?: React.ReactNode;
}

export function Skeleton({ title }: Props) {
  return (
    <div className={styles.skeleton}>
      {title ? (
        <div className={styles.skeletonHeader}>{title}</div>
      ) : (
        <div className={styles.skeletonBoneHeader} />
      )}

      <div className={styles.skeletonBone} />
      <div className={styles.skeletonBone} />
      <div className={styles.skeletonBone} />
    </div>
  );
}
