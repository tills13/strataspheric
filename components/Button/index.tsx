import * as styles from "./style.css";
import React, { ButtonHTMLAttributes } from "react";
import { classnames } from "../../utils/classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  compact?: boolean;
  variant?: keyof typeof styles.variants;
}

export function Button({
  children,
  className,
  compact,
  variant,
  ...rest
}: React.PropsWithChildren<Props>) {
  let variantClassName = styles.variants.base;

  if (variant && styles.variants[variant]) {
    variantClassName = styles.variants[variant];
  }

  return (
    <button className={classnames(variantClassName, className)} {...rest}>
      {children}
    </button>
  );
}
