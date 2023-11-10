import * as styles from "./style.css";
import React, { ButtonHTMLAttributes } from "react";
import { classnames } from "../../utils/classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}

export function IconButton({ children, className, compact, ...rest }: Props) {
  return (
    <button
      className={classnames(compact ? styles.compact : styles.base, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
