import * as styles from "./style.css";

import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import isSameMonth from "date-fns/isSameMonth";
import startOfMonth from "date-fns/startOfMonth";
import React from "react";

import { CalendarEvent } from ".";
import { classnames } from "../../utils/classnames";
import { dateFromDayAndWeekIdx, parseTimestamp } from "../../utils/datetime";
import { CalendarDay } from "./CalendarDay";
import { CalendarDayEvents } from "./CalendarDayEvents";
import { CalendarEventTrack } from "./CalendarEventTrack";

type CalendarDayEventsProps = React.ComponentProps<typeof CalendarDayEvents>;
type OutOfContextFn = (date: Date, context: Date) => boolean;

const IS_OUT_OF_CONTEXT_MONTH: OutOfContextFn = (date, context) =>
  !isSameMonth(date, context);

interface Props {
  className?: string;
  createOrUpdateEventModalTitle?: CalendarDayEventsProps["createOrUpdateEventModalTitle"];
  createOrUpdateEventFormSubmitLabel?: CalendarDayEventsProps["createOrUpdateEventFormSubmitLabel"];
  currentMonth: number;
  currentYear: number;
  dayIsOutOfContext?: OutOfContextFn;
  deleteEvent?: (eventId: string) => any;
  events: CalendarEvent[];
  onSelectDate?: (date: Date) => void;
  upsertEvent?: (eventId: string | undefined, fd: FormData) => any;
  weekOfMonth: number;
}

export function CalendarWeek({
  className,
  createOrUpdateEventModalTitle,
  createOrUpdateEventFormSubmitLabel,
  currentMonth,
  currentYear,
  dayIsOutOfContext = IS_OUT_OF_CONTEXT_MONTH,
  deleteEvent,
  events,
  upsertEvent,
  onSelectDate,
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
              isOutOfContext={dayIsOutOfContext(date, day0)}
              upsertEvent={upsertEvent}
            />
          );
        })}
      </div>
      <CalendarEventTrack>
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
              createOrUpdateEventModalTitle={createOrUpdateEventModalTitle}
              createOrUpdateEventFormSubmitLabel={
                createOrUpdateEventFormSubmitLabel
              }
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
              onClick={onSelectDate ? () => onSelectDate(date) : undefined}
              upsertEvent={upsertEvent}
            />
          );
        })}
      </CalendarEventTrack>
    </div>
  );
}
