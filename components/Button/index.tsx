import * as styles from "./style.css";

import React, { ButtonHTMLAttributes } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({
  children,
  className,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={
        className || classnames(styles.fullWidth, styles.buttonSizes.normal)
      }
      {...rest}
    >
      {children}
    </button>
  );
}
