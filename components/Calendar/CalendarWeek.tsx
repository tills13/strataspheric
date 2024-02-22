import * as styles from "./style.css";

import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import startOfMonth from "date-fns/startOfMonth";

import { Event } from "../../data";
import { classnames } from "../../utils/classnames";
import { dateFromDayAndWeekIdx, parseTimestamp } from "../../utils/datetime";
import { CalendarDay } from "./CalendarDay";
import { CalendarDayEvents } from "./CalendarDayEvents";

interface Props {
  className?: string;
  currentMonth: number;
  currentYear: number;
  deleteEvent: (eventId: string) => any;
  events: Array<Event & { meetingId?: string }>;
  upsertEvent: (eventId: string | undefined, fd: FormData) => any;
  currentWeek: number;
}

export function CalendarWeek({
  className,
  deleteEvent,
  events,
  currentMonth,
  currentWeek,
  currentYear,
  upsertEvent,
}: Props) {
  const day0 = startOfMonth(
    new Date(Date.UTC(currentYear, currentMonth - 1, 15)),
  );
  const firstDayOfMonth = day0.getDay();

  return (
    <div className={classnames(className, styles.calendarRow)}>
      <div className={styles.calendarWeek}>
        {Array.from(new Array(7)).map((_, currentDayOfWeek) => {
          const date = dateFromDayAndWeekIdx(
            day0,
            currentWeek,
            currentDayOfWeek,
            firstDayOfMonth,
          );

          return (
            <CalendarDay
              key={currentDayOfWeek}
              date={date}
              events={events}
              isOutOfContext={
                date.getFullYear() !== currentYear ||
                date.getMonth() !== currentMonth - 1
              }
              upsertEvent={upsertEvent}
            />
          );
        })}
      </div>
      <div className={styles.calendarEventTrack}>
        {Array.from(new Array(7)).map((_, currentDayOfWeek) => {
          const date = dateFromDayAndWeekIdx(
            day0,
            currentWeek,
            currentDayOfWeek,
            firstDayOfMonth,
          );

          return (
            <CalendarDayEvents
              key={currentDayOfWeek}
              date={date}
              deleteEvent={deleteEvent}
              events={events
                .filter(
                  (e) =>
                    isSameDay(date, parseTimestamp(e.startDate)) ||
                    (isAfter(date, parseTimestamp(e.startDate)) &&
                      (isBefore(date, parseTimestamp(e.endDate)) ||
                        isSameDay(date, parseTimestamp(e.endDate)))),
                )
                .sort((a, b) => (a.startDate > b.startDate ? 0 : 1))}
              upsertEvent={upsertEvent}
            />
          );
        })}
      </div>
    </div>
  );
}
