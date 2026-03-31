import { notFound } from "next/navigation";

import { mustAuth } from "../../../../../auth";
import { BulkActionButton } from "../../../../../components/BulkActionButton";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Group } from "../../../../../components/Group";
import { UnarchiveIcon } from "../../../../../components/Icon/UnarchiveIcon";
import { Pagination } from "../../../../../components/Pagination";
import { SelectAllCheckbox } from "../../../../../components/SelectAllCheckbox";
import { TableSelectProvider } from "../../../../../components/Table/TableSelectProvider";
import { listInvoices } from "../../../../../data/invoices/listInvoices";
import { getCurrentStrataPlan } from "../../../../../data/strataPlans/getStrataPlanByDomain";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../../data/users/permissions";
import { PAGE_SIZE, parsePagination } from "../../../../../utils/pagination";
import { StrataInvoicesList } from "../StrataInvoicesList";
import { unarchiveInvoicesAction } from "../actions";

export default async function Page({
  searchParams,
}: PageProps<"/dashboard/invoices/archived">) {
  const { pageNum, offset } = parsePagination(await searchParams);
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
            <BulkActionButton
              action={unarchiveInvoicesAction}
              noun="invoice"
              icon={<UnarchiveIcon />}
              titleTemplate="Unarchive {label}"
            />
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
            totalPages={Math.ceil(total / PAGE_SIZE)}
          />
        </Group>
      </DashboardLayout>
    </TableSelectProvider>
  );
}
