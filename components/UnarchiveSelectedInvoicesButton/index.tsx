"use client";

import { useContext, useTransition } from "react";

import { unarchiveInvoicesAction } from "../../app/@app/dashboard/invoices/actions";
import { pluralize } from "../../utils/pluralize";
import { BulkActions } from "../BulkActions";
import { Button } from "../Button";
import { UnarchiveIcon } from "../Icon/UnarchiveIcon";
import { LoadingIcon } from "../LoadingIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

export function UnarchiveSelectedInvoicesButton() {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);
  const [isPending, startTransition] = useTransition();

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  return (
    <BulkActions noun="invoice">
      <Button
        color="primary"
        disabled={isPending}
        icon={isPending ? <LoadingIcon /> : <UnarchiveIcon />}
        onClick={() => {
          startTransition(async () => {
            await unarchiveInvoicesAction(selectedRows);
            selectCtx.clearSelection();
          });
        }}
        title={`Unarchive ${selectedRows.length} ${pluralize(
          "invoice",
          selectedRows.length,
        )}`}
        size="small"
        style="tertiary"
      />
    </BulkActions>
  );
}
