"use client";

import { useRef, useState, useTransition } from "react";

import {
  markInvoiceAsPaidAction,
  upsertInvoiceAction,
} from "../../app/@app/dashboard/invoices/actions";
import { Invoice } from "../../data";
import { patchTimezoneOffset } from "../../utils/datetime";
import { Button } from "../Button";
import { DateInput } from "../DateInput";
import { FileSelect } from "../FileSelect";
import { Flex } from "../Flex";
import { AddIcon } from "../Icon/AddIcon";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
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
}

export function CreateOrUpdateInvoiceForm({
  className,
  invoice,
  onCreateOrUpdateInvoice,
}: Props) {
  const [markPaidPending, startMarkPaidTransition] = useTransition();
  const [loadingNextInvoiceId, setLoadingNextInvoiceId] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
        <Flex from="tablet">
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
            min="0"
            name="amount"
            label="Amount"
            placeholder="$"
            pattern="\d+(\.\d\d?)?"
            disabled={!!invoice?.isPaid}
            defaultValue={invoice?.amount}
            required
          />

          <DateInput
            label="Due Date"
            name="dueBy"
            type="single"
            disabled={!!invoice?.isPaid}
            defaultValue={invoice?.dueBy || ""}
          />
        </Flex>
        <TextArea
          name="description"
          label="Description"
          placeholder="What is this invoice in reference to..."
          disabled={!!invoice?.isPaid}
          defaultValue={invoice?.description || ""}
        />

        <InfoPanel level="default">
          <Text>
            Select an <b>Invoice File</b> if the invoice references a physical
            file that has been scanned and uploaded to Strataspheric.
          </Text>
          <FileSelect
            name="fileId"
            disabled={!!invoice?.isPaid}
            defaultValue={invoice ? invoice.fileId ?? "" : ""}
            placeholder="Invoice File"
          />
        </InfoPanel>

        <Flex gap="normal" from="mobilePlus">
          <StatusButton
            color="primary"
            disabled={!!invoice?.isPaid}
            iconRight={<AddIcon />}
            style="primary"
            type="submit"
          >
            {invoice ? "Update Invoice" : "Create Invoice"}
          </StatusButton>

          {invoice && invoice.status !== "draft" && (
            <StatusButton
              color="success"
              iconRight={<CircleCheckIcon />}
              onClick={() =>
                startMarkPaidTransition(() =>
                  markInvoiceAsPaidAction(invoice.id),
                )
              }
              isPending={markPaidPending}
              disabled={invoice.isPaid === 1}
              fullWidth={false}
            >
              {invoice.isPaid === 1 ? "Paid" : "Mark Paid"}
            </StatusButton>
          )}
        </Flex>
      </Stack>
    </form>
  );
}
