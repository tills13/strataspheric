"use client";

import React, { useCallback, useMemo, useState } from "react";

interface TableSelectContext {
  isRowSelected(rowId: string): boolean;
  toggleRowSelected(rowId: string): void;
}

export const TableSelectCtx = React.createContext<
  TableSelectContext | undefined
>(undefined);

export function TableSelectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const isRowSelected = useCallback(
    (rowId: string) => selectedRows.includes(rowId),
    [selectedRows],
  );

  const toggleRowSelected = useCallback(
    (rowId: string) =>
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.includes(rowId)
          ? prevSelectedRows.filter((mRowId) => mRowId !== rowId)
          : [...prevSelectedRows, rowId],
      ),
    [],
  );

  const value = useMemo(
    () => ({ isRowSelected, toggleRowSelected }),
    [isRowSelected, toggleRowSelected],
  );

  return (
    <TableSelectCtx.Provider value={value}>{children}</TableSelectCtx.Provider>
  );
}
