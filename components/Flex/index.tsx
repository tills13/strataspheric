import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Box } from "../Box";

interface Props extends React.ComponentProps<typeof Box> {
  from: keyof typeof styles.flexBreakpoint;
}

export function Flex({
  className,
  children,
  from,
  ...delegateProps
}: React.PropsWithChildren<Props>) {
  return (
    <Box
      className={classnames(
        className,
        styles.flex,
        styles.flexBreakpoint[from],
      )}
      {...delegateProps}
    >
      {children}
    </Box>
  );
}
