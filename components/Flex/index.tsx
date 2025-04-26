import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { reactNodeCanReceiveClassNameProp } from "../../utils/react";
import { FlexBox } from "../FlexBox";

interface Props extends React.ComponentProps<typeof FlexBox> {
  from: keyof typeof styles.flexBreakpoint;
}

export function Flex({
  className,
  children,
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
      {React.Children.map(children, (c, i) =>
        reactNodeCanReceiveClassNameProp(c)
          ? React.cloneElement(c, {
              className: classnames(
                styles.flexElement,
                typeof c.props.className === "string"
                  ? c.props.className
                  : undefined,
              ),
            })
          : c,
      )}
    </FlexBox>
  );
}
