import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { reactNodeCanReceiveClassNameProp } from "../../utils/react";
import { FlexBox } from "../FlexBox";

interface Props extends React.ComponentProps<typeof FlexBox> {
  equalWidthChildren?: boolean;
  from: keyof typeof styles.flexBreakpoint;
}

export function Flex({
  className,
  children,
  equalWidthChildren,
  from,
  ...delegateProps
}: React.PropsWithChildren<Props>) {
  return (
    <FlexBox
      className={classnames(
        className,
        styles.flex,
        styles.flexBreakpoint[from],
      )}
      {...delegateProps}
    >
      {React.Children.map(children, (child) =>
        reactNodeCanReceiveClassNameProp(child)
          ? React.cloneElement(child, {
              className: classnames(
                equalWidthChildren
                  ? styles.flexElement.fullWidth
                  : styles.flexElement.default,
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
