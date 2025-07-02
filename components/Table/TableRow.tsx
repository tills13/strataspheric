"use client";

import * as styles from "./style.css";

import { useContext } from "react";

import { classnames } from "../../utils/classnames";
import { Checkbox } from "../Checkbox";
import { Group } from "../Group";
import { ExternalLink } from "../Link/ExternalLink";
import { InternalLink } from "../Link/InternalLink";
import { Wrap } from "../Wrap";
import { TableSelectCtx } from "./TableSelectProvider";

interface Props {
  actions?: React.ReactNode;
  className?: string;
  content: React.ReactNode;
  link?: string;
  rowEnd?: React.ReactNode;
  rowId: string;
}

export function TableRow({
  actions,
  className,
  content,
  link,
  rowEnd,
  rowId,
}: Props) {
  const tableSelectContext = useContext(TableSelectCtx);

  return (
    <div className={classnames(className, styles.tableRow)}>
      <Wrap
        with={(children) => {
          if (link) {
            const isInternalLink = link.startsWith("/");

            return isInternalLink ? (
              <InternalLink
                className={styles.tableRowInner}
                href={link}
                noUnderline
              >
                {children}
              </InternalLink>
            ) : (
              <ExternalLink
                className={styles.tableRowInner}
                target="_blank"
                href={link}
                noUnderline
              >
                {children}
              </ExternalLink>
            );
          }

          return <div className={styles.tableRowInner}>{children}</div>;
        }}
      >
        {tableSelectContext && (
          <Checkbox
            className={styles.tableRowCheckbox}
            checked={tableSelectContext.isRowSelected(rowId)}
            onClick={() => tableSelectContext.toggleRowSelected(rowId)}
          />
        )}

        <div className={styles.tableRowContent}>{content}</div>

        <Group className={styles.tableRowEnd} justify="end">
          {rowEnd}
        </Group>
      </Wrap>

      {actions && <div className={styles.tableRowActions}>{actions}</div>}
    </div>
  );
}
