import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: keyof typeof styles.sizeVariants;
}

export function IconButton({
  children,
  className,
  size,
  ...rest
}: React.PropsWithChildren<Props>) {
  let sizeClassName = styles.sizeVariants.normal;

  if (size && styles.sizeVariants[size]) {
    sizeClassName = styles.sizeVariants[size];
  }

  return (
    <button
      className={classnames(styles.iconButton, sizeClassName, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
