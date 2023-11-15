import { classnames } from "../../utils/classnames";
import * as styles from "./style.css";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function GlobalHeader({ children, className }: Props) {
  return (
    <header className={classnames(styles.globalHeader, className)}>
      {children}
    </header>
  );
}
