import { iconColorVar, vars } from "../../app/theme.css";
import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import React from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.SVGAttributes<SVGElement> {
  className?: string;
  classNameOverride?: string;
  fillColor?: keyof typeof vars.colors;
  height?: number | string;
  size?: keyof typeof styles.iconSize;
}

export function Icon({
  children,
  className,
  classNameOverride,
  fillColor,
  height,
  size,
  style,

  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={
        classNameOverride ||
        classnames(
          className,
          typeof height !== "undefined"
            ? styles.iconWithDynamicHeight
            : styles.icon,
          size && styles.iconSize[size],
        )
      }
      style={{
        ...(height &&
          assignInlineVars({
            [styles.dynamicIconHeightVar]:
              typeof height === "number" ? `${height}px` : height,
          })),
        ...(fillColor &&
          assignInlineVars({ [iconColorVar]: vars.colors[fillColor] })),
        ...style,
      }}
      {...rest}
    >
      {children}
    </svg>
  );
}
