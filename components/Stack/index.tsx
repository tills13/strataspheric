import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { reactNodeCanReceiveClassNameProp } from "../../utils/react";
import { FlexBox } from "../FlexBox";

interface Props
  extends Omit<React.ComponentProps<typeof FlexBox>, "direction"> {}

/** stack is a vertical stacking of elements */
export function Stack({ className, children, ...delegateProps }: Props) {
  return (
    <FlexBox
      className={classnames(styles.stack, className)}
      direction="column"
      {...delegateProps}
    >
      {React.Children.map(children, (c, i) =>
        reactNodeCanReceiveClassNameProp(c)
          ? React.cloneElement(c, {
              className: classnames(
                typeof c.props.className === "string"
                  ? c.props.className
                  : undefined,
                styles.stackElement,
              ),
            })
          : c,
      )}
    </FlexBox>
  );
}
