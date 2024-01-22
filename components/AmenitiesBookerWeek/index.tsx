"use client";

import * as styles from "./style.css";

import add from "date-fns/add";
import getWeek from "date-fns/getWeek";
import parse from "date-fns/parse";
import startOfMonth from "date-fns/startOfMonth";
import sub from "date-fns/sub";
import { useEffect, useState } from "react";

import { Amenity } from "../../app/@app/(app)/dashboard/amenities/page";
import { Button } from "../Button";
import { CalendarWeek } from "../Calendar/CalendarWeek";
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
    <div>
      <div className={styles.header}>
        <div className={styles.headerActions}>
          <Button
            onClick={() => setWeekIdx(getWeek(sub(date, { weeks: 1 })))}
            icon={<LeftIcon />}
            size="small"
            style="tertiary"
          />
          <Button
            onClick={() => setWeekIdx(getWeek(add(date, { weeks: 1 })))}
            icon={<RightIcon />}
            size="small"
            style="tertiary"
          />
        </div>
      </div>

      <CalendarWeek
        className={styles.weekPicker}
        startOfMonth={startOfMonth(date)}
        events={bookings}
        weekIdx={weekIdx}
      />
    </div>
  );
}
