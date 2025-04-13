import * as styles from "./style.css";

import { Event } from "../../data/events/getEventsForRange";
import { CalendarWeek } from "./CalendarWeek";

export type CalendarEvent = Pick<
  Event,
  "id" | "name" | "description" | "startDate" | "endDate"
> & { meetingId?: string };

interface Props {
  upsertEvent: (eventId: string | undefined, fd: FormData) => void;
  deleteEvent: (eventId: string) => void;
  events: CalendarEvent[];
  month: number;
  year: number;
}

export function Calendar({
  upsertEvent,
  deleteEvent,
  events,
  month,
  year,
}: Props) {
  return (
    <div className={styles.calendar}>
      {Array.from(new Array(6)).map((_, currentWeek) => (
        <CalendarWeek
          key={currentWeek}
          currentMonth={month}
          currentYear={year}
          weekOfMonth={currentWeek}
          deleteEvent={deleteEvent}
          events={events}
          upsertEvent={upsertEvent}
        />
      ))}
    </div>
  );
}
