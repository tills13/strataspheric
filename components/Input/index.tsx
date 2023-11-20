import * as styles from "./style.css";

import React, { InputHTMLAttributes } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  compact?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, compact, ...rest }, ref) => (
    <input
      className={classnames(compact ? styles.compact : styles.base, className)}
      ref={ref}
      {...rest}
    />
  ),
);

Input.displayName = "Input";
