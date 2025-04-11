"use client";

import differenceInDays from "date-fns/differenceInDays";
import isBefore from "date-fns/isBefore";
import { useState } from "react";

import { AmenitiesBookingCalendar } from "../../../../components/AmenitiesBookingCalendar";
import { Group } from "../../../../components/Group";
import { InfoPanel } from "../../../../components/InfoPanel";
import { Money } from "../../../../components/Money";
import { Stack } from "../../../../components/Stack";
import { StatusButton } from "../../../../components/StatusButton";
import { Text } from "../../../../components/Text";
import { TextArea } from "../../../../components/TextArea";
import {
  formatDateForDatetime,
  patchDateTimezoneOffset,
} from "../../../../utils/datetime";
import { pluralize } from "../../../../utils/pluralize";
import { Amenity } from "./page";

interface Props {
  amenity: Amenity;
  createAmenityBooking: (fd: FormData) => void;
}

export function BookAmenityForm({ amenity, createAmenityBooking }: Props) {
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

        await createAmenityBooking(fd);
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
              <Text weight="bold">Summary</Text>
              <Text>
                {bookingLength} {pluralize("day", bookingLength)} @{" "}
                <Money amount={amenity.costPerHour * 24} /> per day
              </Text>
            </Group>
            <Group justify="space-between">
              <Text weight="bold">Approximate Cost</Text>
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
