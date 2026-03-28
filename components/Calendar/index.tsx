"use client";

import * as styles from "./style.css";

import startOfDay from "date-fns/startOfDay";
import { useState } from "react";
import { mutate } from "swr";

import { upsertEventAction } from "../../app/@app/dashboard/calendar/[...segments]/actions";
import { Event } from "../../data/events/getEventsForRange";
import { parseTimestamp, patchTimezoneOffset } from "../../utils/datetime";
import { DragState } from "./CalendarDayEvents";
import { CalendarWeek } from "./CalendarWeek";
import { DateRange, useRangeSelection } from "./useRangeSelection";

export type CalendarEvent = Pick<
  Event,
  "id" | "name" | "description" | "startDate" | "endDate"
> & { meetingId?: string; readOnly?: boolean };

interface Props {
  canEdit?: boolean;
  events: CalendarEvent[];
  month: number;
  year: number;
  onRangeSelected?: (range: DateRange) => void;
}

export function Calendar({
  canEdit,
  events,
  month,
  year,
  onRangeSelected,
}: Props) {
  const rangeSelection = useRangeSelection(onRangeSelected);

  const [dragState, setDragState] = useState<DragState | null>(null);

  function handleDrop(event: CalendarEvent, targetDate: Date) {
    const origStartDay = startOfDay(parseTimestamp(event.startDate));
    const origEndDay = startOfDay(parseTimestamp(event.endDate));
    const durationMs = origEndDay.getTime() - origStartDay.getTime();

    const newStartDay = startOfDay(targetDate);
    const newEndDay = new Date(newStartDay.getTime() + durationMs);

    // Optimistically update the SWR cache immediately, then revalidate after
    // the server action completes (or roll back on error).
    mutate(
      (k) => Array.isArray(k) && k[1] === "events",
      async (current: CalendarEvent[] | undefined) => {
        const fd = new FormData();
        fd.set("name", event.name);
        fd.set("description", event.description);
        fd.set("date_start", newStartDay.toISOString().split(".")[0]);
        fd.set("date_end", newEndDay.toISOString().split(".")[0]);

        patchTimezoneOffset(fd, "date_start");
        patchTimezoneOffset(fd, "date_end");

        await upsertEventAction(event.id, fd);

        // Return the confirmed updated list after the server round-trip
        return (current ?? []).map((e) =>
          e.id === event.id
            ? {
                ...e,
                startDate: newStartDay.getTime(),
                endDate: newEndDay.getTime(),
              }
            : e,
        );
      },
      {
        optimisticData: (current: CalendarEvent[] | undefined) =>
          (current ?? []).map((e) =>
            e.id === event.id
              ? {
                  ...e,
                  startDate: newStartDay.getTime(),
                  endDate: newEndDay.getTime(),
                }
              : e,
          ),
        rollbackOnError: true,
        revalidate: false,
      },
    );
  }

  return (
    <div
      className={styles.calendar}
      onDragLeave={(e) => {
        // Clear the drop target highlight when cursor leaves the entire calendar
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setDragState((s) => (s ? { ...s, overDate: null } : null));
        }
      }}
    >
      {Array.from(new Array(6)).map((_, currentWeek) => (
        <CalendarWeek
          key={currentWeek}
          canEdit={canEdit}
          currentMonth={month}
          currentYear={year}
          weekOfMonth={currentWeek}
          events={events}
          dragState={dragState}
          onDragStateChange={setDragState}
          onDrop={handleDrop}
          rangeSelection={rangeSelection ?? undefined}
        />
      ))}
    </div>
  );
}
