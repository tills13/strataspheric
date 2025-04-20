"use client";

import * as styles from "./style.css";

import add from "date-fns/add";
import format from "date-fns/format";
import getMonth from "date-fns/getMonth";
import getWeek from "date-fns/getWeek";
import getWeekOfMonth from "date-fns/getWeekOfMonth";
import getYear from "date-fns/getYear";
import isBefore from "date-fns/isBefore";
import parse from "date-fns/parse";
import startOfDay from "date-fns/startOfDay";
import startOfWeek from "date-fns/startOfWeek";
import sub from "date-fns/sub";
import React, { useEffect, useMemo, useState } from "react";

import { Amenity } from "../../data/amenities/getAmenity";
import { AmenityBooking } from "../../data/amenities/getAmenityBooking";
import { range } from "../../utils/arrays";
import { Button } from "../Button";
import { CalendarEvent } from "../Calendar";
import { CalendarWeek } from "../Calendar/CalendarWeek";
import { Group } from "../Group";
import { DownIcon } from "../Icon/DownIcon";
import { Stack } from "../Stack";
import { Text } from "../Text";

type CalendarWeekProps = React.ComponentProps<typeof CalendarWeek>;

interface Props {
  amenity: Amenity;
  onSelectDate: CalendarWeekProps["onSelectDate"];
  virtualEvent: CalendarWeekProps["events"][number];
}

export function AmenitiesBookingCalendar({
  amenity,
  onSelectDate,
  virtualEvent,
}: Props) {
  const [weekIdx, setWeekIdx] = useState(getWeek(new Date()));
  const [bookings, setBookings] = useState<CalendarEvent[]>([]);

  const date = useMemo(
    () => parse(weekIdx.toString(), "I", new Date()),
    [weekIdx],
  );
  const monthName = format(date, "LLLL");

  useEffect(() => {
    async function fetchAmenityBookings() {
      const queryParams = new URLSearchParams({
        amenityId: amenity.id,
        startTs: startOfWeek(date).getTime().toString(),
        endTs: add(startOfWeek(date), { weeks: 3 }).getTime().toString(),
      });

      const r = await fetch(
        "/api/amenityBookings/listAmenityBookings?" + queryParams.toString(),
      );

      const rJson = (await r.json()) as { amenityBookings: AmenityBooking[] };

      setBookings(
        rJson.amenityBookings
          .filter((booking) => !virtualEvent || booking.id !== virtualEvent.id)
          .map((amenityBooking) => ({
            name: "",
            description: "",
            ...amenityBooking,
          })),
      );
    }

    fetchAmenityBookings();
  }, [amenity, date, virtualEvent]);

  return (
    <Stack gap="xs">
      <Group justify="space-between">
        <Text fontWeight="bold">
          {monthName}, {date.getFullYear()}
        </Text>
        <Group gap="normal">
          <Button
            className={styles.headerActionsPrev}
            onClick={() => setWeekIdx(getWeek(sub(date, { weeks: 1 })))}
            icon={<DownIcon />}
            size="small"
            style="tertiary"
            type="button"
          />
          <Button
            onClick={() => setWeekIdx(getWeek(add(date, { weeks: 1 })))}
            icon={<DownIcon />}
            size="small"
            style="tertiary"
            type="button"
            disabled={weekIdx === 52}
          />
        </Group>
      </Group>

      <div className={styles.container}>
        {[...range(3)].map((weekIdx) => (
          <CalendarWeek
            key={weekIdx}
            createOrUpdateEventModalTitle={`Book ${amenity.name}`}
            createOrUpdateEventFormSubmitLabel="Submit Booking"
            dayIsOutOfContext={(date) => isBefore(date, startOfDay(new Date()))}
            events={[...bookings, virtualEvent].filter(Boolean)}
            currentMonth={getMonth(date) + 1}
            currentYear={getYear(date)}
            onSelectDate={onSelectDate}
            weekOfMonth={getWeekOfMonth(date) + (weekIdx - 2)}
          />
        ))}
      </div>
    </Stack>
  );
}
