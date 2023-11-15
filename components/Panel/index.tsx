import * as styles from "./style.css";
import { classnames } from "../../utils/classnames";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className }: Props) {
  return <div className={classnames(styles.panel, className)}>{children}</div>;
}
