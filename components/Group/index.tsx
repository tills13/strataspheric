import { vars } from "../../app/theme.css";
import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  children: React.ReactNode;
  equalWidthChildren?: boolean;
  gap?: keyof typeof vars.spacing;
  align?: keyof typeof styles.groupAlignment;
  justify?: keyof typeof styles.groupJustification;
  overflow?: keyof typeof styles.groupOverflow;
  tabIndex?: number;
  wrap?: boolean;
}

export function Group({
  className,
  children,
  gap = "normal",
  align = "default",
  justify = "default",
  overflow,
  tabIndex,
  equalWidthChildren,
}: Props) {
  return (
    <div
      className={classnames(
        styles.group,
        styles.groupGap[gap],
        styles.groupJustification[justify],
        styles.groupAlignment[align],
        overflow && styles.groupOverflow[overflow],
        className,
      )}
      tabIndex={tabIndex}
    >
      {React.Children.map(children, (c, i) =>
        React.isValidElement(c)
          ? React.cloneElement(c, {
              ...c.props,
              className: classnames(
                equalWidthChildren
                  ? styles.groupElement.fullWidth
                  : styles.groupElement.default,
                c.props.className,
              ),
            })
          : c,
      )}
    </div>
  );
}
