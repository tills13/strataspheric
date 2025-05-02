"use client";

import { vars } from "../../app/theme.css";
import * as styles from "./style.css";

import { calc } from "@vanilla-extract/css-utils";
import differenceInDays from "date-fns/differenceInDays";
import isSameDay from "date-fns/isSameDay";
import React, { useState } from "react";

import { CalendarEvent } from ".";
import { classnames } from "../../utils/classnames";
import { formatDateForDatetime, parseTimestamp } from "../../utils/datetime";
import { CreateOrUpdateEventForm } from "../CreateOrUpdateEventForm";
import { InternalLink } from "../Link/InternalLink";
import { Modal } from "../Modal";
import { Wrap } from "../Wrap";

interface Props {
  createOrUpdateEventModalTitle?: React.ReactNode;
  createOrUpdateEventFormSubmitLabel?: React.ReactNode;
  events: CalendarEvent[];
  date: Date;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function CalendarDayEvents({
  createOrUpdateEventModalTitle = "New Event",
  createOrUpdateEventFormSubmitLabel,
  date,
  events,
  onClick,
}: Props) {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();

  return (
    <>
      <div
        className={styles.calendarEventTrackDay}
        onClick={onClick || (() => setShowNewEventModal(true))}
      >
        {events.map((event, idx) => {
          const startDate = parseTimestamp(event.startDate);
          const endDate = parseTimestamp(event.endDate);

          const diffFromStartDate = differenceInDays(date, startDate);
          const totalRemainder = differenceInDays(endDate, date) + 1;
          // const totalLength = differenceInDays(endDate, startDate);

          const eventWrapsToFollowingWeek = date.getDay() + totalRemainder > 7;
          const eventWrapsFromPrevWeek = date.getDay() - diffFromStartDate < 0;

          if (
            !(
              (date.getDay() === 0 && eventWrapsFromPrevWeek) ||
              isSameDay(startDate, date)
            )
          ) {
            return null;
          }

          return (
            <Wrap
              key={idx}
              with={(children) => {
                if (event.meetingId) {
                  return (
                    <InternalLink
                      key={idx}
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
                })}
                draggable="true"
                onDragStart={(e) => {
                  e.dataTransfer.dropEffect = "move";
                  e.dataTransfer.setData("text/plain", event.id);
                }}
                style={{
                  top: calc(vars.sizes.xs)
                    .add(vars.spacing.xxs)
                    .multiply(idx)
                    .add("32px")
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
                  event.meetingId
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
