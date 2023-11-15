import { classnames } from "../../utils/classnames";
import { CycleIcon } from "../Icon/CycleIcon";
import * as styles from "./style.css";

interface Props {
  className?: string;
}

export function LoadingIcon({ className }: Props) {
  return <CycleIcon className={classnames(styles.loadingIcon, className)} />;
}
