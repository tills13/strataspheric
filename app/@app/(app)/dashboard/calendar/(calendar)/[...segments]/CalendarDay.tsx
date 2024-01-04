import * as styles from "./style.css";

import { isSameMonth } from "date-fns/esm";
import isSameDay from "date-fns/isSameDay";

interface Props {
  currentDate: Date;
  date: Date;
  onClickDate: (date: Date) => void;
}

export function CalendarDay({ currentDate, date, onClickDate }: Props) {
  const isOutOfContext = !isSameMonth(date, currentDate);
  const isToday = isSameDay(new Date(), date);
  const showToday = false;

  return (
    <div
      className={
        isOutOfContext
          ? styles.calendarDayOutOfScope
          : showToday && isToday
            ? styles.today
            : styles.calendarDay
      }
      onClick={() => onClickDate(date)}
    >
      <span className={styles.calendarDate}>{date.getDate()}</span>
    </div>
  );
}
