import { notFound } from "next/navigation";

import { mustAuth } from "../../../../../auth";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Group } from "../../../../../components/Group";
import { Pagination } from "../../../../../components/Pagination";
import { SelectAllCheckbox } from "../../../../../components/SelectAllCheckbox";
import { TableSelectProvider } from "../../../../../components/Table/TableSelectProvider";
import { UnarchiveSelectedInvoicesButton } from "../../../../../components/UnarchiveSelectedInvoicesButton";
import { listInvoices } from "../../../../../data/invoices/listInvoices";
import { getCurrentStrataPlan } from "../../../../../data/strataPlans/getStrataPlanByDomain";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../../data/users/permissions";
import { StrataInvoicesList } from "../StrataInvoicesList";

export default async function Page({
  searchParams,
}: PageProps<"/dashboard/invoices/archived">) {
  const { page: rawPage } = await searchParams;
  const rawPageNum = typeof rawPage === "string" ? rawPage : undefined;
  const [session, strata, strataPlan] = await Promise.all([
    mustAuth(),
    mustGetCurrentStrata(),
    getCurrentStrataPlan(),
  ]);

  if (
    !strataPlan.enableInvoices ||
    !can(session.user, "stratas.invoices.view")
  ) {
    notFound();
  }

  const pageNum = parseInt(rawPageNum || "1", 10);
  const offset = (pageNum - 1) * 10;

  const { results: invoices, total } = await listInvoices(
    { strataId: strata.id, archived: true },
    { offset },
  );

  return (
    <TableSelectProvider>
      <DashboardLayout
        selectAll={<SelectAllCheckbox rowIds={invoices.map((i) => i.id)} />}
        actions={
          <Group gap="small">
            <UnarchiveSelectedInvoicesButton />
          </Group>
        }
        title="Archived Invoices"
      >
        <StrataInvoicesList
          archived
          emptyMessage="There are no archived invoices."
          invoices={invoices}
        />

        <Group p="normal" justify="end">
          <Pagination
            currentPage={pageNum}
            totalPages={Math.ceil(total / 10)}
          />
        </Group>
      </DashboardLayout>
    </TableSelectProvider>
  );
}
