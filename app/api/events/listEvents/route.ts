import { NextResponse } from "next/server";

import { auth } from "../../../../auth";
import { getEventsForRange } from "../../../../data/events/getEventsForRange";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { formatTimestampForSql } from "../../../../utils/datetime";
import { intParam } from "../../../../utils/url";

export const runtime = "edge";

export const GET = auth(async (_, req) => {
  const strata = await mustGetCurrentStrata();
  const u = new URL(req.url);

  const events = await getEventsForRange(
    formatTimestampForSql(intParam(u.searchParams, "startDate")),
    formatTimestampForSql(intParam(u.searchParams, "endDate")),
    { strataId: strata.id },
  );

  return NextResponse.json({ events });
});
