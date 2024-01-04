import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
}

export function Bone({ className }: Props) {
  return <span className={classnames(className, styles.skeletonBone)} />;
}
