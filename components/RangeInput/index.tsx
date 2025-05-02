import * as styles from "./style.css";

import React, { InputHTMLAttributes } from "react";

import { classnames } from "../../utils/classnames";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const RangeInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className, ...rest }, ref) => (
    <input
      className={classnames(styles.base, className)}
      ref={ref}
      type="range"
      {...rest}
    />
  ),
);

RangeInput.displayName = "RangeInput";
