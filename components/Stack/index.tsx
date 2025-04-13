import { vars } from "../../app/theme.css";
import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Box } from "../Box";

interface Props extends React.ComponentProps<typeof Box> {}

/** stack is a vertical stacking of elements */
export function Stack({ className, children, ...delegateProps }: Props) {
  return (
    <Box className={classnames(styles.stack, className)} {...delegateProps}>
      {React.Children.map(children, (c, i) =>
        React.isValidElement(c) && c.type !== React.Fragment
          ? React.cloneElement(c, {
              ...c.props,
              className: classnames(styles.stackElement, c.props.className),
            })
          : c,
      )}
    </Box>
  );
}
