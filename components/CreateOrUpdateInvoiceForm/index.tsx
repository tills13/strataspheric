"use client";

import { s } from "../../sprinkles.css";

import { useRef, useState, useTransition } from "react";

import {
  deleteInvoiceAction,
  upsertInvoiceAction,
} from "../../app/@app/dashboard/invoices/actions";
import { Invoice } from "../../data";
import { patchTimezoneOffset } from "../../utils/datetime";
import { Button } from "../Button";
import { DateInput } from "../DateInput";
import { FileSelect } from "../FileSelect";
import { Group } from "../Group";
import { AddIcon } from "../Icon/AddIcon";
import { CycleIcon } from "../Icon/CycleIcon";
import { InfoPanel } from "../InfoPanel";
import { Input } from "../Input";
import { LoadingIcon } from "../LoadingIcon";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";
import { TextArea } from "../TextArea";

interface Props {
  className?: string;
  invoice?: Invoice;
  onCreateOrUpdateInvoice?: (invoice: Invoice) => void;
  showDeleteInvoiceButton?: boolean;
}

export function CreateOrUpdateInvoiceForm({
  className,
  invoice,
  onCreateOrUpdateInvoice,
  showDeleteInvoiceButton,
}: Props) {
  const [deletePending, startTransition] = useTransition();
  const [loadingNextInvoiceId, setLoadingNextInvoiceId] = useState(false);
  const invoiceIdInputRef = useRef<HTMLInputElement>(null!);

  async function getNextInvoiceId() {
    setLoadingNextInvoiceId(true);
    const r = await fetch("/api/invoices/getNextInvoiceId");
    const rJson = await r.json();
    setLoadingNextInvoiceId(false);
    invoiceIdInputRef.current.value = rJson.nextId;
  }

  return (
    <form
      action={async (fd) => {
        patchTimezoneOffset(fd, "dueBy");

        const mInvoice = await upsertInvoiceAction(invoice?.id, fd);
        onCreateOrUpdateInvoice?.(mInvoice);
      }}
      className={className}
    >
      <Stack>
        <Group gap={invoice ? "normal" : "small"}>
          <Input
            actionRight={
              <Button
                icon={<LoadingIcon loading={loadingNextInvoiceId} />}
                color="primary"
                onClick={getNextInvoiceId}
                style="tertiary"
                type="button"
              />
            }
            name="identifier"
            label="Invoice ID"
            placeholder="#"
            disabled={!!invoice}
            defaultValue={invoice?.identifier}
            ref={invoiceIdInputRef}
            required
          />

          <Input
            className={s({ w: "full" })}
            min="0"
            name="amount"
            label="Amount"
            pattern="\d+(\.\d\d?)?"
            placeholder="$"
            disabled={!!invoice?.isPaid}
            defaultValue={invoice?.amount}
            required
          />
        </Group>
        <TextArea
          name="description"
          label="Description"
          placeholder="What is this invoice in reference to..."
          disabled={!!invoice?.isPaid}
          defaultValue={invoice?.description || ""}
        />
        <FileSelect
          label="Invoice File"
          name="fileId"
          disabled={!!invoice?.isPaid}
          defaultValue={invoice ? invoice.fileId ?? "" : ""}
        />
        {!invoice?.isPaid && (
          <InfoPanel level="info">
            <Text>
              Select an <b>Invoice File</b> if the invoice references a physical
              file that has been scanned and uploaded to Strataspheric.
            </Text>
          </InfoPanel>
        )}
        <DateInput
          label="Due Date"
          name="dueBy"
          type="single"
          disabled={!!invoice?.isPaid}
          defaultValue={invoice?.dueBy || ""}
        />
        <Group gap="normal">
          <StatusButton
            color="primary"
            disabled={!!invoice?.isPaid}
            iconRight={<AddIcon />}
            style="primary"
            type="submit"
          >
            {invoice ? "Update Invoice" : "Create Invoice"}
          </StatusButton>

          {showDeleteInvoiceButton && invoice && !invoice.isPaid && (
            <StatusButton
              onClick={() => {
                startTransition(() => deleteInvoiceAction(invoice.id));
              }}
              color="error"
              style="secondary"
              isPending={deletePending}
              type="button"
            >
              Delete Invoice
            </StatusButton>
          )}
        </Group>
      </Stack>
    </form>
  );
}
