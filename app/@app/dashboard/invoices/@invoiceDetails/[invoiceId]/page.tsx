import { s } from "../../../../../../sprinkles.css";

import isAfter from "date-fns/isAfter";
import { notFound } from "next/navigation";

import { CreateOrUpdateInvoiceForm } from "../../../../../../components/CreateOrUpdateInvoiceForm";
import { Date as DateOutput } from "../../../../../../components/Date";
import { InfoPanel } from "../../../../../../components/InfoPanel";
import { Text } from "../../../../../../components/Text";
import { getInvoice } from "../../../../../../data/invoices/getInvoice";
import { mustGetCurrentStrata } from "../../../../../../data/stratas/getStrataByDomain";
import { parseTimestamp } from "../../../../../../utils/datetime";
import { upsertInvoiceAction } from "../../actions";

export const runtime = "edge";

export default async function Page({
  params,
}: {
  params: { invoiceId: string };
}) {
  console.log(params);
  const strata = await mustGetCurrentStrata();
  const invoice = await getInvoice(strata.id, params.invoiceId);

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
        invoice={invoice}
        upsertInvoice={upsertInvoiceAction.bind(undefined, invoice.id)}
      />
    </>
  );
}
