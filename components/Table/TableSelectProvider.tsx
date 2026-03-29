"use client";

import React, { useCallback, useMemo, useState } from "react";

interface TableSelectContext {
  clearSelection(): void;
  isRowSelected(rowId: string): boolean;
  selectAll(rowIds: string[]): void;
  toggleRowSelected(rowId: string): void;
}

export const TableSelectCtx = React.createContext<
  TableSelectContext | undefined
>(undefined);

export const TableSelectedValuesCtx = React.createContext<string[]>([]);

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

  const clearSelection = useCallback(() => setSelectedRows([]), []);

  const selectAll = useCallback(
    (rowIds: string[]) => setSelectedRows(rowIds),
    [],
  );

  const value = useMemo(
    () => ({ clearSelection, isRowSelected, selectAll, toggleRowSelected }),
    [clearSelection, isRowSelected, selectAll, toggleRowSelected],
  );

  return (
    <TableSelectCtx.Provider value={value}>
      <TableSelectedValuesCtx.Provider value={selectedRows}>
        {children}
      </TableSelectedValuesCtx.Provider>
    </TableSelectCtx.Provider>
  );
}
