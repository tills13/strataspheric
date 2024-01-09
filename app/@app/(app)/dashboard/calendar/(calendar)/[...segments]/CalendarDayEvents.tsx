import { vars } from "../../../../../../theme.css";
import * as styles from "./style.css";

import { calc } from "@vanilla-extract/css-utils";
import differenceInDays from "date-fns/differenceInDays";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";

import { ConditionalWrapper } from "../../../../../../../components/ConditionalWrapper";
import { InternalLink } from "../../../../../../../components/Link/InternalLink";
import { Event } from "../../../../../../../data";
import { classnames } from "../../../../../../../utils/classnames";
import { parseTimestamp } from "../../../../../../../utils/datetime";

interface Props {
  events: Array<Event & { meetingId?: string }>;
  date: Date;
  onClickEvent: (event: Event) => void;
}

export function CalendarDayEvents({ events, date, onClickEvent }: Props) {
  const eventsOnDay = events
    .filter(
      (e) =>
        isSameDay(date, parseTimestamp(e.startDate)) ||
        (isAfter(date, parseTimestamp(e.startDate)) &&
          (isBefore(date, parseTimestamp(e.endDate)) ||
            isSameDay(date, parseTimestamp(e.endDate)))),
    )
    .sort((a, b) => (a.startDate > b.startDate ? 0 : 1));

  return (
    <div className={styles.calendarEventTrackDay}>
      {eventsOnDay.map((event, idx) => {
        const startDate = parseTimestamp(event.startDate);
        const endDate = parseTimestamp(event.endDate);

        const diffFromStartDate = differenceInDays(date, startDate) + 1;
        const totalRemainder = differenceInDays(endDate, date) + 1;

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
          <ConditionalWrapper
            key={idx}
            predicate={!!event.meetingId}
            wrapTrue={(children) => (
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
                [styles.withLeftMarginAndBorderRadius]: !eventWrapsFromPrevWeek,
                [styles.withRightMarginAndBorderRadius]:
                  !eventWrapsToFollowingWeek,
              })}
              style={{
                top: calc(vars.sizes.xs)
                  .add(vars.spacing.xxs)
                  .multiply(idx)
                  .toString(),
                width: calc((totalRemainder / 7) * 100 + "vw")
                  .subtract(
                    eventWrapsToFollowingWeek ? "0px" : vars.spacing.small,
                  )
                  .toString(),
                maxWidth: ((7 - date.getDay()) / 7) * 100 + "vw",
              }}
              onClick={
                event.meetingId
                  ? undefined
                  : (e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      onClickEvent(event);
                    }
              }
            >
              {event.name}
            </div>
          </ConditionalWrapper>
        );
      })}
    </div>
  );
}
