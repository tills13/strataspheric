import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props extends React.AllHTMLAttributes<HTMLSpanElement> {
  className?: string;
  inline?: boolean;
}

export function Bone({ className, inline, ...rest }: Props) {
  return (
    <span
      className={classnames(
        className,
        inline ? styles.inlineSkeletonBone : styles.skeletonBone,
      )}
      {...rest}
    />
  );
}
