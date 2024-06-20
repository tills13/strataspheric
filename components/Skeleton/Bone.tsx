import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  inline?: boolean;
}

export function Bone({ className, inline }: Props) {
  return (
    <span
      className={classnames(
        className,
        inline ? styles.inlineSkeletonBone : styles.skeletonBone,
      )}
    />
  );
}
