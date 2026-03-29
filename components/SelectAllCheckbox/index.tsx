"use client";

import { useContext } from "react";

import { Checkbox } from "../Checkbox";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

interface Props {
  rowIds: string[];
}

export function SelectAllCheckbox({ rowIds }: Props) {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);

  if (!selectCtx || rowIds.length === 0) {
    return null;
  }

  const allSelected = rowIds.length > 0 && rowIds.every((id) => selectedRows.includes(id));
  const someSelected = !allSelected && rowIds.some((id) => selectedRows.includes(id));

  return (
    <Checkbox
      checked={allSelected}
      ref={(el) => {
        if (el) {
          el.indeterminate = someSelected;
        }
      }}
      onChange={() => {
        if (allSelected) {
          selectCtx.clearSelection();
        } else {
          selectCtx.selectAll(rowIds);
        }
      }}
    />
  );
}
