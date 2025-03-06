"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useTransition } from "react";

import { Invoice } from "../../data";
import { patchTimezoneOffset } from "../../utils/datetime";
import { DateInput } from "../DateInput";
import { Group } from "../Group";
import { Header } from "../Header";
import { AddIcon } from "../Icon/AddIcon";
import { Input } from "../Input";
import { StatusButton } from "../StatusButton";
import { TextArea } from "../TextArea";

interface Props {
  defaultDate?: string;
  deleteInvoice?: () => void;
  invoice?: Invoice;
  upsertInvoice: (fd: FormData) => Promise<Invoice>;
  onCreateOrUpdateInvoice: (invoice: Invoice) => void;
}

export function CreateOrUpdateInvoiceForm({
  upsertInvoice,
  deleteInvoice,
  invoice,
  onCreateOrUpdateInvoice,
}: Props) {
  const [deletePending, startTransition] = useTransition();

  return (
    <form
      className={styles.newEventForm}
      action={async (fd) => {
        patchTimezoneOffset(fd, "dueBy");

        const invoice = await upsertInvoice(fd);
        onCreateOrUpdateInvoice(invoice);
      }}
    >
      <Group gap="normal">
        <Input
          name="identifier"
          label="Invoice ID"
          defaultValue={invoice?.identifier}
          required
        />
        <Input
          className={s({ w: "full" })}
          name="amount"
          label="Amount $"
          min="0"
          pattern="\d+(\.\d\d?)?"
          defaultValue={invoice?.amount}
          required
        />
      </Group>

      <TextArea
        name="description"
        label="Description"
        defaultValue={invoice?.description || ""}
      />

      <Header priority={3}>Due By</Header>
      <DateInput className={s({ w: "full" })} name="dueBy" type="single" />

      <Group gap="normal">
        <StatusButton
          color="primary"
          iconRight={<AddIcon />}
          style="secondary"
          type="submit"
        >
          {invoice ? "Update Invoice" : "Create Invoice"}
        </StatusButton>

        {invoice && deleteInvoice && (
          <StatusButton
            onClick={() => {
              startTransition(() => {
                deleteInvoice();
              });
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
    </form>
  );
}
