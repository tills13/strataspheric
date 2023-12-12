import * as buttonStyles from "../../../../../../../components/Button/style.css";
import * as iconButtonStyles from "../../../../../../../components/IconButton/style.css";
import * as styles from "./style.css";

import endOfMonth from "date-fns/endOfMonth";
import format from "date-fns/format";
import { notFound } from "next/navigation";

import { DashboardHeader } from "../../../../../../../components/DashboardHeader";
import { Header } from "../../../../../../../components/Header";
import { LeftIcon } from "../../../../../../../components/Icon/LeftIcon";
import { RightIcon } from "../../../../../../../components/Icon/RightIcon";
import { IconButton } from "../../../../../../../components/IconButton";
import { InternalLink } from "../../../../../../../components/Link/InternalLink";
import { db } from "../../../../../../../data";
import { getCurrentStrata } from "../../../../../../../data/stratas/getStrataByDomain";
import { classnames } from "../../../../../../../utils/classnames";
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

  const startDate = new Date(year, month - 1, 1);
  const endDate = endOfMonth(startDate);

  const q = db
    .selectFrom("events")
    .selectAll()
    .where("strataId", "=", strata.id)
    .where((eb) =>
      eb.or([
        // startDate is before month but endDate is during month or after month
        eb.and([
          eb("events.startDate", "<", formatDateForBetween(startDate)),
          eb.or([
            eb("events.endDate", ">", formatDateForBetween(endDate)),
            eb.between(
              "events.endDate",
              formatDateForBetween(startDate),
              formatDateForBetween(endDate),
            ),
          ]),
        ]),

        // start date is during month
        eb.between(
          "events.startDate",
          formatDateForBetween(startDate),
          formatDateForBetween(endDate),
        ),
      ]),
    )
    .orderBy("events.startDate", "asc")
    .orderBy("events.endDate", "asc");

  const events = await q.execute();

  const monthName = format(startDate, "LLLL");

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
              <IconButton
                className={classnames(
                  iconButtonStyles.iconButton,
                  iconButtonStyles.iconButtonSizes.small,
                  buttonStyles.buttonVariants.tertiary,
                )}
              >
                <LeftIcon />
              </IconButton>
            </InternalLink>
            <InternalLink href={nextLink}>
              <IconButton
                className={classnames(
                  iconButtonStyles.iconButton,
                  iconButtonStyles.iconButtonSizes.small,
                  buttonStyles.buttonVariants.tertiary,
                )}
              >
                <RightIcon />
              </IconButton>
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
