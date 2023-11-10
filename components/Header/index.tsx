import { classnames } from "../../utils/classnames";
import * as styles from "./style.css";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onTouchEnd?: React.TouchEventHandler;
  priority: 1 | 2 | 3 | 4 | 5;
}

export function Header({ children, className, onTouchEnd, priority }: Props) {
  const Tag = `h${priority}` as keyof JSX.IntrinsicElements;

  const mClassName =
    styles.headerVariants[Tag] ?? styles.headerVariants.default;

  return (
    <Tag className={classnames(mClassName, className)} onTouchEnd={onTouchEnd}>
      {children}
    </Tag>
  );
}
