import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className }: Props) {
  return <div className={classnames(styles.panel, className)}>{children}</div>;
}
