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

export const IS_OUT_OF_CONTEXT_MONTH = (
  currentMonth: number,
  currentYear: number,
  date: Date,
) => date.getFullYear() !== currentYear || date.getMonth() !== currentMonth - 1;

interface Props {
  className?: string;
  currentMonth: number;
  currentYear: number;
  dayIsOutOfContext?: (
    currentMonth: number,
    currentYear: number,
    date: Date,
  ) => boolean;
  deleteEvent: (eventId: string) => any;
  events: Array<Event & { meetingId?: string }>;
  upsertEvent: (eventId: string | undefined, fd: FormData) => any;
  weekOfMonth: number;
}

export function CalendarWeek({
  className,
  events,
  dayIsOutOfContext = IS_OUT_OF_CONTEXT_MONTH,
  deleteEvent,
  currentMonth,
  currentYear,
  upsertEvent,
  weekOfMonth,
}: Props) {
  const day0 = startOfMonth(
    new Date(Date.UTC(currentYear, currentMonth - 1, 15)),
  );
  const firstDayOfMonth = day0.getDay();

  return (
    <div className={classnames(className, styles.calendarRow)}>
      <div className={styles.calendarWeek}>
        {Array.from(new Array(7)).map((_, dayOfWeek) => {
          const date = dateFromDayAndWeekIdx(
            day0,
            weekOfMonth,
            dayOfWeek,
            firstDayOfMonth,
          );

          return (
            <CalendarDay
              key={dayOfWeek}
              date={date}
              events={events}
              isOutOfContext={dayIsOutOfContext(
                currentMonth,
                currentYear,
                date,
              )}
              upsertEvent={upsertEvent}
            />
          );
        })}
      </div>
      <div className={styles.calendarEventTrack}>
        {Array.from(new Array(7)).map((_, currentDayOfWeek) => {
          const date = dateFromDayAndWeekIdx(
            day0,
            weekOfMonth,
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
