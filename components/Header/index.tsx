import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";
import { Core } from "../Core";

type ValidHeaderIntrinsicElements = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Props
  extends React.ComponentProps<typeof Core<ValidHeaderIntrinsicElements>> {
  as: ValidHeaderIntrinsicElements;
  children: React.ReactNode;
  className?: string;
}

export function Header({ as, children, className, ...rest }: Props) {
  const mClassName = styles.headerVariants[as] ?? styles.headerVariants.default;

  return (
    <Core as={as} className={classnames(mClassName, className)} {...rest}>
      {children}
    </Core>
  );
}
