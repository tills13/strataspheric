import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";
import { Core } from "../Core";

interface Props
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Omit<React.ComponentProps<typeof Core<"a">>, "as" | "color"> {
  noUnderline?: boolean;
}

export function ExternalLink({
  children,
  className,
  noUnderline,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Core
      as="a"
      className={classnames(
        className,
        noUnderline ? styles.noUnderline : styles.link,
      )}
      {...props}
    >
      {children}
    </Core>
  );
}
