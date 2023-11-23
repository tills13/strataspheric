import * as styles from "./style.css";

import React, { TextareaHTMLAttributes } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  compact?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, compact, ...rest }, ref) => (
    <textarea
      className={classnames(styles.base, className)}
      ref={ref}
      {...rest}
    />
  ),
);

TextArea.displayName = "TextArea";
