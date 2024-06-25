import * as styles from "./style.css";

import format from "date-fns/format";
import { notFound } from "next/navigation";

import { Button } from "../../../../../components/Button";
import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { Header } from "../../../../../components/Header";
import { LeftIcon } from "../../../../../components/Icon/LeftIcon";
import { RightIcon } from "../../../../../components/Icon/RightIcon";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { StrataCalendar } from "./StrataCalendar";
import { deleteEventAction, upsertEventAction } from "./actions";

export const runtime = "edge";

export default async function Page({
  params,
}: {
  params: { segments: string[] };
}) {
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

  // 15 -- middle of the month so timezones never drag it to a different month
  const monthName = format(new Date(Date.UTC(year, month - 1, 15)), "LLLL");

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
        <StrataCalendar
          deleteEventAction={deleteEventAction}
          month={month}
          strata={strata}
          upsertEventAction={upsertEventAction}
          year={year}
        />
      </div>
    </>
  );
}
