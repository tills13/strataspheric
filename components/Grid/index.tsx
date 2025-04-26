"use client";

import { breakpoints } from "../../app/theme.css";
import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import React from "react";

import { classnames } from "../../utils/classnames";
import { Core } from "../Core";

interface Props extends Omit<React.ComponentProps<typeof Core<"div">>, "as"> {
  cols: Partial<Record<keyof typeof breakpoints, number>> & { base: number };
}

export function Grid({
  children,
  className,
  cols,
  gap = "normal",
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <Core
      as="div"
      className={classnames(styles.grid, cols && styles.gridColumns, className)}
      style={assignInlineVars({
        [styles.gridTemplateColumnsBase]: `${cols.base}`,
        ...(cols.mobile && {
          [styles.gridTemplateColumnsMobile]: `${cols.mobile}`,
        }),
        ...(cols.mobilePlus && {
          [styles.gridTemplateColumnsMobilePlus]: `${cols.mobilePlus}`,
        }),
        ...(cols.tablet && {
          [styles.gridTemplateColumnsTablet]: `${cols.tablet}`,
        }),
        ...(cols.tabletPlus && {
          [styles.gridTemplateColumnsTabletPlus]: `${cols.tabletPlus}`,
        }),
        ...(cols.desktop && {
          [styles.gridTemplateColumnsDesktop]: `${cols.desktop}`,
        }),
      })}
      gap={gap}
      {...rest}
    >
      {children}
    </Core>
  );
}
