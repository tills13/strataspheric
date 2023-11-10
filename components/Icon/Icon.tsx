import * as styles from "./style.css";
import React from "react";
import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
}

export function Icon({ children, className }: React.PropsWithChildren<Props>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      className={classnames(styles.icon, className)}
    >
      {children}
    </svg>
  );
}
