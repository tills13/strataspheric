"use client";

import { useContext, useTransition } from "react";

import { archiveThreadsAction } from "../../app/@app/dashboard/inbox/actions";
import { pluralize } from "../../utils/pluralize";
import { BulkActions } from "../BulkActions";
import { Button } from "../Button";
import { ArchiveIcon } from "../Icon/ArchiveIcon";
import { LoadingIcon } from "../LoadingIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

export default function ArchiveSelectedInboxMessagesButton() {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);
  const [isPending, startTransition] = useTransition();

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  return (
    <BulkActions noun="message">
      <Button
        color="primary"
        disabled={isPending}
        icon={isPending ? <LoadingIcon /> : <ArchiveIcon />}
        onClick={() => {
          startTransition(async () => {
            await archiveThreadsAction(selectedRows);
            selectCtx.clearSelection();
          });
        }}
        title={`Archive ${selectedRows.length} ${pluralize(
          "message",
          selectedRows.length,
        )}`}
        size="small"
        style="tertiary"
      />
    </BulkActions>
  );
}
