import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode[];
  placeholderEnabled?: boolean;
  compact?: boolean;
}

export function Select({
  children,
  className,
  placeholder,
  placeholderEnabled,
  ...delegateProps
}: Props) {
  return (
    <select
      className={classnames(styles.baseSelect, className)}
      placeholder={placeholder}
      {...delegateProps}
    >
      {placeholder && (
        <option value="" disabled={!placeholderEnabled}>
          {placeholder}
        </option>
      )}

      {children}
    </select>
  );
}
