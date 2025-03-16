import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  onChangeValue?: <T extends string>(value: T) => void;
  selectRef?: React.MutableRefObject<HTMLSelectElement>;
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
  placeholder,
  placeholderEnabled,
  selectRef,
  ...delegateProps
}: PropsWithChildren<Props>) {
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChangeValue?.(e.target.value);
    propsOnChange?.(e);
  }

  console.log(delegateProps);

  return (
    <div className={classnames(styles.selectWrapper, className)}>
      <select
        className={classnames(styles.select)}
        id={propsId || name}
        name={name}
        onChange={onChangeValue || propsOnChange ? onChange : undefined}
        placeholder={placeholder}
        ref={selectRef}
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
