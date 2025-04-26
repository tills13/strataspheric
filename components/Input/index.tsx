"use client";

import * as styles from "./styles.css";

import React, { useState } from "react";

import { classnames } from "../../utils/classnames";
import { FileTypeIcon } from "../FileTypeIcon";
import { Group } from "../Group";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  actionRight?: React.ReactNode;
  actionLeft?: React.ReactNode;
  inputClassName?: string;
  label?: string;
  onChangeValue?: (newValue: string) => void;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  actionRight,
  actionLeft,
  className,
  id: propsId,
  inputClassName,
  name,
  label,
  onChange,
  onChangeValue,
  ref,
  ...inputProps
}: Props) {
  const [value, setValue] = useState<string>();

  return (
    <div className={classnames(styles.inputFieldWrapper, className)}>
      {inputProps.type === "file" && (
        <FileTypeIcon
          className={styles.inputFieldFileIcon}
          filePath={value || "something.txt"}
        />
      )}

      {actionLeft && (
        <Group className={styles.inputFieldLeftActionContainer}>
          {actionLeft}
        </Group>
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

      {actionRight && (
        <Group className={styles.inputFieldRightActionContainer}>
          {actionRight}
        </Group>
      )}

      {label && (
        <label className={styles.inputFieldLabel} htmlFor={propsId || name}>
          {label}
        </label>
      )}
    </div>
  );
}
