import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

interface Props {
  centered?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function StaticPageContainer({ centered, children, className }: Props) {
  return (
    <div
      className={classnames(
        styles.staticPageContainer,
        centered && styles.centeredStaticPageContainer,
        className,
      )}
    >
      {children}
    </div>
  );
}
