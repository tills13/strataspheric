import { NextResponse } from "next/server";

import { auth } from "../../../../auth";
import { listAmenityBookings } from "../../../../data/amenities/listAmenityBookings";
import { can } from "../../../../data/users/permissions";
import { formatTimestampForSql } from "../../../../utils/datetime";
import { intParam } from "../../../../utils/url";

export const runtime = "edge";

export const GET = auth(async (session, req) => {
  const amenityId = req.nextUrl.searchParams.get("amenityId");
  const startTs = intParam(req.nextUrl.searchParams, "startTs");
  const endTs = intParam(req.nextUrl.searchParams, "endTs");

  if (!amenityId) {
    return new Response("Bad Request", { status: 400 });
  }

  const amenityBookings = await listAmenityBookings({
    amenityId,
    startTs: formatTimestampForSql(startTs),
    endTs: formatTimestampForSql(endTs),

    ...(!can(session.user, "stratas.amenity_bookings.edit") && {
      decision: "approved",
    }),
  });

  return NextResponse.json({ amenityBookings });
});
