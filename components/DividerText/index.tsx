import { vars } from "../../app/theme.css";
import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Group } from "../Group";

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
    <Group
      gap={gap}
      className={overrideClassName || classnames(styles.dividerText, className)}
    >
      {(gravity === "right" || gravity === "center") && (
        <span className={styles.dividerTextDivider} />
      )}
      <span className={styles.dividerTextText}>{children}</span>
      {(gravity === "left" || gravity === "center") && (
        <span className={styles.dividerTextDivider} />
      )}
    </Group>
  );
}
