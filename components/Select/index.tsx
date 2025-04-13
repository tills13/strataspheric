import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  onChangeValue?: (value: string) => void;
  selectRef?: React.Ref<HTMLSelectElement>;
  placeholderEnabled?: boolean;
}

export function Select({
  children,
  className,
  id: propsId,
  label,
  name,
  onChange: propsOnChange,
  onChangeValue,
  placeholderEnabled,
  selectRef,
  ...delegateProps
}: PropsWithChildren<Props>) {
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChangeValue?.(e.target.value);
    propsOnChange?.(e);
  }

  return (
    <div className={classnames(styles.selectWrapper, className)}>
      <select
        className={classnames(styles.select)}
        id={propsId || name}
        name={name}
        onChange={onChangeValue || propsOnChange ? onChange : undefined}
        ref={selectRef}
        {...delegateProps}
      >
        {label && (
          <option
            className={styles.selectPlaceholder}
            value=""
            disabled={!placeholderEnabled}
          >
            {label}
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
