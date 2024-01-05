import { auth } from "../../../../auth";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

export const GET = auth(async (req: Request) => {
  const strata = await getCurrentStrata();

  if (!strata) {
    return new Response("Not Found", { status: 404 });
  }

  const invoices = await listInvoices(strata.id);

  return new Response(JSON.stringify({ invoices }), {
    headers: {
      "content-type": "application/json",
    },
  });
});
