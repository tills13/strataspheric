import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

const Dollars = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

interface Props {
  amount: number;
  className?: string;
  overrideClassName?: string;
  unit?: string;
}

export function Money({
  amount,
  className,
  overrideClassName,
  unit = "$",
}: Props) {
  return (
    <span className={overrideClassName || classnames(styles.money, className)}>
      <span className={styles.moneyUnit}>{unit}</span>
      <span className={styles.moneyAmount}>{Dollars.format(amount)}</span>
    </span>
  );
}
