import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { CycleIcon } from "../Icon/CycleIcon";

type CycleIconProps = React.ComponentProps<typeof CycleIcon>;

interface Props extends CycleIconProps {
  className?: string;
}

export function LoadingIcon({ className, ...delegateProps }: Props) {
  return (
    <CycleIcon
      className={classnames(styles.loadingIcon, className)}
      {...delegateProps}
    />
  );
}
