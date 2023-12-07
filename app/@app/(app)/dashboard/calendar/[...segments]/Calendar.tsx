"use client";

import * as styles from "./style.css";

import getDaysInMonth from "date-fns/getDaysInMonth";
import isSameDay from "date-fns/isSameDay";
import sub from "date-fns/sub";
import { useEffect, useState } from "react";

import { Modal } from "../../../../../../components/Modal";
import {
  NewEventForm,
  formatDefaultDate,
} from "../../../../../../components/NewEventForm";
import { createEventAction } from "./actions";

interface Props {
  createEvent: (fd: FormData) => void;
  events: Array<{ date: Date; label: string }>;
  month: number;
  year: number;
}

export function Calendar({ createEvent, events, month, year }: Props) {
  const [dateEditing, setDateEditing] = useState<Date>();
  const [showToday, setShowToday] = useState(false);
  const selectedDate = new Date(year, month - 1, 1);

  const numDaysPrevMonth = getDaysInMonth(sub(selectedDate, { months: 1 }));
  const numDaysMonth = getDaysInMonth(selectedDate);
  const firstDayOfMonth = selectedDate.getDay();

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
            selectedDate.getMonth() +
              1 +
              "/" +
              displayDate +
              "/" +
              selectedDate.getFullYear(),
          );
          const isToday = isSameDay(new Date(), date);
          const eventsOnDate = events.filter((e) => isSameDay(date, e.date));

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
              onClick={() => setDateEditing(date)}
            >
              <span className={styles.calendarDate}>{displayDate}</span>

              {eventsOnDate.map((event, idx) => (
                <div key={idx} className={styles.calendarEvent}>
                  {event.label}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {dateEditing && (
        <Modal closeModal={() => setDateEditing(undefined)} title="New Event">
          <NewEventForm
            defaultDate={formatDefaultDate(dateEditing)}
            createEvent={createEvent}
          />
        </Modal>
      )}
    </>
  );
}
