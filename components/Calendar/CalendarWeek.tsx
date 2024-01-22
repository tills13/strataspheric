import * as styles from "./style.css";

import { Event } from "../../data";
import { classnames } from "../../utils/classnames";
import { dateFromDayAndWeekIdx } from "../../utils/datetime";
import { CalendarDay } from "./CalendarDay";
import { CalendarDayEvents } from "./CalendarDayEvents";

interface Props {
  className?: string;
  deleteEvent: (eventId: string) => any;
  events: Array<Event & { meetingId?: string }>;
  startOfMonth: Date;
  upsertEvent: (eventId: string | undefined, fd: FormData) => any;
  weekIdx: number;
}

export function CalendarWeek({
  className,
  deleteEvent,
  events,
  startOfMonth,
  upsertEvent,
  weekIdx,
}: Props) {
  const firstDayOfMonth = startOfMonth.getDay();
  console.log(startOfMonth);

  return (
    <div className={classnames(className, styles.calendarRow)}>
      <div className={styles.calendarWeek}>
        {Array.from(new Array(7)).map((_, dayIdx) => (
          <CalendarDay
            key={dayIdx}
            currentDate={startOfMonth}
            date={dateFromDayAndWeekIdx(
              startOfMonth,
              weekIdx,
              dayIdx,
              firstDayOfMonth,
            )}
            upsertEvent={upsertEvent}
          />
        ))}
      </div>
      <div className={styles.calendarEventTrack}>
        {Array.from(new Array(7)).map((_, dayIdx) => (
          <CalendarDayEvents
            key={dayIdx}
            date={dateFromDayAndWeekIdx(
              startOfMonth,
              weekIdx,
              dayIdx,
              firstDayOfMonth,
            )}
            deleteEvent={deleteEvent}
            events={events}
            upsertEvent={upsertEvent}
          />
        ))}
      </div>
    </div>
  );
}
