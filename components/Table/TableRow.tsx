import * as styles from "./style.css";

import { classnames } from "../../utils/classnames";
import { Checkbox } from "../Checkbox";
import { Group } from "../Group";
import { InternalLink } from "../Link/InternalLink";
import { Wrap } from "../Wrap";

interface Props {
  actions?: React.ReactNode;
  className?: string;
  content: React.ReactNode;
  link?: React.ComponentProps<typeof InternalLink>["href"];
  selected?: boolean;
  rowEnd?: React.ReactNode;
}

export function TableRow({
  actions,
  className,
  content,
  link,
  rowEnd,
  selected,
}: Props) {
  return (
    <div className={classnames(className, styles.tableRow)}>
      <Checkbox className={styles.tableRowCheckbox} checked={selected} />

      <div className={styles.tableRowContent}>
        <Wrap
          with={(children) =>
            link ? (
              <InternalLink href={link} noUnderline>
                {children}
              </InternalLink>
            ) : (
              children
            )
          }
        >
          {content}
        </Wrap>
      </div>

      <Group justify="end">{rowEnd}</Group>

      <div className={styles.tableRowActions}>{actions}</div>
    </div>
  );
}
