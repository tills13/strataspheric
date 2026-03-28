import * as styles from "./style.css";

import { Group } from "../Group";

interface Props {
  content?: React.ReactNode;
  end?: React.ReactNode;
}

export function TableFooter({ content, end }: Props) {
  return (
    <div className={styles.tableFooter}>
      <div className={styles.tableFooterInner}>
        <div>{content}</div>
        <Group className={styles.tableFooterEnd} justify="end">
          {end}
        </Group>
      </div>
    </div>
  );
}
