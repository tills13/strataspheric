import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  as?: "address" | "label" | "p" | "span" | "h1";
  className?: string;
  color?: keyof typeof styles.textColors | "unset";
  family?: keyof typeof styles.textFamilies;
  noWrap?: boolean;
  size?: keyof typeof styles.textSizes;
  weight?: keyof typeof styles.textWeights;
}

export function Text({
  as = "p",
  children,
  color,
  className,
  family = "text",
  noWrap,
  size = "normal",
  weight,
}: React.PropsWithChildren<Props>) {
  const TextComponent = as;

  return (
    <TextComponent
      className={classnames(
        styles.text,
        styles.textSizes[size],
        color !== "unset" &&
          (color ? styles.textColors[color] : styles.textColorInherit),
        family && styles.textFamilies[family],
        weight && styles.textWeights[weight],
        noWrap && styles.textNoWrap,
        className,
      )}
    >
      {children}
    </TextComponent>
  );
}
