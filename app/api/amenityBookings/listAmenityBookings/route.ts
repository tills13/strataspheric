import parse from "date-fns/parse";
import { NextResponse } from "next/server";

import { auth } from "../../../../auth";
import { listAmenityBookings } from "../../../../data/amenities/listAmenityBookings";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import {
  formatTimestampForSql,
  parseTimestamp,
} from "../../../../utils/datetime";
import { intParam } from "../../../../utils/url";

export const runtime = "edge";

export const GET = auth(async (_, req) => {
  const strata = await mustGetCurrentStrata();

  const amenityId = req.nextUrl.searchParams.get("amenityId");
  const startTs = intParam(req.nextUrl.searchParams, "startTs");
  const endTs = intParam(req.nextUrl.searchParams, "endTs");

  console.log({
    amenityId,
    startTs: formatTimestampForSql(startTs),
    endTs: formatTimestampForSql(endTs),
  });

  const amenityBookings = await listAmenityBookings(amenityId, {
    startTs: formatTimestampForSql(startTs),
    endTs: formatTimestampForSql(endTs),
  });

  return NextResponse.json({ amenityBookings });
});
