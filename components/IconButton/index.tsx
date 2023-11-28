import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Button } from "../Button";

interface Props extends React.ComponentProps<typeof Button> {}

export function IconButton({
  children,
  className,
  ...delegateProps
}: React.PropsWithChildren<Props>) {
  return (
    <Button
      className={
        className ||
        classnames(styles.iconButton, styles.iconButtonSizes.normal)
      }
      {...delegateProps}
    >
      {children}
    </Button>
  );
}
