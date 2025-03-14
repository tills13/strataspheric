import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Wrap } from "../Wrap";

interface Props {
  as?: "p" | "address";
  className?: string;
  color?: keyof typeof styles.textColors;
  size?: keyof typeof styles.textSizes;
}

export function Text({
  as = "p",
  children,
  color = "primary",
  className,
  size = "normal",
}: React.PropsWithChildren<Props>) {
  const TextComponent = as;

  return (
    <TextComponent
      className={classnames(
        styles.text,
        styles.textColors[color],
        styles.textSizes[size],
        className,
      )}
    >
      {children}
    </TextComponent>
  );
}
