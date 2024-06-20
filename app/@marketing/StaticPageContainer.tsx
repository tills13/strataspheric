import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

export function StaticPageContainer({
  children,
  className,
  fullWidth,
}: {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={classnames(styles.staticPageContainer, className)}>
      {children}
    </div>
  );
}
