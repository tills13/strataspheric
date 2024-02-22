"use client";

import * as styles from "./style.css";

import add from "date-fns/add";
import differenceInDays from "date-fns/differenceInDays";
import isSameDay from "date-fns/isSameDay";
import { useState, useTransition } from "react";
import { mutate } from "swr";

import { Event, Strata } from "../../data";
import { useIsAfterHydration } from "../../hooks/useIsAfterHydration";
import { classnames } from "../../utils/classnames";
import {
  formatDateForDatetime,
  parseTimestamp,
  patchTimezoneOffset,
} from "../../utils/datetime";
import { CreateOrUpdateEventForm } from "../CreateOrUpdateEventForm";
import { Modal } from "../Modal";

interface Props {
  date: Date;
  events: Event[];
  isOutOfContext: boolean;
  upsertEvent: (eventId: string | undefined, fd: FormData) => any;
}

export function CalendarDay({
  events,
  date,
  isOutOfContext,
  upsertEvent,
}: Props) {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const isToday = isSameDay(new Date(), date);
  const showToday = useIsAfterHydration();
  const [isDropTarget, setIsDropTarget] = useState(false);

  const [, startTransition] = useTransition();

  return (
    <>
      <div
        className={classnames(
          isOutOfContext
            ? styles.calendarDayOutOfScope
            : showToday && isToday
              ? styles.today
              : styles.calendarDay,
          { [styles.isDropTarget]: isDropTarget },
        )}
        onClick={() => setShowNewEventModal(true)}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          setIsDropTarget(true);
        }}
        onDragLeave={() => setIsDropTarget(false)}
        onDrop={(e) => {
          e.preventDefault();
          const eventId = e.dataTransfer.getData("text/plain");
          const event = events.find((ev) => ev.id === eventId);

          if (!event) {
            return;
          }

          const fd = new FormData();
          fd.set("name", event.name);
          fd.set("description", event.description);

          const startDate = parseTimestamp(event.startDate);
          const endDate = parseTimestamp(event.endDate);

          const diff = differenceInDays(date, startDate) + 1;
          const newStart = add(startDate, { days: diff });
          const newEnd = add(endDate, { days: diff });

          fd.set("date_start", newStart.toISOString().split(".")[0]);
          fd.set("date_end", newEnd.toISOString().split(".")[0]);

          patchTimezoneOffset(fd, "date_start");
          patchTimezoneOffset(fd, "date_end");

          startTransition(async () => {
            await upsertEvent(event.id, fd);
            mutate((k) => Array.isArray(k) && k[1] === "events");
          });
          setIsDropTarget(false);
        }}
      >
        <span className={styles.calendarDate}>{date.getDate()}</span>
      </div>

      {showNewEventModal && (
        <Modal closeModal={() => setShowNewEventModal(false)} title="New Event">
          <CreateOrUpdateEventForm
            defaultDate={formatDateForDatetime(date)}
            upsertEvent={upsertEvent.bind(undefined, undefined)}
            onDeleteEvent={() => setShowNewEventModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
