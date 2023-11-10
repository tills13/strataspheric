import * as styles from "./style.css";
import Link, { LinkProps } from "next/link";
import { classnames } from "../../utils/classnames";
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
    <Link className={classnames(styles.internalLink, className)} {...props}>
      {children}
    </Link>
  );
}
