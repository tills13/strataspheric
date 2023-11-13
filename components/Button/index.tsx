import * as styles from "./style.css";
import React, { ButtonHTMLAttributes } from "react";
import { classnames } from "../../utils/classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  compact?: boolean;
}

export function Button({
  children,
  className,
  compact,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={classnames(compact ? styles.compact : styles.base, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
