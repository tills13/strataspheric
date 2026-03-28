import * as styles from "./style.css";

import React, { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";
import { Core } from "../Core";

interface Props
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
    Omit<React.ComponentProps<typeof Core<"a">>, "as"> {
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
