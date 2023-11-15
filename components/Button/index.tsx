import * as styles from "./style.css";
import React, { ButtonHTMLAttributes } from "react";
import { classnames } from "../../utils/classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: keyof typeof styles.sizeVariants;
  variant?: keyof typeof styles.variants;
}

export function Button({
  children,
  className,
  size,
  variant,
  ...rest
}: React.PropsWithChildren<Props>) {
  let variantClassName = styles.variants.base;

  if (variant && styles.variants[variant]) {
    variantClassName = styles.variants[variant];
  }

  let sizeClassName = styles.sizeVariants.normal;

  if (size && styles.sizeVariants[size]) {
    sizeClassName = styles.sizeVariants[size];
  }

  return (
    <button
      className={classnames(
        styles.base,
        variantClassName,
        sizeClassName,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
