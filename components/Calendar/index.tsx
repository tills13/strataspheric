import * as styles from "./style.css";

import { Event } from "../../data";
import { CalendarWeek } from "./CalendarWeek";

interface Props {
  upsertEvent: (eventId: string | undefined, fd: FormData) => void;
  deleteEvent: (eventId: string) => void;
  events: Event[];
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
  const firstDayOfMonth = new Date(year, month - 1, 1);

  return (
    <div className={styles.calendar}>
      {Array.from(new Array(6)).map((_, weekIdx) => (
        <CalendarWeek
          key={weekIdx}
          startOfMonth={firstDayOfMonth}
          deleteEvent={deleteEvent}
          events={events}
          upsertEvent={upsertEvent}
          weekIdx={weekIdx}
        />
      ))}
    </div>
  );
}
