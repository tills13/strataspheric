import { s } from "../../../../../sprinkles.css";

import isAfter from "date-fns/isAfter";
import { notFound } from "next/navigation";

import { PageProps } from "../../../../../.next/types/app/@app/dashboard/invoices/[invoiceId]/page";
import { mustAuth } from "../../../../../auth";
import { ConfirmButton } from "../../../../../components/ConfirmButton";
import { CreateOrUpdateInvoiceForm } from "../../../../../components/CreateOrUpdateInvoiceForm";
import { Date as DateComponent } from "../../../../../components/Date";
import { Header } from "../../../../../components/Header";
import { DeleteIcon } from "../../../../../components/Icon/DeleteIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Text } from "../../../../../components/Text";
import { getInvoice } from "../../../../../data/invoices/getInvoice";
import { can } from "../../../../../data/users/permissions";
import { parseTimestamp } from "../../../../../utils/datetime";
import { deleteInvoiceAction } from "../actions";

export const runtime = "edge";

export default async function Page({ params }: PageProps) {
  const [session, invoice] = await Promise.all([
    mustAuth(),
    getInvoice((await params).invoiceId),
  ]);

  if (!can(session.user, "stratas.invoices.view")) {
    notFound();
  }

  return (
    <div className={s({ p: "normal" })}>
      {!!invoice.isPaid && (
        <InfoPanel className={s({ mb: "large" })} level="success">
          <Text>
            This invoice was marked paid{" "}
            <DateComponent
              fw="bold"
              timestamp={invoice.updatedAt}
              compactOutputPrefix
            />
            .
          </Text>
        </InfoPanel>
      )}

      {!invoice.isPaid &&
        !!invoice.dueBy &&
        isAfter(new Date(), parseTimestamp(invoice.dueBy)) && (
          <InfoPanel className={s({ mb: "large" })} level="warning">
            <Text>This invoice is overdue.</Text>
          </InfoPanel>
        )}

      <CreateOrUpdateInvoiceForm
        className={s({ mb: "large" })}
        invoice={invoice}
      />

      <InfoPanel
        action={
          <ConfirmButton
            iconRight={<DeleteIcon />}
            onClickConfirm={deleteInvoiceAction.bind(undefined, invoice.id)}
            color="error"
            style="secondary"
          >
            Delete Invoice
          </ConfirmButton>
        }
        header={<Header as="h3">Danger Zone</Header>}
        level="error"
      >
        <Text>Deleting an invoice cannot be undone.</Text>
      </InfoPanel>
    </div>
  );
}
