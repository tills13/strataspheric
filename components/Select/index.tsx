import { fieldRightActionContainer } from "../Form/style.css";
import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";
import { Group } from "../Group";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  actionRight?: React.ReactNode;
  label?: string;
  onChangeValue?: (value: string) => void;
  ref?: React.Ref<HTMLSelectElement>;
  placeholder?: string;
  placeholderEnabled?: boolean;
}

export function Select({
  actionRight,
  children,
  className,
  id: propsId,
  label,
  name,
  onChange: propsOnChange,
  onChangeValue,
  placeholder,
  placeholderEnabled,
  ref,
  ...delegateProps
}: PropsWithChildren<Props>) {
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChangeValue?.(e.target.value);
    propsOnChange?.(e);
  }

  const placeholderOption = label || placeholder;
  console.log(name, delegateProps);

  return (
    <div className={classnames(styles.selectWrapper, className)}>
      <select
        className={classnames(styles.select)}
        id={propsId || name}
        name={name}
        onChange={onChangeValue || propsOnChange ? onChange : undefined}
        ref={ref}
        {...delegateProps}
      >
        {placeholderOption && (
          <option
            className={styles.selectPlaceholder}
            value=""
            disabled={!placeholderEnabled}
          >
            {placeholderOption}
          </option>
        )}

        {children}
      </select>

      {actionRight && (
        <Group className={fieldRightActionContainer}>{actionRight}</Group>
      )}

      {label && (
        <label className={styles.selectFieldLabel} htmlFor={propsId || name}>
          {label}
        </label>
      )}
    </div>
  );
}
