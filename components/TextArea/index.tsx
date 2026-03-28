import * as styles from "./style.css";

import React, { TextareaHTMLAttributes } from "react";

import { classnames } from "../../utils/classnames";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...rest }, ref) => (
    <div className={classnames(styles.wrapper, className)}>
      <textarea
        className={classnames(styles.textareaTextarea)}
        ref={ref}
        {...rest}
      />
    </div>
  ),
);

TextArea.displayName = "TextArea";
