import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  noUnderline?: boolean;
}

export function ExternalLink({
  children,
  className,
  noUnderline,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <a
      className={classnames(
        noUnderline ? styles.linkNoUnderline : styles.linkBase,
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
