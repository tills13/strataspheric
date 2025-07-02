import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Core } from "../Core";

interface Props extends Omit<React.ComponentProps<typeof Core<"h2">>, "as"> {
  children: React.ReactNode;
}

export function DashboardLayoutHeader({ children, className, ...rest }: Props) {
  return (
    <Core
      as="h2"
      className={classnames(styles.dashboardLayoutHeader, className)}
      {...rest}
    >
      {children}
    </Core>
  );
}
