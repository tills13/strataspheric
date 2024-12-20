import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Logo } from "../Logo";

interface Props {
  className?: string;
}

export function Wordmark({ className }: Props) {
  return (
    <div className={classnames(styles.wordmark, className)}>
      <Logo className={styles.wordmarkLogo} />
      Strataspheric
    </div>
  );
}
