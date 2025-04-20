import { NextResponse } from "next/server";

import { auth } from "../../../../auth";
import {
  ActivityType,
  listStrataActivity,
} from "../../../../data/meetings/listStrataActivity";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

export const GET = auth(async (_, req) => {
  const strata = await getCurrentStrata();

  if (!strata) {
    return new Response("Not Found", { status: 404 });
  }

  const searchParams = new URL(req.url).searchParams;
  const activityType = searchParams.get("activityType") as ActivityType;

  const activity = await listStrataActivity({
    strataId: strata.id,
    ...(activityType && { activityType }),
  });

  return NextResponse.json({ activity });
});
