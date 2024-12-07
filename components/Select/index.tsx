import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholderEnabled?: boolean;
}

export function Select({
  children,
  className,
  label: placeholder,
  placeholderEnabled,
  ...delegateProps
}: PropsWithChildren<Props>) {
  return (
    <select
      className={classnames(styles.select, className)}
      label={placeholder}
      defaultValue=""
      {...delegateProps}
    >
      {placeholder && (
        <option
          className={styles.selectPlaceholder}
          value=""
          disabled={!placeholderEnabled}
        >
          {placeholder}
        </option>
      )}

      {children}
    </select>
  );
}
