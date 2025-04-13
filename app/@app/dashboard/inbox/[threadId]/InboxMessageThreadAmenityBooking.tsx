"use client";

import { s } from "../../../../../sprinkles.css";

import React, { useMemo } from "react";

import { AmenitiesBookingCalendar } from "../../../../../components/AmenitiesBookingCalendar";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { InvoiceChip } from "../../../../../components/InvoiceChip";
import { Panel } from "../../../../../components/Panel";
import { Stack } from "../../../../../components/Stack";
import { StatusButton } from "../../../../../components/StatusButton";
import { AmenityBooking } from "../../../../../data/amenities/getAmenityBooking";
import { Event } from "../../../../../data/events/getEventsForRange";
import { useCan } from "../../../../../hooks/useCan";

interface Props {
  amenityBooking: AmenityBooking;
  approveOrRejectAmenityBooking: (
    amenityId: string,
    decision: "approve" | "reject",
  ) => void;
}

export function InboxMessageThreadAmenityBooking({
  amenityBooking,
  approveOrRejectAmenityBooking,
}: Props) {
  const can = useCan();
  const virtualEvent = useMemo<Event>(
    () => ({
      id: amenityBooking.id,
      endDate: amenityBooking.endDate,
      name: "Current Booking",
      startDate: amenityBooking.startDate,
      creatorId: "",
      strataId: "",
      description: "",
      meetingId: "",
    }),
    [amenityBooking],
  );

  return (
    <div className={s({ p: "normal" })}>
      <Panel>
        <Stack>
          <Header priority={3}>Booking Request</Header>

          <AmenitiesBookingCalendar
            amenity={amenityBooking.amenity}
            virtualEvent={virtualEvent}
          />

          {can("stratas.amenity_bookings.edit") && !amenityBooking.decision && (
            <>
              {amenityBooking.invoice && (
                <InvoiceChip invoice={amenityBooking.invoice} />
              )}

              <InfoPanel level="info">
                Approving the booking will lock in the date for the booking,
                publish the above invoice, and automatically generate a response
                to this thread with the invoice attached. Rejecting the booking
                will delete the invoice and generate a response to this thread.
              </InfoPanel>

              <Group>
                <StatusButton
                  action={approveOrRejectAmenityBooking.bind(
                    undefined,
                    amenityBooking.id,
                    "approve",
                  )}
                  style="secondary"
                  color="success"
                  iconTextBehaviour="centerGlobal"
                >
                  Approve
                </StatusButton>
                <StatusButton
                  action={approveOrRejectAmenityBooking.bind(
                    undefined,
                    amenityBooking.id,
                    "reject",
                  )}
                  style="secondary"
                  color="error"
                  iconTextBehaviour="centerGlobal"
                >
                  Reject
                </StatusButton>
              </Group>
            </>
          )}

          {amenityBooking.decision && (
            <InfoPanel
              alignment="center"
              level={
                amenityBooking.decision === "approved" ? "success" : "error"
              }
            >
              Booking {amenityBooking.decision}
            </InfoPanel>
          )}
        </Stack>
      </Panel>
    </div>
  );
}
