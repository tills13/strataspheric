"use client";

import { useContext, useTransition } from "react";

import {
  deleteFilesAction,
  setFilesVisibilityAction,
} from "../../app/@app/dashboard/files/actions";
import { pluralize } from "../../utils/pluralize";
import { BulkActions } from "../BulkActions";
import { Button } from "../Button";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { LockLockedIcon } from "../Icon/LockLockedIcon";
import { LockUnlockedIcon } from "../Icon/LockUnlockedIcon";
import { LoadingIcon } from "../LoadingIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

interface Props {
  /** Map of file ID to whether it's public */
  fileVisibility: Record<string, boolean>;
}

export function BulkFileActions({ fileVisibility }: Props) {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);
  const [isPending, startTransition] = useTransition();

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  const label = `${selectedRows.length} ${pluralize(
    "file",
    selectedRows.length,
  )}`;

  // If the first selected file is public, offer "make private" and vice versa
  const firstIsPublic = fileVisibility[selectedRows[0]] ?? false;
  const targetVisibility = firstIsPublic ? "private" : "public";

  return (
    <BulkActions noun="file">
      {targetVisibility === "public" ? (
        <Button
          color="primary"
          disabled={isPending}
          icon={isPending ? <LoadingIcon /> : <LockUnlockedIcon />}
          onClick={() => {
            startTransition(async () => {
              await setFilesVisibilityAction(selectedRows, "public");
              selectCtx.clearSelection();
            });
          }}
          title={`Make ${label} public`}
          size="small"
          style="tertiary"
        />
      ) : (
        <Button
          color="primary"
          disabled={isPending}
          icon={isPending ? <LoadingIcon /> : <LockLockedIcon />}
          onClick={() => {
            startTransition(async () => {
              await setFilesVisibilityAction(selectedRows, "private");
              selectCtx.clearSelection();
            });
          }}
          title={`Make ${label} private`}
          size="small"
          style="tertiary"
        />
      )}
      <Button
        color="error"
        disabled={isPending}
        icon={isPending ? <LoadingIcon /> : <DeleteIcon />}
        onClick={() => {
          startTransition(async () => {
            await deleteFilesAction(selectedRows);
            selectCtx.clearSelection();
          });
        }}
        title={`Delete ${label}`}
        size="small"
        style="tertiary"
      />
    </BulkActions>
  );
}
