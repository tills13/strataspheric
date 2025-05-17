import { auth, mustAuth } from "../../../../auth";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";

export const runtime = "edge";

export const GET = auth(async () => {
  const [session, strata] = await Promise.all([mustAuth(), getCurrentStrata()]);

  if (!strata) {
    return new Response("Not Found", { status: 404 });
  }

  const canSeeAllInvoices = can(session.user, "stratas.invoices.create");

  const { results: invoices, total } = await listInvoices({
    strataId: strata.id,
    ...(!canSeeAllInvoices && { payeeId: session.user.id }),
  });

  return new Response(JSON.stringify({ invoices, total }), {
    headers: {
      "content-type": "application/json",
    },
  });
});
