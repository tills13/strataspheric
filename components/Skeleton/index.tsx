import * as styles from "./style.css";

import React from "react";

import { Panel } from "../Panel";

interface Props {
  title?: React.ReactNode;
}

export function Skeleton({ title }: Props) {
  return (
    <Panel className={styles.skeleton}>
      {title ? (
        <div className={styles.skeletonHeader}>{title}</div>
      ) : (
        <div className={styles.skeletonBoneHeader} />
      )}

      <div className={styles.skeletonBone} />
      <div className={styles.skeletonBone} />
      <div className={styles.skeletonBone} />
    </Panel>
  );
}
