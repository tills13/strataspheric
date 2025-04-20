"use client";

import differenceInDays from "date-fns/differenceInDays";
import isBefore from "date-fns/isBefore";
import { useState } from "react";

import { createAmenityBookingAction } from "../../app/@app/dashboard/amenities/actions";
import { Amenity } from "../../data/amenities/getAmenity";
import {
  formatDateForDatetime,
  patchDateTimezoneOffset,
} from "../../utils/datetime";
import { pluralize } from "../../utils/pluralize";
import { AmenitiesBookingCalendar } from "../AmenitiesBookingCalendar";
import { Group } from "../Group";
import { InfoPanel } from "../InfoPanel";
import { Money } from "../Money";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";
import { TextArea } from "../TextArea";

interface Props {
  amenity: Amenity;
}

export function BookAmenityForm({ amenity }: Props) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const bookingLength =
    startDate && endDate ? differenceInDays(endDate, startDate) : undefined;

  return (
    <form
      action={async (fd) => {
        if (!startDate || !endDate) {
          return;
        }

        patchDateTimezoneOffset(
          fd,
          "startDate",
          formatDateForDatetime(startDate),
        );
        patchDateTimezoneOffset(fd, "endDate", formatDateForDatetime(endDate));

        await createAmenityBookingAction(amenity.id, fd);
      }}
    >
      <Stack>
        <AmenitiesBookingCalendar
          amenity={amenity}
          onSelectDate={(date) => {
            if (!startDate || endDate) {
              setStartDate(date);
              setEndDate(undefined);
            } else {
              if (isBefore(date, startDate)) {
                setStartDate(date);
                setEndDate(startDate);
              } else {
                setEndDate(date);
              }
            }
          }}
          virtualEvent={
            startDate
              ? {
                  endDate: endDate || startDate,
                  name: "Current Booking",
                  startDate,
                }
              : undefined
          }
        />

        <TextArea
          name="specialRequests"
          placeholder="Special requests or questions for council for this booking"
        />

        {amenity.costPerHour && typeof bookingLength !== "undefined" && (
          <Stack gap="small">
            <Group justify="space-between">
              <Text fontWeight="bold">Summary</Text>
              <Text>
                {bookingLength} {pluralize("day", bookingLength)} @{" "}
                <Money amount={amenity.costPerHour * 24} /> per day
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fontWeight="bold">Approximate Cost</Text>
              <Money amount={amenity.costPerHour * 24 * bookingLength} />
            </Group>
          </Stack>
        )}

        {startDate && endDate && (
          <InfoPanel>
            Submit your booking request and council will get back to you
            {amenity.costPerHour ? " with an invoice" : ""} as soon as possible.
            Please note that your selected dates may not be available after
            council has responded to existing pending booking requests.
          </InfoPanel>
        )}

        <StatusButton color="primary" disabled={!startDate || !endDate}>
          Submit Booking for Approval
        </StatusButton>
      </Stack>
    </form>
  );
}
