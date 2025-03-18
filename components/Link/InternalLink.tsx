import * as styles from "./style.css";

import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends LinkProps {
  className?: string;
  noUnderline?: boolean;
}

export function InternalLink({
  children,
  className,
  noUnderline,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Link
      className={classnames(
        className,
        noUnderline ? styles.noUnderline : styles.link,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
