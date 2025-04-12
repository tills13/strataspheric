import { auth } from "../../../../auth";
import { getStrataEventsForRange } from "../../../../data/events/getEventsForRange";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { formatTimestampForSql } from "../../../../utils/datetime";
import { intParam } from "../../../../utils/url";

export const runtime = "edge";

export const GET = auth(async (_, req) => {
  const strata = await mustGetCurrentStrata();
  const u = new URL(req.url);

  const events = await getStrataEventsForRange(
    strata.id,
    formatTimestampForSql(intParam(u.searchParams, "startDate")),
    formatTimestampForSql(intParam(u.searchParams, "endDate")),
  );

  return new Response(JSON.stringify({ events }), {
    headers: {
      "content-type": "application/json",
    },
  });
});
