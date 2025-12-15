"use client";

import * as styles from "./style.css";

import add from "date-fns/add";
import format from "date-fns/format";
import getWeekOfMonth from "date-fns/getWeekOfMonth";
import isBefore from "date-fns/isBefore";
import startOfDay from "date-fns/startOfDay";
import startOfWeek from "date-fns/startOfWeek";
import sub from "date-fns/sub";
import React, { useState } from "react";

import { Amenity } from "../../data/amenities/getAmenity";
import { AmenityBooking } from "../../data/amenities/getAmenityBooking";
import { range } from "../../utils/arrays";
import { Button } from "../Button";
import { CalendarWeek } from "../Calendar/CalendarWeek";
import { Group } from "../Group";
import { CalendarIcon } from "../Icon/CalendarIcon";
import { DownIcon } from "../Icon/DownIcon";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { useAmenityBookings } from "./useAmenityBookings";

function isAmenityBooking(
  booking: Props["booking"],
): booking is AmenityBooking {
  return !!booking && "amenity" in booking;
}

type CalendarWeekProps = React.ComponentProps<typeof CalendarWeek>;

interface Props {
  amenity: Amenity;
  booking?: CalendarWeekProps["events"][number] | AmenityBooking;
  loadOtherBookings?: boolean;
  onSelectDate?: CalendarWeekProps["onSelectDate"];
}

export function AmenitiesBookingCalendar({
  amenity,
  booking,
  loadOtherBookings = true,
  onSelectDate,
}: Props) {
  const [baseDate, setBaseDate] = useState(() =>
    startOfWeek(booking ? new Date(booking.startDate * 1000) : new Date()),
  );

  const bookings = useAmenityBookings(
    amenity.id,
    baseDate,
    booking?.id,
    loadOtherBookings,
  );

  const monthName = format(baseDate, "LLLL");

  const virtualEvent = booking
    ? isAmenityBooking(booking)
      ? {
          name: "This Booking",
          description: "",
          meetingId: undefined,
          ...booking,
          id: "THIS_BOOKING",
        }
      : booking
    : undefined;

  return (
    <Stack gap="normal">
      <Group justify="space-between">
        <Text fontWeight="bold">
          {monthName}, {baseDate.getFullYear()}
        </Text>
        <Group gap="small">
          <Button
            className={styles.headerActionsPrev}
            onClick={() => setBaseDate(sub(baseDate, { weeks: 1 }))}
            icon={<DownIcon />}
            size="small"
            style="tertiary"
            type="button"
          />
          <Button
            onClick={() => setBaseDate(startOfWeek(new Date()))}
            icon={<CalendarIcon />}
            size="small"
            style="tertiary"
            type="button"
          />
          <Button
            onClick={() => setBaseDate(add(baseDate, { weeks: 1 }))}
            icon={<DownIcon />}
            size="small"
            style="tertiary"
            type="button"
          />
        </Group>
      </Group>

      <div className={styles.container}>
        {[...range(3)].map((weekOffset) => {
          const weekDate = add(baseDate, { weeks: weekOffset - 1 });

          return (
            <CalendarWeek
              key={weekOffset}
              createOrUpdateEventModalTitle={`Book ${amenity.name}`}
              createOrUpdateEventFormSubmitLabel="Submit Booking"
              dayIsOutOfContext={(date) =>
                isBefore(date, startOfDay(new Date()))
              }
              events={virtualEvent ? [...bookings, virtualEvent] : bookings}
              currentMonth={weekDate.getMonth() + 1}
              currentYear={weekDate.getFullYear()}
              onSelectDate={onSelectDate}
              weekOfMonth={getWeekOfMonth(weekDate) - 1}
            />
          );
        })}
      </div>
    </Stack>
  );
}
