import * as styles from "./style.css";

import React, { InputHTMLAttributes } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...rest }, ref) => (
    <div className={classnames(styles.base, className)}>
      <input
        className={styles.checkboxElement}
        ref={ref}
        type="checkbox"
        {...rest}
      />
    </div>
  ),
);

Checkbox.displayName = "Checkbox";
