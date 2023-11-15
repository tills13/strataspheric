import { variable } from "../../theme";
import { classnames } from "../../utils/classnames";
import { Logo } from "../Logo";
import * as styles from "./style.css";

interface Props {
  className?: string;
  color: string;
}

export function Wordmark({ className, color }: Props) {
  const colorVariable = variable(styles.color);

  return (
    <div
      style={{ [colorVariable]: color }}
      className={classnames(styles.wordmark, className)}
    >
      <Logo className={styles.wordmarkLogo} />
      Strataspheric
    </div>
  );
}
