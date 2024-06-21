import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";

const Dollars = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

interface Props {
  amount: number;
  className?: string;
  unit?: string;
}

export function Money({ amount, className, unit = "$" }: Props) {
  return (
    <div className={classnames(styles.money, className)}>
      <span className={styles.moneyUnit}>{unit}</span>
      <span className={styles.moneyAmount}>{Dollars.format(amount)}</span>
    </div>
  );
}
