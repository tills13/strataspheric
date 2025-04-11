import { vars } from "../../app/theme.css";
import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  divider?: React.ReactNode;
  justify?: keyof typeof styles.stackJustification;
  gap?: keyof typeof vars.spacing;
  tabIndex?: number;
}

/** stack is a vertical stacking of elements */
export function Stack(props: Props) {
  const {
    className,
    children,
    divider,
    justify = "start",
    gap = "normal",
    ...delegateProps
  } = props;
  const numChildren = React.Children.count(children);

  return (
    <div
      className={classnames(
        styles.stack,
        styles.stackGap[gap],
        styles.stackJustification[justify],
        className,
      )}
      {...delegateProps}
    >
      {React.Children.map(children, (c, i) => (
        <>
          {React.isValidElement(c)
            ? React.cloneElement(c, {
                ...c.props,
                className: classnames(styles.stackElement, c.props.className),
              })
            : c}
          {i !== numChildren - 1 && divider}
        </>
      ))}
    </div>
  );
}
