import { auth } from "../../../../auth";
import { getStrataEventsForRange } from "../../../../data/events/getEventsForRange";
import { getCurrentStrata } from "../../../../data/stratas/getStrataByDomain";

export const runtime = "edge";

export const GET = auth(async (req: Request) => {
  const s = await getCurrentStrata();

  if (!s) {
    return new Response("Not Found", { status: 404 });
  }

  const u = new URL(req.url);

  const startDate = new Date(u.searchParams.get("startDate") as string);
  const endDate = new Date(u.searchParams.get("endDate") as string);

  // const startDate = new Date(Date.UTC(year, month - 1, 1));
  // const startDateWithOffset = new Date(
  //   startDate.valueOf() + startDate.getTimezoneOffset() * 60 * 1000,
  // );
  // const endDate = endOfMonth(startDateWithOffset);

  const startDateTimestamp = Math.round(startDate.getTime() / 1000);
  const endDateTimestamp = Math.round(endDate.getTime() / 1000);

  const events = await getStrataEventsForRange(
    s.id,
    startDateTimestamp,
    endDateTimestamp,
  );

  return new Response(JSON.stringify({ events }), {
    headers: {
      "content-type": "application/json",
    },
  });
});
