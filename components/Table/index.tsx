"use client";

import * as styles from "./style.css";

import { useContext } from "react";

import { classnames } from "../../utils/classnames";
import { TableSelectCtx } from "./TableSelectProvider";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className }: Props) {
  const hasTableSelectCtx = !!useContext(TableSelectCtx);
  return (
    <div
      className={classnames(
        className,
        hasTableSelectCtx ? styles.tableWithSelect : styles.table,
      )}
    >
      {children}
    </div>
  );
}
