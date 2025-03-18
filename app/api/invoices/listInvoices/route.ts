import { auth } from "../../../../auth";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";

export const runtime = "edge";

export const GET = auth(async () => {
  const [session, strata] = await Promise.all([auth(), getCurrentStrata()]);

  if (!strata) {
    return new Response("Not Found", { status: 404 });
  }

  const canSeeAllInvoices = can(
    session?.user,
    p("stratas", "invoices", "create"),
  );

  const invoices = await listInvoices(
    strata.id,
    canSeeAllInvoices ? undefined : session?.user.id,
  );

  return new Response(JSON.stringify({ invoices }), {
    headers: {
      "content-type": "application/json",
    },
  });
});
