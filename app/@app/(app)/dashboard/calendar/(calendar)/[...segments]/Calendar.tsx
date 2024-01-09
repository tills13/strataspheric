"use client";

import * as styles from "./style.css";

import { addDays } from "date-fns/esm";
import { useState } from "react";

import { CreateOrUpdateEventForm } from "../../../../../../../components/CreateOrUpdateEventForm";
import { Modal } from "../../../../../../../components/Modal";
import { Event } from "../../../../../../../data";
import { formatDateForDatetime } from "../../../../../../../utils/datetime";
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

  const currentDate = new Date(year, month - 1, 1);
  const firstDayOfMonth = currentDate.getDay();

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
