"use client";

import * as styles from "./style.css";

import { isSameMonth } from "date-fns/esm";
import isSameDay from "date-fns/isSameDay";
import { useState } from "react";

import { formatDateForDatetime } from "../../utils/datetime";
import { CreateOrUpdateEventForm } from "../CreateOrUpdateEventForm";
import { Modal } from "../Modal";

interface Props {
  currentDate: Date;
  date: Date;
  upsertEvent: (eventId: string | undefined, fd: FormData) => any;
}

export function CalendarDay({ currentDate, date, upsertEvent }: Props) {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const isOutOfContext = !isSameMonth(date, currentDate);
  const isToday = isSameDay(new Date(), date);
  const showToday = false;

  return (
    <>
      <div
        className={
          isOutOfContext
            ? styles.calendarDayOutOfScope
            : showToday && isToday
              ? styles.today
              : styles.calendarDay
        }
        onClick={() => setShowNewEventModal(true)}
      >
        <span className={styles.calendarDate}>{date.getDate()}</span>
      </div>

      {showNewEventModal && (
        <Modal closeModal={() => setShowNewEventModal(false)} title="New Event">
          <CreateOrUpdateEventForm
            defaultDate={formatDateForDatetime(date)}
            upsertEvent={upsertEvent.bind(undefined, undefined)}
          />
        </Modal>
      )}
    </>
  );
}
