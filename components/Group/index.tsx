import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { reactNodeCanReceiveClassNameProp } from "../../utils/react";
import { FlexBox } from "../FlexBox";

interface Props
  extends Omit<React.ComponentProps<typeof FlexBox>, "direction"> {
  equalWidthChildren?: boolean;
}

export function Group({
  align = "center",
  className,
  children,
  justify = "start",
  equalWidthChildren,
  ...delegateProps
}: Props) {
  return (
    <FlexBox
      align={align}
      className={classnames(
        styles.group,

        className,
      )}
      direction="row"
      justify={justify}
      {...delegateProps}
    >
      {React.Children.map(children, (child) =>
        reactNodeCanReceiveClassNameProp(child)
          ? React.cloneElement(child, {
              className: classnames(
                equalWidthChildren
                  ? styles.groupElement.fullWidth
                  : styles.groupElement.default,
                typeof child.props.className === "string"
                  ? child.props.className
                  : undefined,
              ),
            })
          : child,
      )}
    </FlexBox>
  );
}
