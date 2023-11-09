import * as styles from "./style.css";
import React, { ButtonHTMLAttributes } from "react";
import { classnames } from "../../utils/classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className, ...rest }: Props) {
  return (
    <button className={classnames(styles.button, className)} {...rest}>
      {children}
    </button>
  );
}
