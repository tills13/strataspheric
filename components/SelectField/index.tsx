import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholderEnabled?: boolean;
  selectClassName?: string;
  wrapperClassName?: string;
}

export function SelectField({
  children,
  className,
  label: placeholder,
  placeholderEnabled,
  id: propsId,
  selectClassName,
  name,
  wrapperClassName,
  ...delegateProps
}: PropsWithChildren<Props>) {
  return (
    <div
      className={classnames(
        styles.selectFieldWrapper,
        wrapperClassName,
        className,
      )}
    >
      <select
        className={classnames(styles.selectFieldSelect, selectClassName)}
        label=""
        id={propsId || name}
        name={name}
        {...delegateProps}
      >
        {placeholder && (
          <option value="" disabled={!placeholderEnabled}>
            {placeholder}
          </option>
        )}

        {children}
      </select>

      {placeholder && (
        <label
          className={styles.selectFieldPlaceholder}
          htmlFor={propsId || name}
        >
          {placeholder}
        </label>
      )}
    </div>
  );
}
