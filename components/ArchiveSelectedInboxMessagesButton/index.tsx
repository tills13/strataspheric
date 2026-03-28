"use client";

import { useContext, useTransition } from "react";

import { archiveThreadsAction } from "../../app/@app/dashboard/inbox/actions";
import { pluralize } from "../../utils/pluralize";
import { Button } from "../Button";
import { ArchiveIcon } from "../Icon/ArchiveIcon";
import { LoadingIcon } from "../LoadingIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

export default function ArchiveSelectedInboxMessagesButton() {
  const hasSelect = !!useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);
  const [isPending, startTransition] = useTransition();

  if (!hasSelect || selectedRows.length === 0) {
    return null;
  }

  return (
    <Button
      color="primary"
      disabled={isPending}
      icon={isPending ? <LoadingIcon /> : <ArchiveIcon />}
      onClick={() => {
        startTransition(() => {
          archiveThreadsAction(selectedRows);
        });
      }}
      title={`Archive ${selectedRows.length} ${pluralize(
        "message",
        selectedRows.length,
      )}`}
      size="small"
      style="tertiary"
    />
  );
}
