import { NextResponse } from "next/server";

import { auth } from "../../../../auth";
import { listFiles } from "../../../../data/files/listFiles";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../data/users/permissions";

export const runtime = "edge";

export const GET = auth(async (session, req) => {
  console.log(session);
  const strata = await getCurrentStrata();

  if (!strata) {
    return new Response("Not Found", { status: 404 });
  }

  const canSeePrivateFiles = can(session.user, "stratas.files.create");

  const queryParams = new URL(req.url).searchParams;
  const fileTypes = queryParams.has("fileTyle")
    ? queryParams.getAll("fileType")
    : undefined;

  const files = await listFiles({
    strataId: strata.id,
    userId: session.user.id,
    fileTypes,
    isPublic: !canSeePrivateFiles,
  });

  return NextResponse.json({ files });
});
