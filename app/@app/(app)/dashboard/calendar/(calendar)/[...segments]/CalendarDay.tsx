import * as styles from "./style.css";

import isSameDay from "date-fns/isSameDay";

import { Event } from "../../../../../../../data";

interface Props {
  date: Date;
  isOutOfContext?: boolean;
  onClickDate: (date: Date) => void;
}

export function CalendarDay({ date, isOutOfContext, onClickDate }: Props) {
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
