import * as styles from "./style.css";
import React from "react";
import { vars } from "../../app/theme.css";
import { variable } from "../../app/theme";
import { classnames } from "../../utils/classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  gap?: keyof typeof vars.spacing;
}

export function DividerText({ className, children, gap = "normal" }: Props) {
  const gapVariable = variable(styles.dividerTextGapVar);

  return (
    <div
      className={classnames(styles.dividerText, className)}
      style={{ [gapVariable]: vars.spacing[gap] }}
    >
      <span className={styles.dividerTextDivider} />
      {children}
      <span className={styles.dividerTextDivider} />
    </div>
  );
}
