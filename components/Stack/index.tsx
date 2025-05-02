import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { reactNodeCanReceiveClassNameProp } from "../../utils/react";
import { FlexBox } from "../FlexBox";

type Props = Omit<React.ComponentProps<typeof FlexBox>, "direction">;

/** stack is a vertical stacking of elements */
export function Stack({ className, children, ...delegateProps }: Props) {
  return (
    <FlexBox
      className={classnames(styles.stack, className)}
      direction="column"
      {...delegateProps}
    >
      {React.Children.map(children, (child) =>
        reactNodeCanReceiveClassNameProp(child)
          ? React.cloneElement(child, {
              className: classnames(
                typeof child.props.className === "string"
                  ? child.props.className
                  : undefined,
                styles.stackElement,
              ),
            })
          : child,
      )}
    </FlexBox>
  );
}
