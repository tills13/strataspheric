"use client";

import { vars } from "../../app/theme.css";
import * as styles from "./style.css";

import { calc } from "@vanilla-extract/css-utils";
import differenceInDays from "date-fns/differenceInDays";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import startOfDay from "date-fns/startOfDay";
import React, { useState } from "react";

import { CalendarEvent } from ".";
import { useIsAfterHydration } from "../../hooks/useIsAfterHydration";
import { classnames } from "../../utils/classnames";
import { formatDateForDatetime, parseTimestamp } from "../../utils/datetime";
import { CreateOrUpdateEventForm } from "../CreateOrUpdateEventForm";
import { InternalLink } from "../Link/InternalLink";
import { Modal } from "../Modal";
import { Wrap } from "../Wrap";
import { countOverflow } from "./assignTracks";

export interface CalendarDaySelectionProps {
  isInSelection: boolean;
  isSelectionStart: boolean;
  isSelectionEnd: boolean;
  onMouseDown: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
}

export interface DragState {
  /** The event currently being dragged */
  event: CalendarEvent;
  /** The date the cursor is currently over (the prospective drop target) */
  overDate: Date | null;
}

interface Props {
  canEdit?: boolean;
  createOrUpdateEventModalTitle?: React.ReactNode;
  createOrUpdateEventFormSubmitLabel?: React.ReactNode;
  dragState?: DragState | null;
  events: CalendarEvent[];
  date: Date;
  isOutOfContext: boolean;
  maxVisibleTracks: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDragStateChange?: (state: DragState | null) => void;
  onDrop?: (event: CalendarEvent, targetDate: Date) => void;
  selectionProps?: CalendarDaySelectionProps;
  trackAssignments: Map<string, number>;
}

export function CalendarDayEvents({
  canEdit,
  createOrUpdateEventModalTitle = "New Event",
  createOrUpdateEventFormSubmitLabel,
  dragState,
  events,
  date,
  isOutOfContext,
  maxVisibleTracks,
  onClick,
  onDragStateChange,
  onDrop,
  selectionProps,
  trackAssignments,
}: Props) {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();
  const isToday = isSameDay(new Date(), date);
  const showToday = useIsAfterHydration();

  const selectionStart = selectionProps?.isSelectionStart ?? false;
  const selectionEnd = selectionProps?.isSelectionEnd ?? false;
  const inSelection = selectionProps?.isInSelection ?? false;

  const selectionClassName =
    inSelection && selectionStart && selectionEnd
      ? styles.calendarDaySelectionStartAndEnd
      : inSelection && selectionStart
        ? styles.calendarDaySelectionStart
        : inSelection && selectionEnd
          ? styles.calendarDaySelectionEnd
          : undefined;

  // Compute the ghost event whenever a drag is in progress with a known overDate.
  // Use startOfDay on both sides to avoid time-of-day skew.
  const ghostEvent: CalendarEvent | null = (() => {
    if (!dragState?.event || !dragState.overDate) return null;
    const dragged = dragState.event;
    const overDay = startOfDay(dragState.overDate);
    const origStartDay = startOfDay(parseTimestamp(dragged.startDate));
    const origEndDay = startOfDay(parseTimestamp(dragged.endDate));
    const durationMs = origEndDay.getTime() - origStartDay.getTime();
    return {
      ...dragged,
      id: "__ghost__",
      startDate: overDay.getTime(),
      endDate: overDay.getTime() + durationMs,
      readOnly: true,
    };
  })();

  // Include the ghost on any day it spans.
  const ghostSpansThisDay =
    ghostEvent != null &&
    (isSameDay(parseTimestamp(ghostEvent.startDate), date) ||
      (isAfter(date, parseTimestamp(ghostEvent.startDate)) &&
        (isBefore(date, parseTimestamp(ghostEvent.endDate)) ||
          isSameDay(parseTimestamp(ghostEvent.endDate), date))));

  // Merge ghost: replace the original with the ghost for rendering
  const visibleEvents = dragState?.event
    ? [
        ...events.filter((e) => e.id !== dragState.event.id),
        ...(ghostSpansThisDay && ghostEvent ? [ghostEvent] : []),
      ]
    : events;

  // Overflow: events assigned to tracks beyond maxVisibleTracks
  // We compute this from the full events list (before ghost substitution) plus ghost
  const allEventsForOverflow = dragState?.event
    ? [
        ...events.filter((e) => e.id !== dragState.event.id),
        ...(ghostSpansThisDay && ghostEvent ? [ghostEvent] : []),
      ]
    : events;
  const overflowCount = countOverflow(
    allEventsForOverflow,
    date,
    trackAssignments,
    maxVisibleTracks,
  );

  return (
    <>
      <div
        className={classnames(
          styles.calendarEventTrackDay,
          inSelection && styles.calendarDaySelected,
          selectionClassName,
        )}
        onMouseDown={
          selectionProps
            ? (e) => {
                // Only primary button
                if (e.button !== 0) return;
                e.preventDefault();
                selectionProps.onMouseDown(date);
              }
            : undefined
        }
        onMouseEnter={
          selectionProps ? () => selectionProps.onMouseEnter(date) : undefined
        }
        onClick={
          selectionProps
            ? undefined
            : onClick || (() => setShowNewEventModal(true))
        }
        onDragOver={
          canEdit && dragState
            ? (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (!isSameDay(dragState.overDate ?? new Date(0), date)) {
                  onDragStateChange?.({ ...dragState, overDate: date });
                }
              }
            : undefined
        }
        onDrop={
          canEdit && dragState
            ? (e) => {
                e.preventDefault();
                onDrop?.(dragState.event, date);
                onDragStateChange?.(null);
              }
            : undefined
        }
      >
        <span
          className={classnames(styles.calendarDate, {
            [styles.calendarDateToday]: !isOutOfContext && showToday && isToday,
          })}
        >
          {date.getDate()}
        </span>
        {visibleEvents.map((event) => {
          const track = trackAssignments.get(event.id);
          // Skip events with no track assignment or beyond the visible limit
          if (track === undefined || track >= maxVisibleTracks) return null;

          const startDate = parseTimestamp(event.startDate);
          const endDate = parseTimestamp(event.endDate);

          const diffFromStartDate = differenceInDays(date, startDate);
          const totalRemainder = differenceInDays(endDate, date) + 1;

          const eventWrapsToFollowingWeek = date.getDay() + totalRemainder > 7;
          const eventWrapsFromPrevWeek = date.getDay() - diffFromStartDate < 0;

          // Only render a pill at the visual start: either the event's true start
          // date, or Sunday if the event wraps in from the previous week row.
          if (
            !(
              (date.getDay() === 0 && eventWrapsFromPrevWeek) ||
              isSameDay(startDate, date)
            )
          ) {
            return null;
          }

          const isGhost = event.id === "__ghost__";
          const isDragging =
            dragState != null && event.id === dragState.event.id;

          return (
            <Wrap
              key={event.id}
              with={(children) => {
                if (event.meetingId) {
                  return (
                    <InternalLink
                      key={event.id}
                      href={`/dashboard/meetings/${event.meetingId}`}
                    >
                      {children}
                    </InternalLink>
                  );
                }
                return children;
              }}
            >
              <div
                className={classnames(styles.calendarEvent, {
                  [styles.withLeftBorderRadius]: !eventWrapsFromPrevWeek,
                  [styles.withRightBorderRadius]: !eventWrapsToFollowingWeek,
                  [styles.calendarEventGhost]: isGhost,
                  [styles.calendarEventDragging]: isDragging,
                })}
                draggable={canEdit && !event.readOnly}
                onMouseDown={(e) => e.stopPropagation()}
                onDragStart={
                  canEdit && !event.readOnly
                    ? (e) => {
                        e.dataTransfer.effectAllowed = "move";
                        e.dataTransfer.setData("text/plain", event.id);
                        // Defer so the drag image is captured before state change
                        setTimeout(() => {
                          onDragStateChange?.({ event, overDate: date });
                        }, 0);
                      }
                    : undefined
                }
                onDragEnd={
                  canEdit && !event.readOnly
                    ? () => {
                        onDragStateChange?.(null);
                      }
                    : undefined
                }
                style={{
                  top: calc(styles.calendarEventHeight)
                    .add(styles.calendarEventGap)
                    .multiply(track)
                    .add(styles.calendarEventTopOffset)
                    .toString(),
                  width: calc(
                    calc(styles.calendarEventTrackWidth)
                      .multiply(totalRemainder / 7)
                      .subtract(vars.spacing.xs),
                  ).toString(),
                  maxWidth: calc(styles.calendarEventTrackWidth)
                    .multiply((7 - date.getDay()) / 7)
                    .toString(),
                }}
                onClick={
                  isGhost || event.readOnly || event.meetingId
                    ? undefined
                    : (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }
                }
              >
                {event.name || <>&nbsp;</>}
              </div>
            </Wrap>
          );
        })}
        {overflowCount > 0 && (
          <div
            className={styles.calendarOverflow}
            style={{
              top: calc(styles.calendarEventHeight)
                .add(styles.calendarEventGap)
                .multiply(maxVisibleTracks)
                .add(styles.calendarEventTopOffset)
                .toString(),
            }}
          >
            +{overflowCount} more
          </div>
        )}
      </div>
      {showNewEventModal && (
        <Modal
          closeModal={() => setShowNewEventModal(false)}
          title={createOrUpdateEventModalTitle}
        >
          <CreateOrUpdateEventForm
            defaultDate={formatDateForDatetime(date)}
            submitLabel={createOrUpdateEventFormSubmitLabel}
            onDeleteEvent={() => setShowNewEventModal(false)}
          />
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          closeModal={() => setSelectedEvent(undefined)}
          title="Edit Event"
        >
          <CreateOrUpdateEventForm
            onDeleteEvent={() => setSelectedEvent(undefined)}
            event={selectedEvent}
          />
        </Modal>
      )}
    </>
  );
}
