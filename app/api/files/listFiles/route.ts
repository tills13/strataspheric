import { auth } from "../../../../auth";
import { listFiles } from "../../../../data/files/listFiles";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can, p } from "../../../../data/users/permissions";

export const runtime = "edge";

export const GET = auth(async (session, req) => {
  const strata = await getCurrentStrata();

  if (!strata) {
    return new Response("Not Found", { status: 404 });
  }

  const canSeePrivateFiles = can(session.user, p("stratas", "files", "create"));

  const queryParams = new URL(req.url).searchParams;
  const fileTypes = queryParams.getAll("fileType");

  const files = await listFiles(strata.id, {
    userId: session.user.id,
    fileTypes,
    isPublic: !canSeePrivateFiles,
  });

  return new Response(JSON.stringify({ files }), {
    headers: {
      "content-type": "application/json",
    },
  });
});
