import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";

interface Props {
  className?: string;
  approverName: string;
}

export function MinutesApprover({ approverName, className }: Props) {
  return (
    <span className={classnames(styles.minutesApproverContainer, className)}>
      <CircleCheckIcon className={styles.minutesApproverIcon} /> Approved by{" "}
      {approverName}
    </span>
  );
}
