"use client";

import { useContext } from "react";

import { pluralize } from "../../utils/pluralize";
import { Button } from "../Button";
import { ArchiveIcon } from "../Icon/ArchiveIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

export default function ArchiveSelectedInboxMessagesButton() {
  const hasSelect = !!useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);

  if (!hasSelect) {
    return null;
  }

  return (
    <Button
      color="primary"
      icon={<ArchiveIcon />}
      title={`Archive ${selectedRows.length} ${pluralize(
        "message",
        selectedRows.length,
      )}`}
      size="small"
      style="tertiary"
    />
  );
}
