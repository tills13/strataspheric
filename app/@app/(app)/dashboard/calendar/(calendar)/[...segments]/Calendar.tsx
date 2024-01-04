"use client";

import { vars } from "../../../../../../theme.css";
import * as styles from "./style.css";

import { calc } from "@vanilla-extract/css-utils";
import differenceInDays from "date-fns/differenceInDays";
import { getWeek } from "date-fns/esm";
import getDaysInMonth from "date-fns/getDaysInMonth";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import sub from "date-fns/sub";
import { useEffect, useState } from "react";

import { CreateOrUpdateEventForm } from "../../../../../../../components/CreateOrUpdateEventForm";
import { Modal } from "../../../../../../../components/Modal";
import { Event } from "../../../../../../../data";
import { classnames } from "../../../../../../../utils/classnames";
import { formatDateForDatetime } from "../../../../../../../utils/datetime";
import { CalendarDay } from "./CalendarDay";

interface Props {
  upsertEvent: (eventId: string | undefined, fd: FormData) => void;
  deleteEvent: (eventId: string) => void;
  events: Event[];
  month: number;
  year: number;
}

function dateFromDayAndWeekIdx(
  weekIdx: number,
  dayIdx: number,
  firstDayInMonth: number,
) {
  return weekIdx * 7 - firstDayInMonth + dayIdx + 1;
}

export function Calendar({
  upsertEvent,
  deleteEvent,
  events,
  month,
  year,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [showToday, setShowToday] = useState(false);

  const currentDate = new Date(year, month - 1, 1);

  const numDaysPrevMonth = getDaysInMonth(sub(currentDate, { months: 1 }));
  const numDaysMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = currentDate.getDay();

  useEffect(() => setShowToday(true), []);

  return (
    <>
      <div className={styles.calendar}>
        {Array.from(new Array(6)).map((_, weekIdx) => {
          return (
            <div key={weekIdx} className={styles.calendarRow}>
              <div className={styles.calendarWeek}>
                {Array.from(new Array(7)).map((_, dayIdx) => {
                  let isOutOfContext = false;
                  let displayDate = dateFromDayAndWeekIdx(
                    weekIdx,
                    dayIdx,
                    firstDayOfMonth,
                  );

                  if (displayDate <= 0) {
                    isOutOfContext = true;
                    displayDate = numDaysPrevMonth + displayDate;
                  } else if (displayDate > numDaysMonth) {
                    isOutOfContext = true;
                    displayDate = displayDate % numDaysMonth;
                  }

                  const date = new Date(
                    currentDate.getMonth() +
                      1 +
                      "/" +
                      displayDate +
                      "/" +
                      currentDate.getFullYear(),
                  );

                  return (
                    <CalendarDay
                      key={dayIdx}
                      date={date}
                      isOutOfContext={isOutOfContext}
                      onClickDate={setSelectedDate}
                    />
                  );
                })}
              </div>
              <div className={styles.calendarEventTrack}>
                {Array.from(new Array(7)).map((_, dayIdx) => {
                  const displayDate = dateFromDayAndWeekIdx(
                    weekIdx,
                    dayIdx,
                    firstDayOfMonth,
                  );

                  const date = new Date(
                    currentDate.getMonth() +
                      1 +
                      "/" +
                      displayDate +
                      "/" +
                      currentDate.getFullYear(),
                  );

                  const eventsOnDay = events
                    .filter(
                      (e) =>
                        isSameDay(date, new Date(e.startDate)) ||
                        (isAfter(date, new Date(e.startDate)) &&
                          (isBefore(date, new Date(e.endDate)) ||
                            isSameDay(date, new Date(e.endDate)))),
                    )
                    .sort((a, b) => (a.startDate > b.startDate ? 0 : 1));

                  return (
                    <div key={dayIdx} className={styles.calendarEventTrackDay}>
                      {eventsOnDay.map((event, idx) => {
                        const startDate = new Date(event.startDate);
                        const endDate = new Date(event.endDate);

                        const lengthInDays =
                          differenceInDays(endDate, startDate) + 1;

                        const eventWrapsToFollowingWeek =
                          startDate.getDay() + lengthInDays > 7;
                        const eventWrapsFromPrevWeek =
                          getWeek(endDate) > getWeek(startDate);

                        if (
                          !(
                            (dayIdx === 0 && eventWrapsFromPrevWeek) ||
                            isSameDay(startDate, date)
                          )
                        ) {
                          return null;
                        }

                        const width = calc(lengthInDays)
                          .divide(7)
                          .multiply("100vw")
                          .subtract(calc(2).multiply(vars.spacing.small))
                          .toString();
                        console.log(event);

                        return (
                          <div
                            key={idx}
                            className={classnames(styles.calendarEvent, {
                              [styles.startsOnDay]: isSameDay(date, startDate),
                              [styles.endsOnDay]: isSameDay(date, endDate),
                            })}
                            style={{
                              top: calc(vars.sizes.small)
                                .multiply(idx)
                                .toString(),
                              width,
                              maxWidth: calc("100vw")
                                .subtract((startDate.getDay() / 7) * 100 + "vw")
                                .toString(),
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              setSelectedEvent(event);
                            }}
                          >
                            {event.name}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {selectedDate && (
        <Modal closeModal={() => setSelectedDate(undefined)} title="New Event">
          <CreateOrUpdateEventForm
            defaultDate={formatDateForDatetime(selectedDate)}
            upsertEvent={upsertEvent.bind(undefined, undefined)}
          />
        </Modal>
      )}

      {selectedEvent && (
        <Modal
          closeModal={() => setSelectedEvent(undefined)}
          title="Edit Event"
        >
          <CreateOrUpdateEventForm
            upsertEvent={upsertEvent.bind(undefined, selectedEvent.id)}
            deleteEvent={deleteEvent.bind(undefined, selectedEvent.id)}
            event={selectedEvent}
          />
        </Modal>
      )}
    </>
  );
}
