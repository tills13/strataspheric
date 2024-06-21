import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function ExternalLink({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <a className={classnames(className, styles.link)} {...props}>
      {children}
    </a>
  );
}
