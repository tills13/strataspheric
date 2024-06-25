import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  emptyMessage?: React.ReactNode;
  items: Array<{
    icon: React.ReactNode;
    contents: React.ReactNode;
  }>;
}

export function Timeline({
  className,
  emptyMessage = "There's nothing here...",
  items,
}: Props) {
  return (
    <div className={classnames(styles.timeline, className)}>
      {items.length === 0 && (
        <div className={styles.timelineEmptyMessage}>{emptyMessage}</div>
      )}
      {items.map(({ contents, icon }, idx) => (
        <div key={idx} className={styles.timelineItem}>
          <span className={styles.timelineIconContainer}>{icon}</span>
          <div className={styles.timelineItemContent}>{contents}</div>
        </div>
      ))}
    </div>
  );
}
