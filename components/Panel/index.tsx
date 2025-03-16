import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Panel({ children, className, noPadding }: Props) {
  return (
    <div
      className={classnames(
        styles.panel,
        !noPadding && styles.panelPadding.normal,
        className,
      )}
    >
      {children}
    </div>
  );
}
