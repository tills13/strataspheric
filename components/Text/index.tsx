import React from "react";

import { classnames } from "../../utils/classnames";
import * as styles from "./style.css.ts";

interface Props {
  className?: string;
}

export function Text({ children, className }: React.PropsWithChildren<Props>) {
  return <p className={classnames(styles.text, className)}>{children}</p>;
}
