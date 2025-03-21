"use client";

import { sidebarWidthVar, vars } from "../../app/theme.css";
import * as styles from "./style.css";

import { calc } from "@vanilla-extract/css-utils";
import differenceInDays from "date-fns/differenceInDays";
import isSameDay from "date-fns/isSameDay";
import { useState } from "react";

import { Event } from "../../data";
import { classnames } from "../../utils/classnames";
import { formatDateForDatetime, parseTimestamp } from "../../utils/datetime";
import { CreateOrUpdateEventForm } from "../CreateOrUpdateEventForm";
import { InternalLink } from "../Link/InternalLink";
import { Modal } from "../Modal";
import { Wrap } from "../Wrap";

interface Props {
  events: Array<Event & { meetingId?: string }>;
  date: Date;
  deleteEvent: (eventId: string) => any;
  upsertEvent: (eventId: string | undefined, fd: FormData) => any;
}

export function CalendarDayEvents({
  date,
  events,
  deleteEvent,
  upsertEvent,
}: Props) {
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();

  return (
    <>
      <div
        className={styles.calendarEventTrackDay}
        onClick={() => setShowNewEventModal(true)}
      >
        {events.map((event, idx) => {
          const startDate = parseTimestamp(event.startDate);
          const endDate = parseTimestamp(event.endDate);

          const diffFromStartDate = differenceInDays(date, startDate);
          const totalRemainder = differenceInDays(endDate, date) + 1;
          const totalLength = differenceInDays(endDate, startDate);

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
              if={!!event.meetingId}
              with={(children) => (
                <InternalLink
                  key={idx}
                  href={`/dashboard/meetings/${event.meetingId!}`}
                >
                  {children}
                </InternalLink>
              )}
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
                    .toString(),
                  width: calc(
                    calc("100vw")
                      .subtract(sidebarWidthVar)
                      .subtract(calc(vars.spacing.normal).multiply(2))
                      .subtract(
                        calc(vars.spacing.xs).multiply(
                          totalLength === 0 ? 6 : totalRemainder - 1,
                        ),
                      ),
                  )
                    .multiply(totalRemainder / 7)
                    .toString(),
                  maxWidth: calc(
                    calc("100vw")
                      .subtract(sidebarWidthVar)
                      .subtract(calc(vars.spacing.normal).multiply(2))
                      .subtract(
                        calc(vars.spacing.xs).multiply(7 - date.getDay() - 1),
                      ),
                  )
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
                {event.name}
              </div>
            </Wrap>
          );
        })}
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
      {selectedEvent && (
        <Modal
          closeModal={() => setSelectedEvent(undefined)}
          title="Edit Event"
        >
          <CreateOrUpdateEventForm
            upsertEvent={upsertEvent.bind(undefined, selectedEvent.id)}
            deleteEvent={deleteEvent.bind(undefined, selectedEvent.id)}
            onDeleteEvent={() => setSelectedEvent(undefined)}
            event={selectedEvent}
          />
        </Modal>
      )}
    </>
  );
}
