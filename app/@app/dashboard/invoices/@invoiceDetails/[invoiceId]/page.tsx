import { s } from "../../../../../../sprinkles.css";

import isAfter from "date-fns/isAfter";
import { notFound } from "next/navigation";

import { PageProps } from "../../../../../../.next/types/app/@app/dashboard/invoices/@invoiceDetails/[invoiceId]/page";
import { ConfirmButton } from "../../../../../../components/ConfirmButton";
import { CreateOrUpdateInvoiceForm } from "../../../../../../components/CreateOrUpdateInvoiceForm";
import { Date as DateOutput } from "../../../../../../components/Date";
import { Header } from "../../../../../../components/Header";
import { DeleteIcon } from "../../../../../../components/Icon/DeleteIcon";
import { InfoPanel } from "../../../../../../components/InfoPanel";
import { Text } from "../../../../../../components/Text";
import { getInvoice } from "../../../../../../data/invoices/getInvoice";
import { mustGetCurrentStrata } from "../../../../../../data/stratas/getStrataByDomain";
import { parseTimestamp } from "../../../../../../utils/datetime";
import { deleteInvoiceAction, upsertInvoiceAction } from "../../actions";

export const runtime = "edge";

export default async function Page({ params }: PageProps) {
  const strata = await mustGetCurrentStrata();
  const invoice = await getInvoice(strata.id, (await params).invoiceId);

  if (!invoice) {
    notFound();
  }

  return (
    <>
      {!!invoice.isPaid && (
        <InfoPanel className={s({ mb: "large" })} level="success">
          <Text>
            This invoice was marked paid on{" "}
            <DateOutput timestamp={invoice.updatedAt} />
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
        upsertInvoice={upsertInvoiceAction.bind(undefined, invoice.id)}
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
    </>
  );
}
