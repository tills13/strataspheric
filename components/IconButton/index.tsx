import * as styles from "./style.css";

import React, { ButtonHTMLAttributes } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof styles.sizeVariants;
}

export function IconButton({ children, className, size, ...rest }: Props) {
  let sizeClassName = styles.sizeVariants.normal;

  if (size && styles.sizeVariants[size]) {
    sizeClassName = styles.sizeVariants[size];
  }

  return (
    <button
      className={classnames(styles.base, sizeClassName, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
