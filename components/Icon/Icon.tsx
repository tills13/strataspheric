import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.SVGAttributes<SVGElement> {
  className?: string;
}

export function Icon({
  children,
  className,
  ...rest
}: React.PropsWithChildren<Props>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={classnames(className, styles.icon)}
      {...rest}
    >
      {children}
    </svg>
  );
}
