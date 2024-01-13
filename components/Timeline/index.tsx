import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  items: Array<{
    icon: React.ReactNode;
    contents: React.ReactNode;
  }>;
}

export function Timeline({ className, items }: Props) {
  return (
    <div className={classnames(styles.timeline, className)}>
      {items.map(({ contents, icon }, idx) => (
        <div key={idx} className={styles.timelineItem}>
          <span className={styles.timelineIconContainer}>{icon}</span>
          <div className={styles.timelineItemContent}>{contents}</div>
        </div>
      ))}
    </div>
  );
}
