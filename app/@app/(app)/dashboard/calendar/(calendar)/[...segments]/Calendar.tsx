"use client";

import { vars } from "../../../../../../theme.css";
import * as styles from "./style.css";

import { calc } from "@vanilla-extract/css-utils";
import differenceInDays from "date-fns/differenceInDays";
import { addDays, endOfWeek, getWeek, subDays } from "date-fns/esm";
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
import {
  formatDateForDatetime,
  parseTimestamp,
} from "../../../../../../../utils/datetime";
import { CalendarDay } from "./CalendarDay";
import { CalendarDayEvents } from "./CalendarDayEvents";

interface Props {
  upsertEvent: (eventId: string | undefined, fd: FormData) => void;
  deleteEvent: (eventId: string) => void;
  events: Event[];
  month: number;
  year: number;
}

function dateFromDayAndWeekIdx(
  currentDate: Date,
  weekIdx: number,
  dayIdx: number,
  firstDayInMonth: number,
) {
  const offset = weekIdx * 7 + dayIdx - firstDayInMonth;

  return addDays(currentDate, offset);
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
  const firstDayOfMonth = currentDate.getDay();

  useEffect(() => setShowToday(true), []);

  return (
    <>
      <div className={styles.calendar}>
        {Array.from(new Array(6)).map((_, weekIdx) => {
          return (
            <div key={weekIdx} className={styles.calendarRow}>
              <div className={styles.calendarWeek}>
                {Array.from(new Array(7)).map((_, dayIdx) => (
                  <CalendarDay
                    key={dayIdx}
                    currentDate={currentDate}
                    date={dateFromDayAndWeekIdx(
                      currentDate,
                      weekIdx,
                      dayIdx,
                      firstDayOfMonth,
                    )}
                    onClickDate={setSelectedDate}
                  />
                ))}
              </div>
              <div className={styles.calendarEventTrack}>
                {Array.from(new Array(7)).map((_, dayIdx) => (
                  <CalendarDayEvents
                    key={dayIdx}
                    date={dateFromDayAndWeekIdx(
                      currentDate,
                      weekIdx,
                      dayIdx,
                      firstDayOfMonth,
                    )}
                    currentDate={currentDate}
                    events={events}
                    onClickEvent={setSelectedEvent}
                  />
                ))}
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
