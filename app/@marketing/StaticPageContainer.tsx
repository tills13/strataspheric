import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

export function StaticPageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={classnames(styles.staticPageContainer, className)}>
      {children}
    </div>
  );
}
