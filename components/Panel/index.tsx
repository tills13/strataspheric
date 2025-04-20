import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Core, Props as CoreProps } from "../Core";

interface Props extends Omit<CoreProps<"div">, "as"> {
  className?: string;
  noPadding?: boolean;
}

export function Panel({ children, className, noPadding, ...rest }: Props) {
  return (
    <Core
      as="div"
      className={classnames(styles.panel, className)}
      {...rest}
      p={noPadding ? "0" : rest.p || "normal"}
    >
      {children}
    </Core>
  );
}
