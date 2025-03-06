import { vars } from "../../app/theme.css";
import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  children: React.ReactNode;
  divider?: React.ReactNode;

  gap?: keyof typeof vars.spacing;
  tabIndex?: number;
}

/** stack is a vertical stacking of elements */
export function Stack(props: Props) {
  const { className, children, divider, gap = "normal", tabIndex } = props;
  const numChildren = React.Children.count(children);

  return (
    <div
      className={classnames(styles.stack, styles.stackGap[gap], className)}
      tabIndex={tabIndex}
    >
      {React.Children.map(children, (c, i) => (
        <>
          {React.isValidElement(c)
            ? React.cloneElement(c, {
                className: classnames(styles.stackElement, c.props.className),
              })
            : c}
          {i !== numChildren - 1 && divider}
        </>
      ))}
    </div>
  );
}
