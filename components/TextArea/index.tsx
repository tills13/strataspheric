import * as styles from "./style.css";

import React, { TextareaHTMLAttributes } from "react";

import { classnames } from "../../utils/classnames";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, label, ...rest }, ref) => (
    <div className={classnames(styles.wrapper, className)}>
      <textarea
        className={classnames(styles.textareaTextarea)}
        ref={ref}
        {...rest}
      />
      {label && (
        <label
          className={styles.textareaPlaceholder}
          htmlFor={rest.id || rest.name}
        >
          {label}
        </label>
      )}
    </div>
  ),
);

TextArea.displayName = "TextArea";
