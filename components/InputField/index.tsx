import * as styles from "./styles.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  wrapperClassName?: string;
}

export function InputField({
  id: propsId,
  inputClassName,
  name,
  placeholder,
  type,
  wrapperClassName,
}: Props) {
  return (
    <div className={classnames(styles.inputFieldWrapper, wrapperClassName)}>
      <input
        className={classnames(styles.inputFieldInput, inputClassName)}
        name={name}
        id={propsId || name}
        placeholder=""
        type={type}
      />
      {placeholder && (
        <label
          className={styles.inputFieldPlaceholder}
          htmlFor={propsId || name}
        >
          {placeholder}
        </label>
      )}
    </div>
  );
}
