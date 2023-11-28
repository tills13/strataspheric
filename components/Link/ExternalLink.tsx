import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function ExternalLink({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <a className={className || styles.link} {...props}>
      {children}
    </a>
  );
}
