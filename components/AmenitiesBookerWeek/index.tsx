"use client";

import * as styles from "./style.css";

import add from "date-fns/add";
import getMonth from "date-fns/getMonth";
import getWeek from "date-fns/getWeek";
import getWeekOfMonth from "date-fns/getWeekOfMonth";
import getYear from "date-fns/getYear";
import parse from "date-fns/parse";
import startOfMonth from "date-fns/startOfMonth";
import sub from "date-fns/sub";
import { useEffect, useState } from "react";

import { Amenity } from "../../app/@app/dashboard/amenities/page";
import { range } from "../../utils/arrays";
import { Button } from "../Button";
import { CalendarWeek } from "../Calendar/CalendarWeek";
import { DownIcon } from "../Icon/DownIcon";
import { LeftIcon } from "../Icon/LeftIcon";
import { RightIcon } from "../Icon/RightIcon";

interface Props {
  amenity: Amenity;
}

export function AmenitiesBookerWeek({ amenity }: Props) {
  const [weekIdx, setWeekIdx] = useState(getWeek(new Date()));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {}, [weekIdx]);

  const date = parse(weekIdx.toString(), "I", new Date());

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerActions}>
          <Button
            className={styles.headerActionsPrev}
            onClick={() => setWeekIdx(getWeek(sub(date, { weeks: 1 })))}
            icon={<DownIcon />}
            size="small"
            style="tertiary"
          />
          <Button
            onClick={() => setWeekIdx(getWeek(add(date, { weeks: 1 })))}
            icon={<DownIcon />}
            size="small"
            style="tertiary"
          />
        </div>
      </div>

      {[...range(3)].map((_, weekIdx) => (
        <CalendarWeek
          key={weekIdx}
          className={styles.weekPicker}
          events={bookings}
          currentMonth={getMonth(date) + 1}
          weekOfMonth={getWeekOfMonth(date) + (weekIdx - 2)}
          currentYear={getYear(date)}
        />
      ))}
    </>
  );
}
