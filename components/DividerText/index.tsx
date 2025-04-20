import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Group } from "../Group";

interface Props extends React.ComponentProps<typeof Group> {
  children: React.ReactNode;
  className?: string;

  gravity?: "left" | "center" | "right";
}

export function DividerText({
  className,
  children,
  gravity = "center",
  ...rest
}: Props) {
  return (
    <Group className={classnames(styles.dividerText, className)} {...rest}>
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
