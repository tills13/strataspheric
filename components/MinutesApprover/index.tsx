import * as styles from "./style.css";

import { CircleCheckIcon } from "../Icon/CircleCheckIcon";

interface Props {
  approverName: string;
}

export function MinutesApprover({ approverName }: Props) {
  return (
    <span className={styles.minutesApproverContainer}>
      <CircleCheckIcon className={styles.minutesApproverIcon} /> Approved by{" "}
      {approverName}
    </span>
  );
}
