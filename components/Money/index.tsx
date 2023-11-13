import * as styles from "./style.css";

interface Props {
  amount: number;
  unit?: string;
}

export function Money({ amount, unit = "$" }: Props) {
  return (
    <div className={styles.money}>
      <span className={styles.moneyUnit}>{unit}</span>
      <span className={styles.moneyAmount}>{amount}</span>
    </div>
  );
}
