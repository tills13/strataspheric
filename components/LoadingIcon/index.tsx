import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { CycleIcon } from "../Icon/CycleIcon";

type CycleIconProps = React.ComponentProps<typeof CycleIcon>;

interface Props extends CycleIconProps {
  className?: string;
  loading?: boolean;
}

export function LoadingIcon({
  className,
  loading = true,
  ...delegateProps
}: Props) {
  return (
    <CycleIcon
      className={classnames(loading && styles.loadingIconLoading, className)}
      {...delegateProps}
    />
  );
}
