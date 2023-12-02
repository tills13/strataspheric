import * as styles from "./style.css";

import React from "react";

interface Props {
  items: Array<{
    icon: React.ReactNode;
    contents: React.ReactNode;
  }>;
}

export function Timeline({ items }: Props) {
  return (
    <div className={styles.timeline}>
      {items.map(({ contents, icon }, idx) => (
        <div key={idx} className={styles.timelineItem}>
          <span className={styles.timelineIconContainer}>{icon}</span>
          <div className={styles.timelineItemContent}>{contents}</div>
        </div>
      ))}
    </div>
  );
}
