import * as styles from "./style.css";

import React from "react";

import { classnames } from "../../utils/classnames";

interface Props {
  className?: string;
  cellClassName?: string;
  columns?: number;
  rows?: number;
}

export function TableSkeleton({
  cellClassName,
  className,
  columns = 1,
  rows = 1,
}: Props) {
  return (
    <table className={classnames(styles.tableSkeleton, className)}>
      <tr>
        {Array.from(new Array(columns)).map((_, i) => (
          <th className={cellClassName} key={i}>
            <div className={styles.skeletonBone} />
          </th>
        ))}
      </tr>
      {Array.from(new Array(rows)).map((_, rIdx) => (
        <tr key={rIdx}>
          {Array.from(new Array(columns)).map((_, cIdx) => (
            <td className={cellClassName} key={cIdx}>
              <div className={styles.skeletonBone} />
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}