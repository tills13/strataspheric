import { auth } from "../../../../auth";
import { listFiles } from "../../../../data/files/listFiles";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";

export const runtime = "edge";

export const GET = auth(async (req: Request) => {
  const [session, strata] = await Promise.all([auth(), getCurrentStrata()]);

  if (!strata) {
    return new Response("Not Found", { status: 404 });
  }

  const canSeePrivateFiles = can(
    session?.user,
    p("stratas", "files", "create"),
  );

  const files = await listFiles(
    strata.id,
    session?.user.id,
    canSeePrivateFiles,
  );

  return new Response(JSON.stringify({ files }), {
    headers: {
      "content-type": "application/json",
    },
  });
});
