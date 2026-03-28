"use client";

import * as styles from "./style.css";

import isSameDay from "date-fns/isSameDay";

import { useIsAfterHydration } from "../../hooks/useIsAfterHydration";
import { classnames } from "../../utils/classnames";

interface Props {
  date: Date;
  isDropTarget?: boolean;
  isOutOfContext: boolean;
}

export function CalendarDay({ date, isDropTarget, isOutOfContext }: Props) {
  const isToday = isSameDay(new Date(), date);
  const showToday = useIsAfterHydration();

  return (
    <div
      className={classnames(
        isOutOfContext
          ? styles.calendarDayOutOfScope
          : showToday && isToday
            ? styles.today
            : styles.calendarDay,
        { [styles.isDropTarget]: !!isDropTarget },
      )}
    ></div>
  );
}
