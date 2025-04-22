import { NextResponse } from "next/server";

import { auth } from "../../../../auth";
import { getNextInvoiceId } from "../../../../data/invoices/getNextInvoiceId";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

export const GET = auth(async (session, req) => {
  const strata = await mustGetCurrentStrata();
  const { count } = await getNextInvoiceId(strata.id);

  return NextResponse.json({ nextId: count + 1 });
});
