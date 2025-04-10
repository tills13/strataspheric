import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import format from "date-fns/format";
import { notFound } from "next/navigation";

import { PageProps } from "../../../../../.next/types/app/@app/dashboard/calendar/[...segments]/page";
import { Button } from "../../../../../components/Button";
import { DashboardHeader } from "../../../../../components/DashboardHeader";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { LeftIcon } from "../../../../../components/Icon/LeftIcon";
import { RightIcon } from "../../../../../components/Icon/RightIcon";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { getCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { StrataCalendar } from "./StrataCalendar";
import { deleteEventAction, upsertEventAction } from "./actions";

export const runtime = "edge";

export default async function Page({ params }: PageProps) {
  const { segments } = await params;
  const strata = await getCurrentStrata();

  if (!strata) {
    notFound();
  }

  let rawYear: string;
  let rawMonth: string;

  if (segments.length === 2) {
    [rawYear, rawMonth] = segments;
  } else if (segments.length === 1) {
    [rawYear, rawMonth] = segments[0].split("%2F");
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
        <Group className={s({ p: "normal" })} justify="space-between">
          <Header priority={2}>
            {monthName}, {year}
          </Header>

          <Group>
            <InternalLink href={prevLink}>
              <Button
                icon={<LeftIcon />}
                color="primary"
                size="small"
                style="tertiary"
              />
            </InternalLink>
            <InternalLink href={nextLink}>
              <Button
                icon={<RightIcon />}
                color="primary"
                size="small"
                style="tertiary"
              />
            </InternalLink>
          </Group>
        </Group>
        <div className={styles.strataCalendarContainer}>
          <StrataCalendar
            deleteEventAction={deleteEventAction}
            month={month}
            strata={strata}
            upsertEventAction={upsertEventAction}
            year={year}
          />
        </div>
      </div>
    </>
  );
}
