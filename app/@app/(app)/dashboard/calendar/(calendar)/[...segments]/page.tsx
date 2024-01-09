import * as styles from "./style.css";

import endOfMonth from "date-fns/endOfMonth";
import { getMonth } from "date-fns/esm";
import format from "date-fns/format";
import { notFound } from "next/navigation";

import { Button } from "../../../../../../../components/Button";
import { DashboardHeader } from "../../../../../../../components/DashboardHeader";
import { Header } from "../../../../../../../components/Header";
import { LeftIcon } from "../../../../../../../components/Icon/LeftIcon";
import { RightIcon } from "../../../../../../../components/Icon/RightIcon";
import { InternalLink } from "../../../../../../../components/Link/InternalLink";
import { db } from "../../../../../../../data";
import { getCurrentStrata } from "../../../../../../../data/stratas/getStrataByDomain";
import { formatDateForBetween } from "../../../../../../../utils/sql";
import { Calendar } from "./Calendar";
import { deleteEventAction, upsertEventAction } from "./actions";

export const runtime = "edge";

export default async function Page({ searchParams, params }) {
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  let rawYear: string;
  let rawMonth: string;

  if (params.segments.length === 2) {
    [rawYear, rawMonth] = params.segments;
  } else if (params.segments.length === 1) {
    [rawYear, rawMonth] = params.segments[0].split("%2F");
  } else {
    notFound();
  }

  const month = parseInt(rawMonth, 10);
  const year = parseInt(rawYear, 10);

  if (isNaN(month) || isNaN(year)) {
    notFound();
  }

  const startDate = new Date(Date.UTC(year, month - 1, 1));
  const startDateWithOffset = new Date(
    startDate.valueOf() + startDate.getTimezoneOffset() * 60 * 1000,
  );
  const endDate = endOfMonth(startDateWithOffset);

  const startDateTimestamp = Math.round(startDate.getTime() / 1000);
  const endDateTimestamp = Math.round(endDate.getTime() / 1000);

  const q = db
    .selectFrom("events")
    .selectAll("events")
    .leftJoin("meetings", "meetings.eventId", "events.id")
    .select("meetings.id as meetingId")
    .where("events.strataId", "=", strata.id)
    .where((eb) =>
      eb.or([
        // startDate is before month but endDate is during month or after month
        eb.and([
          eb("events.startDate", "<", startDateTimestamp),
          eb.or([
            eb("events.endDate", ">", endDateTimestamp),
            eb.between("events.endDate", startDateTimestamp, endDateTimestamp),
          ]),
        ]),

        // start date is during month
        eb.between("events.startDate", startDateTimestamp, endDateTimestamp),
      ]),
    )
    .orderBy("events.startDate", "asc")
    .orderBy("events.endDate", "asc");

  const events = await q.execute();
  const monthName = format(startDateWithOffset, "LLLL");

  const nextLink =
    "/dashboard/calendar/" +
    (month === 12 ? year + 1 + "/" + "1" : year + "/" + (month + 1));

  const prevLink =
    "/dashboard/calendar/" +
    (month === 1 ? year - 1 + "/" + "12" : year + "/" + (month - 1));

  return (
    <>
      <DashboardHeader />

      <div className={styles.calendarPageContainer}>
        <div className={styles.calendarPageHeader}>
          <Header priority={2}>
            {monthName}, {year}
          </Header>

          <div className={styles.headerActions}>
            <InternalLink href={prevLink}>
              <Button icon={<LeftIcon />} size="small" style="tertiary" />
            </InternalLink>
            <InternalLink href={nextLink}>
              <Button icon={<RightIcon />} size="small" style="tertiary" />
            </InternalLink>
          </div>
        </div>
        <Calendar
          upsertEvent={upsertEventAction.bind(undefined, strata.id)}
          deleteEvent={deleteEventAction}
          events={events}
          month={month}
          year={year}
        />
      </div>
    </>
  );
}
