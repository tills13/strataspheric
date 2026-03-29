"use client";

import * as styles from "./styles.css";

import React, { useState } from "react";

import { classnames } from "../../utils/classnames";
import { Group } from "../Group";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  actionRight?: React.ReactNode;
  actionLeft?: React.ReactNode;
  icon?: React.ReactNode;
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
  icon,
  id: propsId,
  inputClassName,
  label: _label,
  name,
  onChange,
  onChangeValue,
  ref,
  ...inputProps
}: Props) {
  const [hasFile, setHasFile] = useState(false);

  return (
    <div className={classnames(styles.inputFieldWrapper, className)}>
      {actionLeft && (
        <Group className={styles.inputFieldLeftActionContainer}>
          {actionLeft}
        </Group>
      )}

      {icon && <div className={styles.inputFieldIconContainer}>{icon}</div>}

      <input
        className={classnames(styles.inputFieldInput, inputClassName)}
        data-has-file={hasFile}
        name={name}
        id={propsId || name}
        ref={ref}
        {...inputProps}
        onChange={(e) => {
          onChange?.(e);
          onChangeValue?.(e.target.value);

          if (inputProps.type === "file") {
            setHasFile((e.target.files?.length ?? 0) > 0);
          }
        }}
      />

      {actionRight && (
        <Group className={styles.inputFieldRightActionContainer}>
          {actionRight}
        </Group>
      )}
    </div>
  );
}
