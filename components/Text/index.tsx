import { S } from "../../sprinkles.css";
import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Core } from "../Core";

type ValidTextIntrinsicElements =
  | "address"
  | "label"
  | "p"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

interface BaseProps<E extends ValidTextIntrinsicElements> {
  as?: E;
  color?: S["color"] | "unset";
  noWrap?: boolean;
}

type Props<E extends ValidTextIntrinsicElements> = BaseProps<E> &
  Omit<React.ComponentProps<typeof Core<E>>, "as" | "color">;

export function Text<E extends ValidTextIntrinsicElements = "p">({
  as,
  children,
  className,
  noWrap,

  color: propsColor,
  fc: propsColorShort,

  fontFamily: propsFontFamily,
  ff: propsFontFamilyShort,

  fontSize: propsFontSize,
  fs: propsFontSizeShort,

  ...rest
}: React.PropsWithChildren<Props<E>>) {
  const fontFamily = propsFontFamily || propsFontFamilyShort || "text";

  const fontSize = propsFontSize || propsFontSizeShort || "normal";

  let color = propsColor || propsColorShort;

  if (color === "unset") {
    color = undefined;
  }

  return (
    <Core
      as={as || "p"}
      className={classnames(
        styles.text,
        className,
        noWrap && styles.textNoWrap,
        !color &&
          (propsColor || propsColorShort) !== "unset" &&
          styles.textColorInherit,
      )}
      fontFamily={fontFamily}
      fontSize={fontSize}
      {...(color && { color })}
      {...rest}
    >
      {children}
    </Core>
  );
}
