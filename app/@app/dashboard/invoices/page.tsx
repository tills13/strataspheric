import { notFound } from "next/navigation";

import { PageProps } from "../../../../.next/types/app/@app/dashboard/invoices/page";
import { mustAuth } from "../../../../auth";
import { Group } from "../../../../components/Group";
import { Pagination } from "../../../../components/Pagination";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";
import { StrataInvoicesList } from "./StrataInvoicesList";

export const runtime = "edge";

export default async function Page({ searchParams }: PageProps) {
  const [session, strata] = await Promise.all([
    mustAuth(),
    mustGetCurrentStrata(),
  ]);

  if (!can(session.user, "stratas.invoices.view")) {
    notFound();
  }

  const { page: rawPageNum } = await searchParams;
  const pageNum = parseInt(rawPageNum || "1", 10);
  const offset = (pageNum - 1) * 10;

  const { results: invoices, total } = await listInvoices(
    { strataId: strata.id },
    { offset },
  );

  return (
    <>
      <StrataInvoicesList invoices={invoices} strata={strata} />

      <Group p="normal" justify="end">
        <Pagination currentPage={pageNum} totalPages={Math.ceil(total / 10)} />
      </Group>
    </>
  );
}
