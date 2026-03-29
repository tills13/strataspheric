"use client";

import * as styles from "./style.css";

import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import isSameMonth from "date-fns/isSameMonth";
import startOfDay from "date-fns/startOfDay";
import startOfMonth from "date-fns/startOfMonth";
import React from "react";

import { CalendarEvent } from ".";
import { classnames } from "../../utils/classnames";
import { dateFromDayAndWeekIdx, parseTimestamp } from "../../utils/datetime";
import { CalendarDay } from "./CalendarDay";
import { CalendarDayEvents, DragState } from "./CalendarDayEvents";
import { CalendarEventTrack } from "./CalendarEventTrack";
import { assignTracks } from "./assignTracks";
import { RangeSelectionHandlers } from "./useRangeSelection";

type CalendarDayEventsProps = React.ComponentProps<typeof CalendarDayEvents>;
type OutOfContextFn = (date: Date, context: Date) => boolean;

const IS_OUT_OF_CONTEXT_MONTH: OutOfContextFn = (date, context) =>
  !isSameMonth(date, context);

/** Maximum number of event tracks to display before showing "+N more". */
export const MAX_VISIBLE_TRACKS = 3;

interface Props {
  canEdit?: boolean;
  className?: string;
  createOrUpdateEventModalTitle?: CalendarDayEventsProps["createOrUpdateEventModalTitle"];
  createOrUpdateEventFormSubmitLabel?: CalendarDayEventsProps["createOrUpdateEventFormSubmitLabel"];
  currentMonth: number;
  currentYear: number;
  dayIsOutOfContext?: OutOfContextFn;
  dragState?: DragState | null;
  events: CalendarEvent[];
  onDragStateChange?: (state: DragState | null) => void;
  onDrop?: (event: CalendarEvent, targetDate: Date) => void;
  onSelectDate?: (date: Date) => void;
  rangeSelection?: RangeSelectionHandlers;
  weekOfMonth: number;
}

export function CalendarWeek({
  canEdit,
  className,
  createOrUpdateEventModalTitle,
  createOrUpdateEventFormSubmitLabel,
  currentMonth,
  currentYear,
  dayIsOutOfContext = IS_OUT_OF_CONTEXT_MONTH,
  dragState,
  events,
  onDragStateChange,
  onDrop,
  onSelectDate,
  rangeSelection,
  weekOfMonth,
}: Props) {
  const day0 = startOfMonth(
    new Date(Date.UTC(currentYear, currentMonth - 1, 15)),
  );
  const firstDayOfMonth = day0.getDay();

  // Build the 7 Date objects for this row (Sun–Sat)
  const rowDates = Array.from({ length: 7 }, (_, dayOfWeek) =>
    dateFromDayAndWeekIdx(day0, weekOfMonth, dayOfWeek, firstDayOfMonth),
  );

  const rowStart = startOfDay(rowDates[0]);
  const rowEnd = startOfDay(rowDates[6]);

  // Collect every event that touches this row
  const rowEvents = events.filter((e) => {
    const s = startOfDay(parseTimestamp(e.startDate));
    const en = startOfDay(parseTimestamp(e.endDate));
    return !(en < rowStart || s > rowEnd);
  });

  // Merge ghost event for track assignment (so the ghost doesn't displace real events)
  const ghostEvent = buildGhostEvent(dragState);
  const draggedEventId = dragState?.event.id;
  const eventsForTracks: CalendarEvent[] = ghostEvent
    ? [
        // Replace the dragged event with the ghost for layout purposes
        ...rowEvents.filter((e) => e.id !== draggedEventId),
        ...(eventTouchesRow(ghostEvent, rowStart, rowEnd) ? [ghostEvent] : []),
      ]
    : rowEvents;

  const trackAssignments = assignTracks(eventsForTracks, rowDates);

  return (
    <div className={classnames(className, styles.calendarRow)}>
      <div className={styles.calendarWeek}>
        {rowDates.map((date, dayOfWeek) => {
          const isDropTarget =
            dragState?.overDate != null && isSameDay(dragState.overDate, date);

          return (
            <CalendarDay
              key={dayOfWeek}
              date={date}
              isDropTarget={isDropTarget}
              isOutOfContext={dayIsOutOfContext(date, day0)}
            />
          );
        })}
      </div>
      <CalendarEventTrack>
        {rowDates.map((date, currentDayOfWeek) => {
          // Per-day events (for filtering/rendering inside CalendarDayEvents)
          const dayEvents = rowEvents
            .filter(
              (e) =>
                isSameDay(date, parseTimestamp(e.startDate)) ||
                (isAfter(date, parseTimestamp(e.startDate)) &&
                  (isBefore(date, parseTimestamp(e.endDate)) ||
                    isSameDay(date, parseTimestamp(e.endDate)))),
            )
            .sort((a, b) => (a.startDate > b.startDate ? 0 : 1));

          return (
            <CalendarDayEvents
              key={currentDayOfWeek}
              canEdit={canEdit}
              createOrUpdateEventModalTitle={createOrUpdateEventModalTitle}
              createOrUpdateEventFormSubmitLabel={
                createOrUpdateEventFormSubmitLabel
              }
              date={date}
              dragState={dragState}
              isOutOfContext={dayIsOutOfContext(date, day0)}
              events={dayEvents}
              maxVisibleTracks={MAX_VISIBLE_TRACKS}
              trackAssignments={trackAssignments}
              onClick={onSelectDate ? () => onSelectDate(date) : undefined}
              onDragStateChange={onDragStateChange}
              onDrop={onDrop}
              selectionProps={
                rangeSelection
                  ? {
                      isInSelection: rangeSelection.isDayInSelection(date),
                      isSelectionStart: rangeSelection.isSelectionStart(date),
                      isSelectionEnd: rangeSelection.isSelectionEnd(date),
                      onMouseDown: rangeSelection.onDayMouseDown,
                      onMouseEnter: rangeSelection.onDayMouseEnter,
                      onTouchStart: rangeSelection.onDayTouchStart,
                    }
                  : undefined
              }
            />
          );
        })}
      </CalendarEventTrack>
    </div>
  );
}

function eventTouchesRow(
  event: CalendarEvent,
  rowStart: Date,
  rowEnd: Date,
): boolean {
  const s = startOfDay(parseTimestamp(event.startDate));
  const e = startOfDay(parseTimestamp(event.endDate));
  return !(e < rowStart || s > rowEnd);
}

function buildGhostEvent(
  dragState: DragState | null | undefined,
): CalendarEvent | null {
  if (!dragState?.event || !dragState.overDate) return null;
  const dragged = dragState.event;
  const overDay = startOfDay(dragState.overDate);
  const origStartDay = startOfDay(parseTimestamp(dragged.startDate));
  const origEndDay = startOfDay(parseTimestamp(dragged.endDate));
  // differenceInDays is fine here since both are already startOfDay
  const durationMs = origEndDay.getTime() - origStartDay.getTime();
  return {
    ...dragged,
    id: "__ghost__",
    startDate: overDay.getTime(),
    endDate: overDay.getTime() + durationMs,
    readOnly: true,
  };
}
