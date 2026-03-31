import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  current: number;
  total: number;
}

export function ProgressBar({ className, current, total }: Props) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={classnames(styles.progressBar, className)}>
      <span className={styles.progressLabel}>
        {current}/{total}
      </span>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
