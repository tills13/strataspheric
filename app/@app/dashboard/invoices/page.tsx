import { notFound } from "next/navigation";

import { mustAuth } from "../../../../auth";
import { BulkInvoiceActions } from "../../../../components/BulkInvoiceActions";
import { DashboardLayout } from "../../../../components/DashboardLayout";
import { Group } from "../../../../components/Group";
import { Pagination } from "../../../../components/Pagination";
import { SelectAllCheckbox } from "../../../../components/SelectAllCheckbox";
import { TableSelectProvider } from "../../../../components/Table/TableSelectProvider";
import { Upsell } from "../../../../components/Upsell";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { getCurrentStrataPlan } from "../../../../data/strataPlans/getStrataPlanByDomain";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { PAGE_SIZE, parsePagination } from "../../../../utils/pagination";
import { CreateNewInvoiceButton } from "./CreateNewInvoiceButton";
import { StrataInvoicesList } from "./StrataInvoicesList";

const INVOICES_UPSELL =
  "Create, send, and track invoices with integrated Stripe payments. Residents pay online and you get notified instantly.";

export default async function Page({
  searchParams,
}: PageProps<"/dashboard/invoices">) {
  const [session, strata, strataPlan] = await Promise.all([
    mustAuth(),
    mustGetCurrentStrata(),
    getCurrentStrataPlan(),
  ]);

  if (!strataPlan.enableInvoices) {
    return (
      <DashboardLayout title="Invoices">
        <Upsell
          p="normal"
          upsellDescription={INVOICES_UPSELL}
          upsellFeature="Invoices"
          verb="are"
        />
      </DashboardLayout>
    );
  }

  if (!can(session.user, "stratas.invoices.view")) {
    notFound();
  }

  const { pageNum, offset } = parsePagination(await searchParams);

  const { results: invoices, total } = await listInvoices(
    { strataId: strata.id, archived: false },
    { offset },
  );

  return (
    <TableSelectProvider>
      <DashboardLayout
        selectAll={<SelectAllCheckbox rowIds={invoices.map((i) => i.id)} />}
        title="Invoices"
        actions={
          <Group gap="small">
            <BulkInvoiceActions />
            {can(session.user, "stratas.invoices.create") && (
              <CreateNewInvoiceButton />
            )}
          </Group>
        }
      >
        <StrataInvoicesList invoices={invoices} />

        <Group p="normal" justify="end">
          <Pagination
            currentPage={pageNum}
            totalPages={Math.ceil(total / PAGE_SIZE)}
          />
        </Group>
      </DashboardLayout>
    </TableSelectProvider>
  );
}
