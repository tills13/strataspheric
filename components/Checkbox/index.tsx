"use client";

import * as styles from "./style.css";

import React, { InputHTMLAttributes, useId } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ className, id: propsId, ...rest }, ref) => {
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
  },
);

Checkbox.displayName = "Checkbox";
