import * as styles from "./style.css";

import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

interface Props extends LinkProps {
  className?: string;
}

export function InternalLink({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Link className={className || styles.link} {...props}>
      {children}
    </Link>
  );
}
