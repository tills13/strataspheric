import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";

type Recipient = {
  userId: string;
  name: string;
  unit: string | null;
};

interface Props {
  className?: string;
  recipients: Recipient[];
}

export function RecipientsSelect({ className, recipients }: Props) {
  return (
    <div className={classnames(className, styles.recipientsSelect)}>
      {recipients.map((r, idx) => (
        <label
          key={r.userId}
          htmlFor={`recipients[${idx}]`}
          className={styles.recipient}
        >
          <input
            className={styles.recipientCheckbox}
            id={`recipients[${idx}]`}
            type="checkbox"
            name={`recipients[${r.userId}]`}
          />
          <CircleCheckIcon className={styles.recipientCheck} />
          {r.name}
        </label>
      ))}
    </div>
  );
}
