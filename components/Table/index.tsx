import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

interface Props {
  children: React.ReactNode[];
  className?: string;
}

export function Table({ children, className }: Props) {
  return <div className={classnames(className, styles.table)}>{children}</div>;
}
