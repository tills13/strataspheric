"use client";

import * as styles from "./styles.css";

import React, { useState } from "react";

import { classnames } from "../../utils/classnames";
import { FileTypeIcon } from "../FileTypeIcon";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  label?: string;
  onChangeValue?: (newValue: string) => void;
  placeholder?: string;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      id: propsId,
      inputClassName,
      name,
      label,
      onChange,
      onChangeValue,
      wrapperClassName,
      className,
      ...inputProps
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>();

    return (
      <div
        className={classnames(
          styles.inputFieldWrapper,
          wrapperClassName,
          className,
        )}
      >
        {inputProps.type === "file" && (
          <FileTypeIcon
            className={styles.inputFieldFileIcon}
            filePath={value || "something.txt"}
          />
        )}
        <input
          className={classnames(styles.inputFieldInput, inputClassName)}
          name={name}
          id={propsId || name}
          ref={ref}
          {...inputProps}
          onChange={(e) => {
            onChange?.(e);
            onChangeValue?.(e.target.value);
            setValue(e.currentTarget.value);
          }}
        />
        {label && (
          <label className={styles.inputFieldLabel} htmlFor={propsId || name}>
            {label}
          </label>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
