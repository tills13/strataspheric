import * as styles from "./style.css";

import React from "react";

import { Panel } from "../Panel";
import { Bone } from "./Bone";

interface Props {
  title?: React.ReactNode;
}

export function WidgetSkeleton({ title }: Props) {
  return (
    <Panel className={styles.widgetSkeleton}>
      {title ? (
        <div className={styles.skeletonHeader}>{title}</div>
      ) : (
        <div className={styles.skeletonBoneHeader} />
      )}

      <Bone />
      <Bone />
      <Bone />
    </Panel>
  );
}
