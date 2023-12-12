"use client";

import * as styles from "./style.css";

import getDaysInMonth from "date-fns/getDaysInMonth";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import sub from "date-fns/sub";
import { useEffect, useState } from "react";

import {
  CreateOrUpdateEventForm,
  formatDefaultDate,
} from "../../../../../../../components/CreateOrUpdateEventForm";
import { Modal } from "../../../../../../../components/Modal";
import { Event } from "../../../../../../../data";
import { classnames } from "../../../../../../../utils/classnames";

interface Props {
  upsertEvent: (eventId: string | undefined, fd: FormData) => void;
  deleteEvent: (eventId: string) => void;
  events: Event[];
  month: number;
  year: number;
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
        {Array.from(new Array(7 * 6)).map((_, idx) => {
          let displayDate: number;
          let isOutOfContext = false;

          if (idx < firstDayOfMonth) {
            isOutOfContext = true;
            displayDate = numDaysPrevMonth - (firstDayOfMonth - idx) + 1;
          } else if (idx - firstDayOfMonth + 1 > numDaysMonth) {
            isOutOfContext = true;
            displayDate = idx - firstDayOfMonth - numDaysMonth + 1;
          } else {
            displayDate = idx - firstDayOfMonth + 1;
          }

          const date = new Date(
            currentDate.getMonth() +
              1 +
              "/" +
              displayDate +
              "/" +
              currentDate.getFullYear(),
          );
          const isToday = isSameDay(new Date(), date);
          const eventsOnDate = events.filter(
            (e) =>
              isSameDay(date, new Date(e.startDate)) ||
              (isAfter(date, new Date(e.startDate)) &&
                (isBefore(date, new Date(e.endDate)) ||
                  isSameDay(date, new Date(e.endDate)))),
          );

          return (
            <div
              key={idx}
              className={
                isOutOfContext
                  ? styles.calendarDayOutOfScope
                  : showToday && isToday
                    ? styles.today
                    : styles.calendarDay
              }
              onClick={() => setSelectedDate(date)}
            >
              <span className={styles.calendarDate}>{displayDate}</span>

              {eventsOnDate.map((event, idx) => {
                return (
                  <div
                    key={idx}
                    className={classnames(styles.calendarEvent, {
                      [styles.withLeftMargin]: isSameDay(
                        date,
                        new Date(event.startDate),
                      ),
                      [styles.withRightMargin]: isSameDay(
                        date,
                        new Date(event.endDate),
                      ),
                    })}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                  >
                    {isSameDay(date, new Date(event.startDate)) ? (
                      event.name
                    ) : (
                      <>&nbsp;</>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {selectedDate && (
        <Modal closeModal={() => setSelectedDate(undefined)} title="New Event">
          <CreateOrUpdateEventForm
            defaultDate={formatDefaultDate(selectedDate)}
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
