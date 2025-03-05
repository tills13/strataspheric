import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholderEnabled?: boolean;
}

export function Select({
  children,
  className,
  id: propsId,
  label,
  name,
  placeholder,
  placeholderEnabled,
  ...delegateProps
}: PropsWithChildren<Props>) {
  return (
    <div className={classnames(styles.selectWrapper, className)}>
      <select
        className={classnames(styles.select)}
        placeholder={placeholder}
        id={propsId || name}
        name={name}
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
      {label && (
        <label className={styles.selectFieldLabel} htmlFor={propsId || name}>
          {label}
        </label>
      )}
    </div>
  );
}
