import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  as?: "address" | "label" | "p" | "span";
  className?: string;
  color?: keyof typeof styles.textColors;
  noWrap?: boolean;
  size?: keyof typeof styles.textSizes;
  weight?: keyof typeof styles.textWeights;
}

export function Text({
  as = "p",
  children,
  color,
  className,
  noWrap,
  size = "normal",
  weight,
}: React.PropsWithChildren<Props>) {
  const TextComponent = as;

  return (
    <TextComponent
      className={classnames(
        styles.text,
        color ? styles.textColors[color] : styles.textColorInherit,
        styles.textSizes[size],
        weight && styles.textWeights[weight],
        noWrap && styles.textNoWrap,
        className,
      )}
    >
      {children}
    </TextComponent>
  );
}
