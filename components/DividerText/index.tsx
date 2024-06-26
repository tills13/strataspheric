import { vars } from "../../app/theme.css";
import * as styles from "./style.css";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  overrideClassName?: string;
  gap?: keyof typeof vars.spacing;
  gravity?: "left" | "center" | "right";
}

export function DividerText({
  className,
  overrideClassName,
  children,
  gap = "normal",
  gravity = "center",
}: Props) {
  return (
    <div
      className={overrideClassName || classnames(styles.dividerText, className)}
      style={assignInlineVars({
        [styles.dividerTextGapVar]: vars.spacing[gap],
      })}
    >
      {(gravity === "right" || gravity === "center") && (
        <span className={styles.dividerTextDivider} />
      )}
      <span className={styles.dividerTextText}>{children}</span>
      {(gravity === "left" || gravity === "center") && (
        <span className={styles.dividerTextDivider} />
      )}
    </div>
  );
}
