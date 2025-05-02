"use client";

import * as styles from "./style.css";

import React, { useId } from "react";

import { classnames } from "../../utils/classnames";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  ref?: React.Ref<HTMLInputElement>;
}

export function Checkbox({ className, id: propsId, ref, ...rest }: Props) {
  const id = useId();

  return (
    <label
      className={classnames(styles.checkbox, className)}
      htmlFor={propsId || id}
    >
      <input
        className={styles.checkboxElement}
        ref={ref}
        type="checkbox"
        id={propsId || id}
        {...rest}
      />
    </label>
  );
}
