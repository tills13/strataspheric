"use client";

import * as styles from "./styles.css";

import React, { useState } from "react";

import { classnames } from "../../utils/classnames";
import { FileTypeIcon } from "../FileTypeIcon";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  wrapperClassName?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      id: propsId,
      inputClassName,
      name,
      placeholder,
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
          placeholder=""
          ref={ref}
          {...inputProps}
          onChange={(e) => {
            inputProps.onChange?.(e);
            setValue(e.currentTarget.value);
          }}
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
  },
);

InputField.displayName = "InputField";
