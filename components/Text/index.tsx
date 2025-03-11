import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  color?: keyof typeof styles.textColors;
}

export function Text({
  children,
  color = "primary",
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <p className={classnames(styles.text, styles.textColors[color], className)}>
      {children}
    </p>
  );
}
