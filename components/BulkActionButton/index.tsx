"use client";

import { useContext, useTransition } from "react";

import { pluralize } from "../../utils/pluralize";
import { BulkActions } from "../BulkActions";
import { Button } from "../Button";
import { LoadingIcon } from "../LoadingIcon";
import {
  TableSelectCtx,
  TableSelectedValuesCtx,
} from "../Table/TableSelectProvider";

interface BulkActionButtonProps {
  action: (ids: string[]) => Promise<void>;
  noun: string;
  icon: React.ReactNode;
  /** Supports {count} and {label} templates, e.g. "Archive {label}" */
  titleTemplate: string;
  color?: "primary" | "success" | "error" | "warning";
}

/**
 * A single bulk action button that reads selection from TableSelectCtx.
 * Wraps itself in BulkActions (showing "N items selected") when used standalone.
 * For multiple buttons in a group, use BulkActionButtons instead.
 */
export function BulkActionButton({
  action,
  noun,
  icon,
  titleTemplate,
  color = "primary",
}: BulkActionButtonProps) {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  const label = `${selectedRows.length} ${pluralize(
    noun,
    selectedRows.length,
  )}`;
  const resolvedTitle = titleTemplate
    .replace("{count}", String(selectedRows.length))
    .replace("{label}", label);

  return (
    <BulkActions noun={noun}>
      <BulkActionButtonInner
        action={action}
        icon={icon}
        title={resolvedTitle}
        color={color}
      />
    </BulkActions>
  );
}

/**
 * Renders multiple bulk action buttons in a single BulkActions wrapper.
 * Use this when you need several actions sharing one "N items selected" label.
 */
export function BulkActionButtons({
  noun,
  children,
}: {
  noun: string;
  children: React.ReactNode;
}) {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  return <BulkActions noun={noun}>{children}</BulkActions>;
}

/**
 * The inner button without BulkActions wrapper.
 * Use inside BulkActionButtons for grouped actions.
 */
export function BulkActionButtonInner({
  action,
  icon,
  title,
  color = "primary",
}: {
  action: (ids: string[]) => Promise<void>;
  icon: React.ReactNode;
  title: string;
  color?: "primary" | "success" | "error" | "warning";
}) {
  const selectCtx = useContext(TableSelectCtx);
  const selectedRows = useContext(TableSelectedValuesCtx);
  const [isPending, startTransition] = useTransition();

  if (!selectCtx || selectedRows.length === 0) {
    return null;
  }

  return (
    <Button
      color={color}
      disabled={isPending}
      icon={isPending ? <LoadingIcon /> : icon}
      onClick={() => {
        startTransition(async () => {
          await action(selectedRows);
          selectCtx.clearSelection();
        });
      }}
      title={title}
      size="small"
      style="tertiary"
    />
  );
}
