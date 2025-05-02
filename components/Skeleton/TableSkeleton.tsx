import * as styles from "./style.css";

import React from "react";

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
    <table className={className}>
      <thead>
        <tr>
          {Array.from(new Array(columns)).map((_, i) => (
            <th className={cellClassName} key={i}>
              <div className={styles.skeletonBone} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from(new Array(rows)).map((_, rIdx) => (
          <tr key={rIdx}>
            {Array.from(new Array(columns)).map((_, cIdx) => (
              <td className={cellClassName} key={cIdx}>
                <div className={styles.skeletonBone} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
