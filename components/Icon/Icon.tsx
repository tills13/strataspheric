import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import React from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.SVGAttributes<SVGElement> {
  className?: string;
  classNameOverride?: string;
  height?: number | string;
}

export function Icon({
  children,
  className,
  classNameOverride,
  height,
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
        )
      }
      style={{
        ...(height &&
          assignInlineVars({
            [styles.dynamicIconHeightVar]:
              typeof height === "number" ? `${height}px` : height,
          })),
        ...style,
      }}
      {...rest}
    >
      {children}
    </svg>
  );
}
