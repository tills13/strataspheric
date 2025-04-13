import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Box } from "../Box";

interface Props extends React.ComponentProps<typeof Box> {
  equalWidthChildren?: boolean;
  overflow?: keyof typeof styles.groupOverflow;
}

export function Group({
  align = "center",
  className,
  children,
  justify = "start",
  overflow,
  equalWidthChildren,
  ...delegateProps
}: Props) {
  return (
    <Box
      align={align}
      className={classnames(
        styles.group,
        overflow && styles.groupOverflow[overflow],
        className,
      )}
      justify={justify}
      {...delegateProps}
    >
      {React.Children.map(children, (c, i) =>
        React.isValidElement(c) && c.type !== React.Fragment
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
    </Box>
  );
}
