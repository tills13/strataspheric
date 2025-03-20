import { auth } from "../../../../auth";
import { getStrataEventsForRange } from "../../../../data/events/getEventsForRange";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { formatTimestampForSql } from "../../../../utils/datetime";

export const runtime = "edge";

function intParam(sp: URLSearchParams, paramName: string): number {
  const value: unknown = sp.get(paramName);

  if (typeof value !== "string") {
    throw new Error(`invalid integer param ${paramName}, got ${value}`);
  }

  const intValue = parseInt(value, 10);

  if (isNaN(intValue)) {
    throw new Error(`invalid integer param ${paramName}, got ${value}`);
  }

  return intValue;
}

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
